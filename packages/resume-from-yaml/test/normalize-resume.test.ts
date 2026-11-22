import { describe, expect, it } from "vitest";
import { normalizeResume } from "../src/index";

describe("normalizeResume", () => {
  it("prefers summary over objective", () => {
    expect(normalizeResume({ summary: "S", objective: "O" }).intro).toEqual({ kind: "summary", text: "S" });
  });

  it("falls back to objective, then null", () => {
    expect(normalizeResume({ objective: "O" }).intro).toEqual({ kind: "objective", text: "O" });
    expect(normalizeResume({}).intro).toBeNull();
    expect(normalizeResume({ summary: "" }).intro).toBeNull();
  });

  it("fills in empty defaults for a minimal resume", () => {
    expect(normalizeResume({ name: "A" })).toEqual({
      name: "A",
      target_position: undefined,
      intro: null,
      schools: [],
      skills: [],
      companies: [],
      contact_info: {},
    });
  });

  it("drops an empty target_position", () => {
    expect(normalizeResume({ name: "A", target_position: "" }).target_position).toBeUndefined();
    expect(normalizeResume({ name: "A", target_position: "Dev" }).target_position).toBe("Dev");
  });

  it("runs the getters (hiding companies, converting dates)", () => {
    const resume = normalizeResume({
      companies: [
        { name: "Shown", dates_worked: ["2020-01"] },
        { name: "Hidden" },
      ],
      schools: [{ name: "U", graduation_date: "2015-05" }],
    });
    expect(resume.companies.map((c) => c.name)).toEqual(["Shown"]);
    expect(resume.schools[0].graduation_date).toBeInstanceOf(Date);
  });

  it("throws for a malformed date", () => {
    expect(() => normalizeResume({ companies: [{ name: "Acme", dates_worked: ["2020-13"] }] })).toThrow(
      /company "Acme"/,
    );
  });
});
