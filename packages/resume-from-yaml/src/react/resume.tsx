import type { ReactNode } from "react";
import type { Resume as ResumeData } from "../types";
import { Education } from "./education";
import { Experience } from "./experience";
import { Introduction } from "./introduction";
import { SkillsWithKeywords } from "./skills";

export type ResumeSection = "intro" | "education" | "experience" | "skills";

const defaultSections: ResumeSection[] = ["intro", "education", "experience", "skills"];

/** The resume body, with sections in the given order. */
export function Resume({
  resume,
  sections = defaultSections,
  introHeadingClassName,
  className,
}: {
  resume: ResumeData;
  sections?: ResumeSection[];
  introHeadingClassName?: string;
  className?: string;
}) {
  const render = {
    intro: () => <Introduction key="intro" intro={resume.intro} headingClassName={introHeadingClassName} />,
    education: () => <Education key="education" schools={resume.schools} />,
    experience: () => <Experience key="experience" companies={resume.companies} />,
    skills: () => <SkillsWithKeywords key="skills" skills={resume.skills} />,
  } satisfies Record<ResumeSection, () => ReactNode>;
  return <div className={className}>{sections.map((section) => render[section]())}</div>;
}
