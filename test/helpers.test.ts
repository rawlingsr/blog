import { describe, expect, it } from "vitest";
import { monthYear } from "@/utils/helpers";

describe("monthYear", () => {
  it("formats a YAML-style year-month in UTC, regardless of local time zone", () => {
    // Midnight UTC on Nov 1 is still Oct 31 in Honolulu (see vitest.config.ts).
    expect(monthYear(new Date("2023-11"))).toBe("November 2023");
  });

  it("handles January and December", () => {
    expect(monthYear(new Date("2020-01"))).toBe("January 2020");
    expect(monthYear(new Date("2020-12-31"))).toBe("December 2020");
  });
});
