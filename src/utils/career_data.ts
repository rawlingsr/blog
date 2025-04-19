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

export async function getData() {
  const fileName = join(process.cwd(), "/src/career-data.yaml");
  const data = await readFile(fileName, { encoding: "utf8" });
  return parse(data);
}


export function getSkills(data: any): string[] {
  const skills: string[] = [];

  console.log(data.skills)

  if (!data) {
    return skills;
  }

  for (const skill of data.skills) {
    const validated: string = skill.skill;
    skills.push(validated);
  }

  return skills;
}


export function getCompanies(data: any): Company[] {
  const companies: Company[] = [];

  if (!data) {
    return companies;
  }

  for (const parsedCompany of data.companies) {
    const company: Company = {
      name: parsedCompany.name,
      dates_worked: parsedCompany.dates_worked,
      description: parsedCompany.description,
      location: parsedCompany.location,
      website: parsedCompany.website,
      positions: getPositions(parsedCompany),
    }
    companies.push(company);
  }

  return companies;
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


