import Education from "@/components/education";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import { Header } from "@/components/header";
import {
  getCompanies,
  getData,
  getSchools,
  getSkills,
} from "@/utils/career-data";

export default async function Home() {
  const data = await getData();
  const companies = getCompanies(data);
  const skills = getSkills(data);
  const schools = getSchools(data);

  return (
    <main>
      <Header name={data.name} target_position={data.target_position} />
      <div className="container content">
        <article>
          <h2>Objective</h2>
          {data.objective}
        </article>
        <Education schools={schools} />
        <Experience companies={companies} />
        <Skills skills={skills} />
      </div>
    </main>
  );
}
