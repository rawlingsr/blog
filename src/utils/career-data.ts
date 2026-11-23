import type { parse } from "yaml";
import { join } from "node:path";
import { loadResume, readResumeYaml } from "yaml-to-resume/node";

// The parsing, validation, and merge rules live in the yaml-to-resume package.
// This file only knows where the site keeps its data.
export { deepMerge, getCompanies, getContactInfo, getSchools, getSkills } from "yaml-to-resume";
export type {
  Company,
  ContactInfo,
  DatesWorked,
  Position,
  School,
  Skill,
} from "yaml-to-resume";

// Literal path segments keep Turbopack's file tracing scoped to src/ instead of the whole project.
function resumeFiles() {
  return {
    file: join(process.cwd(), "src", "career-data.yaml"),
    // Gitignored local overrides (contact info, per-print tweaks like target_position).
    overrideFile: join(process.cwd(), "src", "career-data.override.yaml"),
  };
}

/** The validated resume, ready for the yaml-to-resume/react components. */
export async function getResume() {
  return loadResume(resumeFiles());
}

/** The merged YAML before validation. */
export async function getData() {
  const data = await readResumeYaml(resumeFiles());
  // Keep the same loose type `parse` returned before, so callers are unchanged.
  return data as ReturnType<typeof parse>;
}
