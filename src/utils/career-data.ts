import { parse } from "yaml";
import { readFile } from "node:fs/promises";
import { join } from "path";

export interface School {
  name: string;
  degree: string;
  description: string;
  website: URL;
  graduation_date: Date;
  still_attending: boolean;
}

export interface Skill {
  name: string;
  keywords: string[]
  description?: string;
}

export interface Company {
  name: string;
  dates_worked?: DatesWorked;
  description: string;
  location: string;
  website: URL;
  positions: Position[];

}

export interface Position {
  title: string;
  dates_worked?: DatesWorked;
  description: string;
  achievements: string[];
}

export interface ContactInfo {
  linkedin?: string;
  github?: string;
  email?: string;
  location?: string;
  phone?: string;
  website?: string;
}

export type  DatesWorked = [Date, Date | null] | null;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date);
}

// Objects merge recursively; scalars, arrays, and nulls in `override` replace the base value.
function deepMerge(base: unknown, override: unknown): unknown {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override === undefined ? base : override;
  }
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    result[key] = deepMerge(base[key], value);
  }
  return result;
}

async function readYaml(fileName: string, optional = false) {
  try {
    const data = await readFile(join(process.cwd(), fileName), { encoding: "utf8" });
    return parse(data) ?? {};
  } catch (err) {
    if (optional && (err as NodeJS.ErrnoException).code === "ENOENT") {
      return {};
    }
    throw err;
  }
}

export async function getData() {
  const base = await readYaml("/src/career-data.yaml");
  // Gitignored local overrides (contact info, per-print tweaks like target_position).
  const override = await readYaml("/src/career-data.override.yaml", true);
  // Keep the same loose type `parse` returned before, so callers are unchanged.
  return deepMerge(base, override) as ReturnType<typeof parse>;
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
      graduation_date: new Date(school.graduation_date),
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
    const [from, to] = parsedCompany.dates_worked;

    let dates_worked: DatesWorked;
    if (!to || to == null) {
      dates_worked = [new Date(from), null]
    } else {
      dates_worked = [new Date(from), new Date(to)]
    }

    const company: Company = {
      name: parsedCompany.name,
      dates_worked: dates_worked,
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
    let dates_worked: DatesWorked;
    if (!parsedPosition.dates_worked) {
      dates_worked = null;
    }
    else
    {
      const [from, to] = parsedPosition.dates_worked;
      if (!to || to == null) {
        dates_worked = [new Date(from), null]
      } else {
        dates_worked = [new Date(from), new Date(to)]
      }
    }
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
