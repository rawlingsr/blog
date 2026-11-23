// Keeps examples/ (and the README that points to it) in sync with the code.
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { contactLinks } from "../src/index";
import { loadResume } from "../src/node";
import { Resume } from "../src/react/index";

const example = (name: string) => path.join(import.meta.dirname, "..", "examples", name);

describe("examples/", () => {
  it("loads, merges the override, and renders", async () => {
    const resume = await loadResume({
      file: example("resume.yaml"),
      overrideFile: example("resume.override.yaml"),
    });

    expect(resume.name).toBe("Alex Rivera");
    expect(resume.intro?.kind).toBe("summary");
    // The override replaces target_position and merges into contact_info.
    expect(resume.target_position).toBe("Senior Front-End Engineer");
    expect(resume.contact_info).toMatchObject({
      github: "alex-rivera-example",
      email: "alex@example.com",
      phone: "555-555-0100",
    });
    // The company without dates_worked is hidden.
    expect(resume.companies.map((c) => c.name)).toEqual(["Example Labs", "Sample Systems"]);

    const html = renderToStaticMarkup(<Resume resume={resume} />);
    expect(html).toContain("Present");
    expect(html).toContain("(Expected) ");
    expect(html).not.toContain("Old Internship Co");

    // A full LinkedIn URL is used as written; a GitHub username becomes a URL.
    const hrefs = Object.fromEntries(contactLinks(resume.contact_info).map((l) => [l.type, l.href]));
    expect(hrefs.linkedin).toBe("https://www.linkedin.com/in/alex-rivera-example/");
    expect(hrefs.github).toBe("https://github.com/alex-rivera-example/");
    expect(hrefs.website).toBe("https://example.com/");
  });

  it("loads without the override", async () => {
    const resume = await loadResume({ file: example("resume.yaml") });
    expect(resume.target_position).toBe("Software Engineer");
    expect(resume.contact_info.email).toBeUndefined();
  });
});
