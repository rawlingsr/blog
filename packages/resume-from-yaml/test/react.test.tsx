import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { normalizeResume } from "../src/index";
import { ContactLinks, Resume, ResumeHeader } from "../src/react/index";

const resume = normalizeResume({
  name: "Sample Person",
  target_position: "Developer",
  summary: "Builds things.",
  companies: [
    {
      name: "Current Co",
      location: "Remote",
      website: "https://current.example",
      dates_worked: ["2020-01"],
      positions: [{ title: "Engineer", dates_worked: ["2021-03", "2022-04"], achievements: ["Shipped it"] }],
    },
    { name: "Hidden Co", positions: [] },
  ],
  schools: [{ name: "Sample U", degree: "BS", graduation_date: "2015-05", still_attending: true }],
  skills: [{ name: "Languages", keywords: ["TypeScript", "Rust"] }],
  contact_info: { github: "sample", email: "sample@example.com" },
});

const html = (element: React.ReactElement) => renderToStaticMarkup(element);
const order = (markup: string, ...needles: string[]) => needles.map((n) => markup.indexOf(n));

describe("<Resume>", () => {
  it("renders the default sections in order", () => {
    const [intro, education, experience, skills] = order(
      html(<Resume resume={resume} />),
      "<h2>Summary</h2>",
      "<h2>Education</h2>",
      "<h2>Experience</h2>",
      "<h2>Skills</h2>",
    );
    expect(intro).toBeGreaterThan(-1);
    expect(intro).toBeLessThan(education);
    expect(education).toBeLessThan(experience);
    expect(experience).toBeLessThan(skills);
  });

  it("follows a custom section order and leaves out sections not listed", () => {
    const markup = html(<Resume resume={resume} sections={["skills", "experience"]} />);
    const [skills, experience] = order(markup, "<h2>Skills</h2>", "<h2>Experience</h2>");
    expect(skills).toBeLessThan(experience);
    expect(markup).not.toContain("Education");
    expect(markup).not.toContain("Summary");
  });

  it("renders no intro when there is no summary or objective", () => {
    const markup = html(<Resume resume={{ ...resume, intro: null }} sections={["intro"]} />);
    expect(markup).toBe('<div class="resume"></div>');
  });

  it("adds a caller's className next to the resume class", () => {
    expect(html(<Resume resume={resume} sections={[]} className="mine" />)).toBe('<div class="resume mine"></div>');
  });

  it("labels an objective as Objective and applies the heading class", () => {
    const markup = html(
      <Resume
        resume={{ ...resume, intro: { kind: "objective", text: "Get hired." } }}
        sections={["intro"]}
        introHeadingClassName="flush"
      />,
    );
    expect(markup).toContain('<h2 class="flush">Objective</h2>Get hired.');
  });

  it("shows dates, Present for ongoing jobs, and leaves out hidden companies", () => {
    const markup = html(<Resume resume={resume} />);
    expect(markup).toContain('<time dateTime="2020-01-01T00:00:00.000Z">January 2020</time> - Present');
    expect(markup).toContain("March 2021</time> - <time");
    expect(markup).toContain("April 2022");
    expect(markup).toContain('<a href="https://current.example">');
    expect(markup).toContain("Remote");
    expect(markup).not.toContain("Hidden Co");
  });

  it("marks a school still being attended as Expected", () => {
    expect(html(<Resume resume={resume} sections={["education"]} />)).toContain("(Expected) <time");
  });

  it("renders skill keywords", () => {
    const markup = html(<Resume resume={resume} sections={["skills"]} />);
    expect(markup).toContain("<li>TypeScript</li><li>Rust</li>");
  });
});

describe("<ContactLinks>", () => {
  it("renders one link per contact field, without icons by default", () => {
    const markup = html(<ContactLinks info={resume.contact_info} />);
    expect(markup).toContain('href="https://github.com/sample/"');
    expect(markup).toContain('href="mailto:sample@example.com"');
    expect(markup).toContain("GitHub Profile: sample");
    expect(markup).not.toContain("<i");
  });

  it("uses renderIcon for each link", () => {
    const markup = html(
      <ContactLinks info={resume.contact_info} renderIcon={(link) => <i data-icon={link.type} />} />,
    );
    expect(markup).toContain('<i data-icon="github"></i>');
    expect(markup).toContain('<i data-icon="email"></i>');
  });

  it("renders nothing for missing contact info", () => {
    expect(html(<ContactLinks info={null} />)).toBe("");
  });
});

describe("<ResumeHeader>", () => {
  it("shows the name, position, logo, and contact links, linking home", () => {
    const markup = html(
      <ResumeHeader
        name={resume.name}
        target_position={resume.target_position}
        contact_info={resume.contact_info}
        logo={<img src="/logo.png" alt="logo" />}
        homeHref="/home"
      />,
    );
    expect(markup).toContain('<a href="/home" class="resume-header-home"><img src="/logo.png" alt="logo"/>');
    expect(markup).toContain("<h1>Sample Person</h1><h2>Developer</h2>");
    expect(markup).toContain("GitHub Profile: sample");
  });

  it("leaves out the position heading when there is none", () => {
    const markup = html(<ResumeHeader name="A" />);
    expect(markup).toContain('<a href="/" class="resume-header-home"><div><h1>A</h1></div></a>');
  });
});
