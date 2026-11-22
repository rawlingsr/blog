import type { parse } from "yaml";
import { join } from "node:path";
import { readResumeYaml } from "resume-from-yaml/node";

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

export async function getData() {
  // Literal path segments keep Turbopack's file tracing scoped to src/ instead of the whole project.
  const data = await readResumeYaml({
    file: join(process.cwd(), "src", "career-data.yaml"),
    // Gitignored local overrides (contact info, per-print tweaks like target_position).
    overrideFile: join(process.cwd(), "src", "career-data.override.yaml"),
  });
  // Keep the same loose type `parse` returned before, so callers are unchanged.
  return data as ReturnType<typeof parse>;
}
