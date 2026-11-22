import type { Company, ContactInfo, DatesWorked, Intro, Position, RawResume, Resume, School, Skill } from "./types";

// Throws instead of returning an Invalid Date, so bad YAML fails the build with a message that names the entry.
function parseDate(value: unknown, field: string): Date {
  const date = value instanceof Date ? value : new Date(value as string);
  if (value == null || value === "" || Number.isNaN(date.getTime())) {
    throw new Error(
      `Invalid ${field}: ${JSON.stringify(value)} in resume data. ` +
      `Expected a date like 2023-11.`,
    );
  }
  return date;
}

// `[from]` or `[from, null]` means "to Present".
function parseDatesWorked(value: unknown, owner: string): [Date, Date | null] {
  if (!Array.isArray(value) || value.length === 0 || value.length > 2) {
    throw new Error(
      `Invalid dates_worked for ${owner}: ${JSON.stringify(value)} in resume data. ` +
      `Expected [start] or [start, end], e.g. [2016-06, 2023-11].`,
    );
  }
  const [from, to] = value;
  return [
    parseDate(from, `dates_worked start for ${owner}`),
    to == null || to === "" ? null : parseDate(to, `dates_worked end for ${owner}`),
  ];
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date);
}

// Objects merge recursively; scalars, arrays, and nulls in `override` replace the base value.
export function deepMerge(base: unknown, override: unknown): unknown {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = deepMerge(base[key], value);
  }
  return result;
}

export function getSchools({ schools }: { schools: School[] }) {
  const return_schools: School[] = [];

  if (!schools) {
    return return_schools;
  }

  for ( const school of schools ) {
    return_schools.push({
      name: school.name,
      degree: school.degree,
      description: school.description,
      website: school.website,
      graduation_date: parseDate(school.graduation_date, `graduation_date for school "${school.name}"`),
      still_attending: school.still_attending,
    })
  }

  return return_schools;

}

export function getSkills({ skills }: {skills: Skill[]}): Skill[] {
  const return_skills: Skill[] = [];

  if (!skills) {
    return return_skills;
  }

  for (const skill of skills) {
    return_skills.push(skill);
  }

  return return_skills;
}


export function getCompanies({companies}: {companies: Company[]}): Company[] {
  const return_companies: Company[] = [];

  if (!companies) {
    return return_companies;
  }

  for (const parsedCompany of companies) {
    if (!parsedCompany.dates_worked) {
      continue;
    }
    const company: Company = {
      name: parsedCompany.name,
      dates_worked: parseDatesWorked(parsedCompany.dates_worked, `company "${parsedCompany.name}"`),
      description: parsedCompany.description,
      location: parsedCompany.location,
      website: parsedCompany.website,
      positions: getPositions(parsedCompany),
    }
    return_companies.push(company);
  }

  return return_companies;
}

function getPositions(parsedCompany: Company): Position[] {
  const parsedPositions = parsedCompany.positions;
  const positions: Position[] = [];

  if (!parsedPositions) {
    return positions;
  }

  for (const parsedPosition of parsedPositions) {
    const dates_worked: DatesWorked = parsedPosition.dates_worked
      ? parseDatesWorked(
        parsedPosition.dates_worked,
        `position "${parsedPosition.title}" at "${parsedCompany.name}"`,
      )
      : null;
    const position: Position = {
      title: parsedPosition.title,
      dates_worked: dates_worked,
      description: parsedPosition.description,
      achievements: parsedPosition.achievements,
    }
    positions.push(position);

  }

  return positions;

}

export function getContactInfo({ contact_info }: { contact_info: ContactInfo }): ContactInfo {
  if (!contact_info) {
    return {};
  }

  return {
    linkedin: contact_info?.linkedin,
    github: contact_info?.github,
    email: contact_info?.email,
    location: contact_info?.location,
    phone: contact_info?.phone,
    website: contact_info?.website,
  }
}

function getIntro({ summary, objective }: { summary?: unknown; objective?: unknown }): Intro | null {
  if (summary) {
    return { kind: "summary", text: String(summary) };
  }
  if (objective) {
    return { kind: "objective", text: String(objective) };
  }
  return null;
}

/** Validates raw resume data and converts it into a `Resume`. Throws on malformed dates. */
export function normalizeResume(raw: RawResume): Resume {
  // The getters still declare their input as already-typed; raw data is checked inside them.
  const data = raw as never;
  return {
    name: typeof raw.name === "string" ? raw.name : "",
    target_position: typeof raw.target_position === "string" && raw.target_position
      ? raw.target_position
      : undefined,
    intro: getIntro(raw),
    schools: getSchools(data),
    skills: getSkills(data),
    companies: getCompanies(data),
    contact_info: getContactInfo(data),
  };
}
