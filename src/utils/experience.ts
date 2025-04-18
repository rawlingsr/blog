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



export async function getCareerData(): Promise<Company[]> {
  const fileName = join(process.cwd(), "/src/career-data.yaml");
  const data = await readFile(fileName, { encoding: "utf8" });
  const parsedData = parse(data);
  const companies: Company[] = [];

  if (!parsedData) {
    return companies;
  }

  for (const parsedCompany of parsedData.companies) {
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

  return parsedData.companies;
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


