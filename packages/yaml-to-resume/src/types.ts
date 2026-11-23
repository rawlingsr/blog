export interface School {
  name: string;
  degree: string;
  description: string;
  website: string;
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
  website: string;
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

/** Parsed YAML before validation: a plain object whose fields haven't been checked yet. */
export type RawResume = Record<string, unknown>;

export interface Intro {
  kind: "summary" | "objective";
  text: string;
}

/** A validated resume, with dates converted and hidden companies removed. */
export interface Resume {
  name: string;
  target_position?: string;
  /** `summary` if present, otherwise `objective`, otherwise null. */
  intro: Intro | null;
  schools: School[];
  skills: Skill[];
  companies: Company[];
  contact_info: ContactInfo;
}
