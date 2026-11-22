import { parse } from "yaml";
import { readFile } from "node:fs/promises";
import { join } from "path";
import { deepMerge } from "resume-from-yaml";

// The parsing, validation, and merge rules live in the resume-from-yaml package.
// This file only knows where the site keeps its data.
export { deepMerge, getCompanies, getContactInfo, getSchools, getSkills } from "resume-from-yaml";
export type {
  Company,
  ContactInfo,
  DatesWorked,
  Position,
  School,
  Skill,
} from "resume-from-yaml";

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
