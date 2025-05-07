import { Education } from "@/components/resume/education";
import { Experience } from "@/components/resume/experience";
import { Skills } from "@/components/resume/skills";
import {
  getCompanies,
  getData,
  getSchools,
  getSkills,
} from "@/utils/career-data";
import {Introduction} from "@/components/resume/introduction";

export default async function Home() {
  const data = await getData();
  const companies = getCompanies(data);
  const skills = getSkills(data);
  const schools = getSchools(data);

  return (
    <main>
      <Introduction data={data} />
      <Education schools={schools} />
      <Experience companies={companies} />
      <Skills skills={skills} />
    </main>
  );
}
