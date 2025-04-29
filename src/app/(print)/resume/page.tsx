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
import { Header } from "@/components/header";
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
    <>
      <Header name={data.name} target_position={data.target_position}/>
      <main>
        <div className="container content">
          <article>
            <h2>Objective</h2>
            {data.objective}
          </article>
          <Education schools={schools}/>
          <Experience companies={companies}/>
          <Skills skills={skills}/>
          <article>
            <h2>Links</h2>
            <Linkedin linkedin={links.linkedin} size={size}/>
            <GitHub github={links.github} size={size}/>
            <Email email={links.email} size={size}/>
            <Location location={links.location} size={size}/>
            <Website website={links.website} size={size}/>
            <Phone phone={links.phone} size={size}/>
          </article>
        </div>
      </main>
    </>

  );
}
