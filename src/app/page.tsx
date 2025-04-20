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
        Utilize my 11 years of experience ensuring the quality and reliability
        of software products. I am eager to apply my experience in a new
        Software Engineering role.
      </article>
      <Education schools={schools} />
      <Experience companies={companies} />
      <Skills skills={skills} />
    </main>
  );
}
