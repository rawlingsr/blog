import {
  Email,
  GitHub,
  Linkedin,
  Location,
  Phone,
  Website,
} from "@/components/contact";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import {
  getCompanies,
  getContactInfo,
  getData,
  getSchools,
  getSkills,
} from "@/utils/career-data";

export default async function Home() {
  const data = await getData();
  const companies = getCompanies(data);
  const skills = getSkills(data);
  const schools = getSchools(data);
  const links = getContactInfo(data);
  const size = 1;

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
