export type {
  Company,
  ContactInfo,
  DatesWorked,
  Intro,
  RawResume,
  Resume,
  Position,
  School,
  Skill,
} from "./types";
export {
  deepMerge,
  getCompanies,
  getContactInfo,
  getSchools,
  getSkills,
  normalizeResume,
} from "./normalize";
export { parseResumeYaml } from "./parse";
export { contactLinks, formatDateRange, monthYear } from "./format";
export type { ContactLink, ContactType } from "./format";
