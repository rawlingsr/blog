import Education from "@/components/education";
import Experience from "@/components/experience";
import Skills from "@/components/skills"
import {
  getData,
  getCompanies,
  getSkills,
  getSchools,
} from "@/utils/career-data";

export default async function Home() {
  const data = await getData();
  const companies = getCompanies(data);
  const skills = getSkills(data);
  const schools = getSchools(data);

  return (
    <main>
      <article>
        <h2>Objective</h2>
        {data.objective}
      </article>
      <Education schools={schools} />
      <Experience companies={companies} />
      <Skills skills={skills} />
    </main>
  );
}
