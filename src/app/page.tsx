import Experience from "@/components/experience";
import Skills from "@/components/skills"
import { getData, getCompanies, getSkills } from "@/utils/career_data";
import Link from "next/link";

export default async function Home() {
  const data = await getData();
  const companies = getCompanies(data);
  const skills = getSkills(data);
  return (
    <main>
      <article>
        <h2>Objective</h2>
        Utilize my 11 years of experience ensuring the quality and reliability
        of software products. I am eager to apply my experience in a new
        Software Engineering role.
      </article>
      <Skills skills={skills} />
      <Experience companies={companies} />

      <article>
        <h2>Education</h2>
        <section>
          <h3>Bachelor of Science, Computer Science</h3>
          <h4 className="experience-header">
            <Link href={"https://www.wgu.edu/"}>Western Governors University</Link>
            <span>
              (Expected) <time dateTime="2027-05">May 2027</time>
            </span>
          </h4>
        </section>
      </article>
    </main>
  );
}
