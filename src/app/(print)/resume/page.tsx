import { Introduction } from "@/components/resume/introduction";
import { Education } from "@/components/resume/education";
import { Experience } from "@/components/resume/experience";
import { SkillsWithKeywords } from "@/components/resume/skills";
import { Header } from "@/components/resume/header";
import {
  getCompanies,
  getData,
  getSchools,
  getSkills,
} from "@/utils/career-data";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  return {
    title: `${data.name} - ${data.target_position}`,
  };
}

export default async function Home() {
  const data = await getData();
  const companies = getCompanies(data);
  const skills = getSkills(data);
  const schools = getSchools(data);

  return (
    <>
      <Header data={data} />
      <main>
        <div className="container content">
          <Introduction data={data} is_resume={true} />
          <SkillsWithKeywords skills={skills} />
          <Experience companies={companies} />
          <Education schools={schools} />
        </div>
      </main>
    </>
  );
}
