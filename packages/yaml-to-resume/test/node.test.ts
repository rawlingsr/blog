import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadResume, readResumeYaml } from "../src/node";

const fixture = (name: string) => path.join(import.meta.dirname, "fixtures", name);

describe("readResumeYaml", () => {
  it("reads the base file alone", async () => {
    const data = await readResumeYaml({ file: fixture("resume.yaml") });
    expect(data.target_position).toBe("Developer");
  });

  it("merges the override file when it exists", async () => {
    const data = await readResumeYaml({
      file: fixture("resume.yaml"),
      overrideFile: fixture("resume.override.yaml"),
    });
    expect(data.target_position).toBe("Senior Developer");
    expect(data.contact_info).toEqual({ github: "sample", email: "sample@example.com" });
  });

  it("ignores a missing override file", async () => {
    const data = await readResumeYaml({
      file: fixture("resume.yaml"),
      overrideFile: fixture("does-not-exist.yaml"),
    });
    expect(data.target_position).toBe("Developer");
  });

  it("throws when the base file is missing", async () => {
    await expect(readResumeYaml({ file: fixture("does-not-exist.yaml") })).rejects.toThrow(/ENOENT/);
  });

  it("names the file in YAML syntax errors", async () => {
    await expect(readResumeYaml({ file: fixture("broken.yaml") })).rejects.toThrow(
      /Could not parse .*broken\.yaml/,
    );
  });
});

describe("loadResume", () => {
  it("reads, merges, and normalizes", async () => {
    const resume = await loadResume({
      file: fixture("resume.yaml"),
      overrideFile: fixture("resume.override.yaml"),
    });
    expect(resume.name).toBe("Sample Person");
    expect(resume.target_position).toBe("Senior Developer");
    expect(resume.intro).toEqual({ kind: "summary", text: "Builds things." });
    expect(resume.companies.map((c) => c.name)).toEqual(["Visible Co"]);
    expect(resume.companies[0].positions[0].achievements).toEqual(["Shipped it"]);
    expect(resume.contact_info.email).toBe("sample@example.com");
  });
});
