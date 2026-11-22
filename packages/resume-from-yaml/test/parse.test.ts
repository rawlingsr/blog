import { describe, expect, it } from "vitest";
import { parseResumeYaml } from "../src/index";

describe("parseResumeYaml", () => {
  it("parses a mapping", () => {
    expect(parseResumeYaml("name: A\nskills: [x]")).toEqual({ name: "A", skills: ["x"] });
  });

  it("deep-merges the override on top", () => {
    const base = "name: A\ncontact_info:\n  github: a\nskills: [x, y]";
    const override = "contact_info:\n  email: a@b.c\nskills: [z]";
    expect(parseResumeYaml(base, override)).toEqual({
      name: "A",
      contact_info: { github: "a", email: "a@b.c" },
      skills: ["z"],
    });
  });

  it("treats empty base or override text as an empty mapping", () => {
    expect(parseResumeYaml("")).toEqual({});
    expect(parseResumeYaml("name: A", "")).toEqual({ name: "A" });
    expect(parseResumeYaml("name: A", "# just a comment\n")).toEqual({ name: "A" });
  });

  it("rejects YAML whose top level isn't a mapping", () => {
    expect(() => parseResumeYaml("- a\n- b")).toThrow(/Resume YAML must be a YAML mapping/);
    expect(() => parseResumeYaml("just a string")).toThrow(/must be a YAML mapping/);
    expect(() => parseResumeYaml("name: A", "- a")).toThrow(/Resume override YAML must be a YAML mapping/);
  });

  it("surfaces YAML syntax errors", () => {
    expect(() => parseResumeYaml("name: [unclosed")).toThrow();
  });
});
