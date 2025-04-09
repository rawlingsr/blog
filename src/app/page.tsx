export default async function Home() {

  return (
    <main>
      <article>
        <h2>Experience</h2>
        <section>
          <h3>
            <ul className="experience">
              <li>Return to School</li>
              <li>
                <time dateTime="2023-11">Nov 2023</time>
                {" - "}
                Present
              </li>
            </ul>
          </h3>
        </section>

        <section>
          <h3>
            <ul className="experience">
              <li>MasterControl Inc.</li>
              <li>Software Engineer II</li>
              <li>
                <time dateTime="2016-6">June 2016</time>
                {" - "}
                <time dateTime="2023-11">November 2023</time>
              </li>
            </ul>
          </h3>

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
          <h3>
            <ul className="experience">
              <li>StorageCraft</li>
              <li>QA specialist in Technical Support</li>
              <li>
                <time dateTime="2012-5">May 2012</time>
                {" - "}
                <time dateTime="2016-02">February 2016</time>
              </li>
            </ul>
          </h3>

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
          <header className="experience">
            <h3>Bachelor of Science, Computer Science</h3>
          </header>
        </section>
      </article>
    </main>
  );
}
