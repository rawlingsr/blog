# yaml-to-resume

Write your resume once in YAML, and render it as a web page you can print to PDF.

`yaml-to-resume` reads a YAML file and gives you either typed data or ready-made React components. The components have no hooks and no client-side JavaScript, so they work as React Server Components and in any React setup. An optional stylesheet handles layout and print page breaks.

- **One source of truth:** your resume lives in a readable YAML file you can keep in git.
- **Overrides:** merge a second file on top for private details (phone, email) or a different job title per application.
- **Bring your own site:** drop `<Resume>` into an existing Next.js (or other React) site, or use only the data.

## Install

```sh
npm install yaml-to-resume
# React is only needed for the components:
npm install react
```

Requires Node.js 22 or later.

## Write your resume

The package ships a complete, fictional example: [`examples/resume.yaml`](examples/resume.yaml). It is never loaded for you; `loadResume` always reads the file you point it at. Copy the example into your own project and edit the copy:

```sh
mkdir -p content
cp node_modules/yaml-to-resume/examples/resume.yaml content/resume.yaml
# Optional: an override file for private details. Add it to .gitignore if it holds your phone or email.
cp node_modules/yaml-to-resume/examples/resume.override.yaml content/resume.override.yaml
```

Then point `loadResume` at `content/resume.yaml`, as in the Next.js example below. The example is tested against every release, so it always matches the version you installed.

The fields:

| Field | Notes |
| --- | --- |
| `name` | Your name. |
| `target_position` | Optional. The job title shown under your name. |
| `summary` or `objective` | Optional intro paragraph. If both are present, `summary` wins. |
| `contact_info` | Optional. `github`, `linkedin`, `email`, `phone`, `location`, `website`. |
| `companies` | List of jobs: `name`, `location`, `website`, `description`, `dates_worked`, `positions`. |
| `companies[].positions` | `title`, `description`, `achievements` (list), optional `dates_worked`. |
| `schools` | `name`, `degree`, `description`, `website`, `graduation_date`, optional `still_attending: true` (Graduation date shown as "(Expected)"). |
| `skills` | List of groups: `name` and `keywords` (list). |

**Dates** are written `YYYY-MM`, e.g. `2023-11`.

- `dates_worked: [2021-03, 2023-11]` second date is interpreted as the end of a date range.
- `dates_worked: [2021-03]` or `[2021-03, null]` means "from specified date to Present".
- **To hide a company** without deleting it, leave out its `dates_worked`.

**Contact links:**

- `github` and `linkedin` take a username or a full URL on that site. Anything else (say, a GitLab URL under `github`) is an error, so a link is never labeled "GitHub" when it points somewhere else.
- `website` takes a bare domain (`example.com` becomes `https://example.com/`) or a full URL.
- `email`, `phone` and `location` become `mailto:`, `tel:` and map links.

## Overrides

Pass one optional override file as `overrideFile` (any name, any location) and it is deep-merged on top of the first. If the file doesn't exist, it's skipped. See [`examples/resume.override.yaml`](examples/resume.override.yaml).

- Objects merge key by key, so you can add `contact_info.email` and keep `contact_info.github`.
- Scalars, lists and `null` **replace** the base value, so overriding `skills` replaces the whole list.

Only one override is merged at a time. Two ways to use it:

- **Private details:** keep your phone and email in an override file listed in `.gitignore`, so the main resume can be public.
- **Tailoring for an application:** keep one override per application (for example `content/overrides/acme.yaml` with a different `target_position` or `summary`) and pass the path of the one you want when you load the resume. Since only one is merged, an application's file should also include any private details it needs.

For example, to choose the override with an environment variable:

```tsx
// RESUME_FOR=acme npm run build   →   uses content/overrides/acme.yaml
// With RESUME_FOR unset, no override is used.
const application = process.env.RESUME_FOR;
const resume = await loadResume({
  file: join(process.cwd(), "content", "resume.yaml"),
  overrideFile: application
    ? join(process.cwd(), "content", "overrides", `${application}.yaml`)
    : undefined,
});
```

## Use it in Next.js (App Router)

Load the resume in a server component and render it:

```tsx
// app/resume/page.tsx
import { join } from "node:path";
import { loadResume } from "yaml-to-resume/node";
import { Resume, ResumeHeader } from "yaml-to-resume/react";

export default async function ResumePage() {
  const resume = await loadResume({
    // Literal path segments keep Turbopack's file tracing scoped to this folder.
    file: join(process.cwd(), "content", "resume.yaml"),
    overrideFile: join(process.cwd(), "content", "resume.override.yaml"),
  });

  return (
    <>
      <ResumeHeader
        name={resume.name}
        target_position={resume.target_position}
        contact_info={resume.contact_info}
      />
      <main>
        <Resume resume={resume} sections={["intro", "skills", "experience", "education"]} />
      </main>
    </>
  );
}
```

Import the default styles once, before your own CSS so your rules win:

```tsx
// app/layout.tsx
import "yaml-to-resume/styles.css";
import "./globals.css";
```

### Components

From `yaml-to-resume/react`:

- **`<Resume resume sections? className? introHeadingClassName?>`** renders the body. `sections` sets the order and which sections appear: any of `"intro"`, `"education"`, `"experience"`, `"skills"` (default: all four, in that order).
- **`<ResumeHeader name target_position? contact_info? logo? homeHref? renderIcon?>`** shows your name, title and contact links. `logo` is any React node (e.g. your `<Image>`); `homeHref` is where the name links (default `/`).
- **`<ContactLinks info renderIcon?>`** shows just the contact links, e.g. for a contact page.
- The sections on their own: `Introduction`, `Experience`, `Education`, `Skills` and `SkillsWithKeywords`.

**Icons:** the package ships no icon set. Pass `renderIcon` to `<ResumeHeader>` or `<ContactLinks>` to add your own:

```tsx
<ContactLinks info={resume.contact_info} renderIcon={(link) => <MyIcon name={link.type} />} />
```

`link.type` is one of `"linkedin"`, `"github"`, `"email"`, `"location"`, `"website"`, `"phone"`.

### Styling

`yaml-to-resume/styles.css` is optional. Every class name starts with `resume-`, so it won't clash with your site's CSS. To change the look, override classes like these:

- `.resume`: the root of `<Resume>`
- `.resume-header`, `.resume-header-home`, `.resume-header-links`
- `.resume-company`, `.resume-company-header`, `.resume-position`, `.resume-position-header`
- `.resume-education`, `.resume-school-header`
- `.resume-skills`, `.resume-skill-list-keywords`, `.resume-skill-keywords`
- `.resume-contact`, `.resume-contact-btn`, `.resume-contact-text`
- `.resume-description`

## Without React, or without Node

The main entry, `yaml-to-resume`, has no file-system access and no React, so it runs anywhere JavaScript does (browser, edge, Node):

```ts
import { contactLinks, formatDateRange, normalizeResume, parseResumeYaml } from "yaml-to-resume";

const raw = parseResumeYaml(resumeYamlText, overrideYamlText); // override is optional
const resume = normalizeResume(raw); // validates; converts dates to Date objects

for (const company of resume.companies) {
  console.log(company.name, formatDateRange(company.dates_worked)); // "June 2017 - February 2021"
}
console.log(contactLinks(resume.contact_info)); // [{ type, label, value, href }, ...]
```

In Node, `yaml-to-resume/node` also has `readResumeYaml({ file, overrideFile })`, which reads and merges the files but doesn't validate them.

## Printing to PDF

Open the page in a browser and print it, choosing "Save as PDF". With `styles.css` loaded, each job, position and section is kept together on one page where possible.

Tip: the browser uses the page title as the default PDF filename, so set it to something like `"Alex Rivera - Software Engineer"`. In Next.js, return it as `title` from `generateMetadata`.

## Errors

Mistakes fail when the resume is loaded (so in Next.js, at build time), with a message naming the field:

```
Invalid dates_worked start for company "Example Labs": "2021-13" in resume data. Expected a date like 2023-11.
```

This covers:

- malformed dates and empty `dates_worked: []`
- a missing `graduation_date`
- a `github` or `linkedin` value that isn't a username or a URL on that site
- a file whose top level isn't a `key: value` mapping
- YAML syntax errors, which also name the file

## License

MIT
