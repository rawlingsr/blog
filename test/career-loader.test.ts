// getData() reads from process.cwd(). These tests point it at fixture directories.
// Kept thin on purpose: when the logic moves to its own package, the loader API will likely change.
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getData } from "@/utils/career-data";

const fixture = (name: string) => path.join(__dirname, "fixtures", name);

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getData", () => {
  it("deep-merges the override file over the base file", async () => {
    vi.spyOn(process, "cwd").mockReturnValue(fixture("career"));
    expect(await getData()).toEqual({
      name: "Base Name",
      target_position: "Override Position",
      contact_info: { github: "base-gh", website: "example.com", email: "me@example.com" },
      skills: [{ name: "Override Skill", keywords: ["c"] }],
    });
  });

  it("uses only the base file when there is no override", async () => {
    vi.spyOn(process, "cwd").mockReturnValue(fixture("career-no-override"));
    expect(await getData()).toEqual({ name: "Only Base" });
  });

  it("returns {} for an empty base file", async () => {
    vi.spyOn(process, "cwd").mockReturnValue(fixture("career-empty"));
    expect(await getData()).toEqual({});
  });

  it("throws when the base file is missing", async () => {
    vi.spyOn(process, "cwd").mockReturnValue(fixture("does-not-exist"));
    await expect(getData()).rejects.toThrow(/ENOENT/);
  });
});
