import { Experience } from "@/components/experience";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <article>
        <h2>Objective</h2>
        Utilize my 11 years of experience ensuring the quality and reliability
        of software products. I am eager to apply my experience in a new
        Software Engineering role.
      </article>
      <article>
        <h2>Skills</h2>
        <ul className="skills">
          <li>Test Automation</li>
          <li>Configuration as Code</li>
          <li>React</li>
          <li>Git</li>
          <li>CI/CD</li>
          <li>Python</li>
          <li>JavaScript</li>
          <li>Java</li>
          <li>Ruby</li>
          <li>PowerShell</li>
          <li>HTML and CSS</li>
          <li>SQL</li>
          <li>C++</li>
          <li>Rust</li>
          <li>Linux</li>
          <li>Selenium</li>
        </ul>
      </article>
      <Experience />

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
