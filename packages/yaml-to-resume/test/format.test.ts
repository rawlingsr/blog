import { describe, expect, it } from "vitest";
import { contactLinks, formatDateRange } from "../src/index";

describe("formatDateRange", () => {
  it("shows Present for an ongoing range", () => {
    expect(formatDateRange([new Date("2016-06"), null])).toBe("June 2016 - Present");
  });

  it("shows both ends of a finished range", () => {
    expect(formatDateRange([new Date("2016-06"), new Date("2023-11")])).toBe("June 2016 - November 2023");
  });

  it("returns an empty string with no dates", () => {
    expect(formatDateRange(null)).toBe("");
    expect(formatDateRange(undefined)).toBe("");
  });
});

describe("contactLinks", () => {
  it("returns [] for missing or empty info", () => {
    expect(contactLinks(null)).toEqual([]);
    expect(contactLinks(undefined)).toEqual([]);
    expect(contactLinks({})).toEqual([]);
    expect(contactLinks({ github: "" })).toEqual([]);
  });

  it("builds every link type in a fixed order", () => {
    const links = contactLinks({
      phone: "555-555-5555",
      website: "example.com",
      location: "Salt Lake City, UT",
      email: "me@example.com",
      github: "octo",
      linkedin: "someone",
    });
    expect(links).toEqual([
      { type: "linkedin", label: "LinkedIn Profile", value: "someone", href: "https://www.linkedin.com/in/someone/" },
      { type: "github", label: "GitHub Profile", value: "octo", href: "https://github.com/octo/" },
      { type: "email", label: "Email", value: "me@example.com", href: "mailto:me@example.com" },
      {
        type: "location",
        label: "Location",
        value: "Salt Lake City, UT",
        href: "https://www.google.com/maps/place/Salt%20Lake%20City%2C%20UT/",
      },
      { type: "website", label: "Website", value: "example.com", href: "https://example.com/" },
      { type: "phone", label: "Phone Number", value: "555-555-5555", href: "tel:555-555-5555" },
    ]);
  });

  it("uses a website that already has a scheme as written", () => {
    const href = (website: string) => contactLinks({ website })[0].href;
    expect(href("http://example.com")).toBe("http://example.com");
    expect(href("https://example.com/about")).toBe("https://example.com/about");
    expect(href("HTTPS://Example.com")).toBe("HTTPS://Example.com");
    expect(href("example.com")).toBe("https://example.com/");
  });

  it("accepts a full profile URL on the right site for LinkedIn and GitHub", () => {
    const href = (info: Parameters<typeof contactLinks>[0]) => contactLinks(info)[0].href;
    expect(href({ linkedin: "https://www.linkedin.com/in/someone" })).toBe("https://www.linkedin.com/in/someone");
    expect(href({ linkedin: "https://uk.linkedin.com/in/someone/" })).toBe("https://uk.linkedin.com/in/someone/");
    expect(href({ linkedin: "HTTPS://LinkedIn.com/in/someone" })).toBe("HTTPS://LinkedIn.com/in/someone");
    expect(href({ github: "http://github.com/octo" })).toBe("http://github.com/octo");
    expect(href({ github: "https://www.github.com/octo" })).toBe("https://www.github.com/octo");
  });

  it.each([
    ["github", "https://gitlab.com/octo"],
    ["github", "https://github.com.evil.example/octo"],
    ["github", "https://gist.github.com/octo"],
    ["github", "github.com/octo"],
    ["github", "octo cat"],
    ["linkedin", "https://notlinkedin.com/in/someone"],
    ["linkedin", "https://linkedin.com.evil.example/in/someone"],
    ["linkedin", "linkedin.com/in/someone"],
  ] as const)("rejects %s value %j with an error naming the field", (type, value) => {
    expect(() => contactLinks({ [type]: value })).toThrow(
      new RegExp(`Invalid contact_info\\.${type}: .*Expected a (GitHub|LinkedIn) username or a full`),
    );
  });

  it("skips fields that aren't set", () => {
    expect(contactLinks({ github: "octo", email: "me@example.com" }).map((l) => l.type)).toEqual([
      "github",
      "email",
    ]);
  });
});
