import { parse } from "yaml";
import { readFile } from "node:fs/promises";
import { join } from "path";

export interface Company {
  name: string;
  dates_worked: [string, string];
  description: string;
  location: string;
  website: URL;
  positions: Position[];

}

export interface Position {
  title: string;
  dates_worked: [string, string] | null;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  description: string;
}

export async function getData() {
  const fileName = join(process.cwd(), "/src/career-data.yaml");
  const data = await readFile(fileName, { encoding: "utf8" });
  return parse(data);
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
    const company: Company = {
      name: parsedCompany.name,
      dates_worked: parsedCompany.dates_worked,
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
    const position: Position = {
      title: parsedPosition.title,
      dates_worked: parsedPosition.dates_worked,
      description: parsedPosition.description,
      achievements: parsedPosition.achievements,
    }

    positions.push(position);
  }

  return positions;

}


