import type { ContactInfo, DatesWorked } from "./types";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function monthYear(date: Date) {
  return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

/** "June 2016 - Present", "June 2016 - November 2023", or "" when there are no dates. */
export function formatDateRange(dates: DatesWorked | undefined): string {
  if (!dates) {
    return "";
  }
  const [from, to] = dates;
  return `${monthYear(from)} - ${to ? monthYear(to) : "Present"}`;
}

export type ContactType = "linkedin" | "github" | "email" | "location" | "website" | "phone";

export interface ContactLink {
  type: ContactType;
  href: string;
  /** Human-readable name for the link, e.g. "GitHub Profile". */
  label: string;
  /** The value from the resume data, e.g. the GitHub username. */
  value: string;
}

const isHttpUrl = (value: string) => /^https?:\/\//i.test(value);

// A value that is already a full http(s) URL is used as written; otherwise `build` turns it into one.
function urlOr(build: (value: string) => string) {
  return (value: string) => (isHttpUrl(value) ? value : build(value));
}

// LinkedIn and GitHub take a username or a full profile URL on that site. Anything else throws,
// so a link is never labeled "GitHub Profile" when it points somewhere else.
function profileHref(
  type: ContactType,
  site: string,
  isSiteHost: (host: string) => boolean,
  build: (username: string) => string,
) {
  return (value: string) => {
    const fail = () => {
      throw new Error(
        `Invalid contact_info.${type}: ${JSON.stringify(value)} in resume data. ` +
        `Expected a ${site} username or a full ${site} URL.`,
      );
    };
    if (isHttpUrl(value)) {
      let host = "";
      try {
        host = new URL(value).hostname.toLowerCase();
      } catch {
        fail();
      }
      return isSiteHost(host) ? value : fail();
    }
    // Usernames can't contain URL structure, which also catches "github.com/me" without a scheme.
    return /^[^\s/?#]+$/.test(value) ? build(value) : fail();
  };
}

const contactRules: { type: ContactType; label: string; href: (value: string) => string }[] = [
  {
    type: "linkedin",
    label: "LinkedIn Profile",
    href: profileHref(
      "linkedin",
      "LinkedIn",
      (host) => host === "linkedin.com" || host.endsWith(".linkedin.com"),
      (v) => `https://www.linkedin.com/in/${v}/`,
    ),
  },
  {
    type: "github",
    label: "GitHub Profile",
    href: profileHref(
      "github",
      "GitHub",
      (host) => host === "github.com" || host === "www.github.com",
      (v) => `https://github.com/${v}/`,
    ),
  },
  { type: "email", label: "Email", href: (v) => `mailto:${v}` },
  { type: "location", label: "Location", href: (v) => `https://www.google.com/maps/place/${encodeURIComponent(v)}/` },
  // A full URL or a bare domain like example.com (which gets https:// added).
  { type: "website", label: "Website", href: urlOr((v) => `https://${v}/`) },
  { type: "phone", label: "Phone Number", href: (v) => `tel:${v}` },
];

/** Turns contact info into links, in a fixed order, skipping empty fields. */
export function contactLinks(info: ContactInfo | null | undefined): ContactLink[] {
  if (!info) {
    return [];
  }
  return contactRules.flatMap(({ type, label, href }) => {
    const value = info[type];
    return value ? [{ type, label, value, href: href(value) }] : [];
  });
}
