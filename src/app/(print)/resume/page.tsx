import type { Metadata } from "next";
import Image from "next/image";
import { Resume, ResumeHeader } from "yaml-to-resume/react";
import { fontAwesomeContactIcon } from "@/components/contact";
import { getResume } from "@/utils/career-data";

export async function generateMetadata(): Promise<Metadata> {
  const { name, target_position } = await getResume();

  return {
    // Also the default filename when printing to PDF, so never append an empty position.
    title: target_position ? `${name} - ${target_position}` : name,
  };
}

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <>
      <div className="container">
        <ResumeHeader
          name={resume.name}
          target_position={resume.target_position}
          contact_info={resume.contact_info}
          logo={<Image src="/icon.png" alt="RR Icon" width="64" height="64" className="icon" />}
          renderIcon={fontAwesomeContactIcon(1)}
        />
      </div>
      <main>
        <div className="container content">
          <Resume
            resume={resume}
            sections={["intro", "skills", "experience", "education"]}
            introHeadingClassName="intro-heading"
          />
        </div>
      </main>
    </>
  );
}
