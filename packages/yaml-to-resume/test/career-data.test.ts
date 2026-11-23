import { describe, expect, it } from "vitest";
import {
  deepMerge,
  getCompanies,
  getContactInfo,
  getSchools,
  getSkills,
} from "../src/index";

// The getters accept raw parsed YAML, which doesn't match their declared types (dates are still strings).
const companies = (value: unknown) => getCompanies({ companies: value } as never);
const schools = (value: unknown) => getSchools({ schools: value } as never);
const skills = (value: unknown) => getSkills({ skills: value } as never);
const contactInfo = (value: unknown) => getContactInfo({ contact_info: value } as never);
const iso = (d: Date | null | undefined) => d?.toISOString().slice(0, 10) ?? d;

describe("deepMerge", () => {
  it("merges nested objects key by key", () => {
    expect(deepMerge({ a: { x: 1, y: 2 }, b: 1 }, { a: { y: 3, z: 4 } })).toEqual({
      a: { x: 1, y: 3, z: 4 },
      b: 1,
    });
  });

  it("replaces arrays instead of merging them", () => {
    expect(deepMerge({ skills: [1, 2, 3] }, { skills: [9] })).toEqual({ skills: [9] });
  });

  it("replaces with null", () => {
    expect(deepMerge({ contact_info: { phone: "1" } }, { contact_info: null })).toEqual({
      contact_info: null,
    });
  });

  it("keeps the base value when the override is undefined", () => {
    expect(deepMerge({ a: 1 }, undefined)).toEqual({ a: 1 });
    expect(deepMerge({ a: 1 }, { a: undefined })).toEqual({ a: 1 });
  });

  it("replaces scalars, including replacing an object with a scalar", () => {
    expect(deepMerge({ a: 1, b: { c: 1 } }, { a: 2, b: "flat" })).toEqual({ a: 2, b: "flat" });
  });

  it("treats Dates as values, not objects to merge", () => {
    const date = new Date("2020-01-01");
    const result = deepMerge({ d: new Date("2010-01-01") }, { d: date }) as { d: Date };
    expect(result.d).toBe(date);
  });

  it("does not mutate its inputs", () => {
    const base = { a: { x: 1 } };
    deepMerge(base, { a: { x: 2 } });
    expect(base).toEqual({ a: { x: 1 } });
  });
});

describe("getCompanies", () => {
  it("returns [] when companies is missing", () => {
    expect(companies(undefined)).toEqual([]);
    expect(companies(null)).toEqual([]);
  });

  it("drops companies without dates_worked (the way to hide a company)", () => {
    const result = companies([
      { name: "Hidden", positions: [] },
      { name: "Also hidden", dates_worked: null, positions: [] },
      { name: "Shown", dates_worked: ["2016-06"], positions: [] },
    ]);
    expect(result.map((c) => c.name)).toEqual(["Shown"]);
  });

  it.each([
    ["[from]", ["2016-06"]],
    ["[from, null]", ["2016-06", null]],
    ["[from, \"\"]", ["2016-06", ""]],
  ])("treats %s as ongoing (to Present)", (_label, dates) => {
    const [company] = companies([{ name: "Co", dates_worked: dates, positions: [] }]);
    expect(iso(company.dates_worked?.[0])).toBe("2016-06-01");
    expect(company.dates_worked?.[1]).toBeNull();
  });

  it("parses [from, to] into two Dates", () => {
    const [company] = companies([{ name: "Co", dates_worked: ["2016-06", "2023-11"], positions: [] }]);
    expect(company.dates_worked?.map(iso)).toEqual(["2016-06-01", "2023-11-01"]);
  });

  it("accepts Date objects as well as strings", () => {
    const [company] = companies([
      { name: "Co", dates_worked: [new Date("2016-06-01")], positions: [] },
    ]);
    expect(iso(company.dates_worked?.[0])).toBe("2016-06-01");
  });

  it("throws an error naming the company for an invalid date", () => {
    expect(() => companies([{ name: "Acme", dates_worked: ["2020-13"] }])).toThrow(
      /dates_worked start for company "Acme".*"2020-13"/,
    );
    expect(() => companies([{ name: "Acme", dates_worked: ["2020-01", "nope"] }])).toThrow(
      /dates_worked end for company "Acme"/,
    );
  });

  it("throws for an empty or too-long dates_worked", () => {
    expect(() => companies([{ name: "Acme", dates_worked: [] }])).toThrow(
      /Invalid dates_worked for company "Acme"/,
    );
    expect(() =>
      companies([{ name: "Acme", dates_worked: ["2020-01", "2021-01", "2022-01"] }]),
    ).toThrow(/Invalid dates_worked for company "Acme"/);
  });

  it("throws for a dates_worked that isn't a list", () => {
    expect(() => companies([{ name: "Acme", dates_worked: "2020-01" }])).toThrow(
      /Invalid dates_worked for company "Acme"/,
    );
  });

  it("maps positions, with optional dates", () => {
    const [company] = companies([
      {
        name: "Co",
        dates_worked: ["2016-06"],
        positions: [
          { title: "Dev", dates_worked: ["2018-01", "2019-01"], achievements: ["Shipped"] },
          { title: "Undated", achievements: [] },
        ],
      },
    ]);
    expect(company.positions).toHaveLength(2);
    expect(company.positions[0].dates_worked?.map(iso)).toEqual(["2018-01-01", "2019-01-01"]);
    expect(company.positions[0].achievements).toEqual(["Shipped"]);
    expect(company.positions[1].dates_worked).toBeNull();
  });

  it("returns [] positions when positions is missing", () => {
    const [company] = companies([{ name: "Co", dates_worked: ["2016-06"] }]);
    expect(company.positions).toEqual([]);
  });

  it("names both the position and the company for a bad position date", () => {
    expect(() =>
      companies([
        { name: "Acme", dates_worked: ["2016-06"], positions: [{ title: "Dev", dates_worked: ["bad"] }] },
      ]),
    ).toThrow(/position "Dev" at "Acme"/);
  });
});

describe("getSchools", () => {
  it("returns [] when schools is missing", () => {
    expect(schools(undefined)).toEqual([]);
  });

  it("parses graduation_date", () => {
    const [school] = schools([{ name: "WGU", degree: "BS", graduation_date: "2026-06" }]);
    expect(iso(school.graduation_date)).toBe("2026-06-01");
    expect(school.degree).toBe("BS");
  });

  it("throws an error naming the school when graduation_date is missing or invalid", () => {
    expect(() => schools([{ name: "WGU" }])).toThrow(/graduation_date for school "WGU"/);
    expect(() => schools([{ name: "WGU", graduation_date: "" }])).toThrow(/graduation_date for school "WGU"/);
    expect(() => schools([{ name: "WGU", graduation_date: "2026-13" }])).toThrow(/graduation_date/);
  });
});

describe("getSkills", () => {
  it("returns [] when skills is missing", () => {
    expect(skills(undefined)).toEqual([]);
  });

  it("passes skills through unchanged", () => {
    const input = [{ name: "TypeScript", keywords: ["React"] }];
    expect(skills(input)).toEqual(input);
  });
});

describe("getContactInfo", () => {
  it("returns {} when contact_info is missing or null", () => {
    expect(contactInfo(undefined)).toEqual({});
    expect(contactInfo(null)).toEqual({});
  });

  it("throws at load time for a github value that isn't a GitHub URL", () => {
    expect(() => contactInfo({ github: "https://gitlab.com/me" })).toThrow(/Invalid contact_info\.github/);
  });

  it("keeps only the known keys", () => {
    const result = contactInfo({ github: "me", email: "a@b.c", favorite_color: "blue" });
    expect(result).toMatchObject({ github: "me", email: "a@b.c" });
    expect(result).not.toHaveProperty("favorite_color");
  });
});
