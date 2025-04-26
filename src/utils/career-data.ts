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
  description: string;
}

export interface Company {
  name: string;
  dates_worked: [Date, Date];
  description: string;
  location: string;
  website: URL;
  positions: Position[];

}

export interface Position {
  title: string;
  dates_worked: [Date, Date] | null;
  description: string;
  achievements: string[];
}

export interface ContactInfo {
  linkedin: string | null;
  github: string | null;
  email: string | null;
  location: string | null;
  phone: string | null;
  website: string | null;
}

export async function getData() {
  const fileName = join(process.cwd(), "/src/career-data.yaml");
  const data = await readFile(fileName, { encoding: "utf8" });
  return parse(data);
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

    const company: Company = {
      name: parsedCompany.name,
      dates_worked: [new Date(from), new Date(to)],
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
    if (!parsedPosition.dates_worked) {
      continue;
    }
    const [from, to] = parsedPosition.dates_worked;
    const position: Position = {
      title: parsedPosition.title,
      dates_worked: [new Date(from), new Date(to)],
      description: parsedPosition.description,
      achievements: parsedPosition.achievements,
    }

    positions.push(position);
  }

  return positions;

}

export function getContactInfo({ contact_info }: { contact_info: ContactInfo }): ContactInfo {
  if (!contact_info) {
    return {
      linkedin: null,
      github: null,
      email: null,
      location: null,
      phone: null,
      website: null,
    };
  }

  return {
    linkedin: contact_info.linkedin,
    github: contact_info.github,
    email: contact_info.email,
    location: contact_info.location,
    phone: contact_info.phone,
    website: contact_info.website,
  }
}
