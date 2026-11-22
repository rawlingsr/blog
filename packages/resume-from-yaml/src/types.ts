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
