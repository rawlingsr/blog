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
        </ul>
      </article>
      <article>
        <h2>Experience</h2>
        <section>
          <h3>Return to School</h3>
          <h4 className="experience">
            <span>Western Governors University</span>
            <span>
              <time dateTime="2023-11">Nov 2023</time>
              {" - "}
              Present
            </span>
          </h4>
        </section>

        <section>
          <h3>MasterControl Inc.</h3>
          <h4 className="experience">
            <span>Software Engineer II</span>
            <span>
              <time dateTime="2016-06">June 2016</time>
              {" - "}
              <time dateTime="2023-11">November 2023</time>
            </span>
          </h4>

          <p>
            Fixed defects and wrote code but focused on finding defects and
            verifying fixes.
          </p>

          <ul>
            <li>
              Developed and maintained internal documentation and guides,
              addressing gaps for new team members and processes.
            </li>

            <li>
              Mentored and trained Junior Software and Quality Engineers,
              accelerating their onboarding and development.
            </li>

            <li>
              Refactored and modernized numerous React components, improving
              performance and maintainability.
            </li>

            <li>
              Expanded browser compatibility for an internal Selenium wrapper,
              enabling Cross-platform testing, and demonstrating.
            </li>

            <li>
              Recognized by peers and mentors for meticulous attention to detail
              and exceptional problem-solving skills.
            </li>

            <li>
              Wrote Automated tests to produce video recordings, providing Video
              Evidence of tested functionalities for client validation.
            </li>

            <li>
              Automated Jenkins job execution with custom scripts, streamlining
              batch processing and reducing the number of points of failure.
            </li>
          </ul>
        </section>

        <section>
          <h3>StorageCraft</h3>
          <h4 className="experience">
            <span>QA specialist in Technical Support</span>
            <span>
              <time dateTime="2012-05">May 2012</time>
              {" - "}
              <time dateTime="2016-02">February 2016</time>
            </span>
          </h4>

          <p>
            Effectively resolved complex customer issues through detailed
            investigation and root cause analysis.
          </p>

          <ul>
            <li>
              Managed test lab environments for defect reproduction.
            </li>

            <li>
              Performed low-level network traffic analysis for troubleshooting.
            </li>

            <li>
              Conducted exploratory testing to find hidden defects.
            </li>

            <li>
              Created and executed test plans for new product releases.
            </li>

            <li>
              Utilized Jira for bug reporting and tracking.
            </li>

            <li>
              Built and maintained test infrastructure to support defect
              verification.
            </li>
          </ul>
        </section>
      </article>

      <article>
        <h2>Education</h2>
        <section>
          <h3>Bachelor of Science, Computer Science</h3>
          <h4 className="experience">
            <span>Western Governors University</span>
            <span>
              (Expected) <time dateTime="2027-05">May 2027</time>
            </span>
          </h4>
        </section>
      </article>
    </main>
  );
}
