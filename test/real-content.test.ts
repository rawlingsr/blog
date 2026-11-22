// Smoke tests on the real site content (no cwd mock). These catch bad data before `pnpm build` does.
// Note: getData() also reads src/career-data.override.yaml if you have one locally.
import { readdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getCompanies, getContactInfo, getData, getSchools, getSkills } from "@/utils/career-data";
import { getPosts } from "@/utils/posts";

describe("real career data", () => {
  it("loads and normalizes without throwing", async () => {
    const data = await getData();
    expect(typeof data.name).toBe("string");
    expect(() => {
      getCompanies(data);
      getSchools(data);
      getSkills(data);
      getContactInfo(data);
    }).not.toThrow();
  });
});

describe("real blog posts", () => {
  it("loads every .md file in src/posts (none silently 404)", async () => {
    const files = await readdir(path.join(process.cwd(), "src", "posts"));
    const mdCount = files.filter((f) => f.endsWith(".md")).length;
    const posts = await getPosts();
    expect(posts).toHaveLength(mdCount);
  });
});
