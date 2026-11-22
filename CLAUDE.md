# CLAUDE.md

Personal website: resume, blog, and contact page. Built with Next.js 16 (App Router), React 19, and TypeScript. There is no database and no CMS. All content comes from YAML and Markdown files in `src/`, which server components read from disk at request or build time.

## Commands

Use **pnpm**. It's the only package manager that has been tested with this repo.

```sh
pnpm install
pnpm dev      # next dev --turbopack
pnpm build    # production build; also type-checks
pnpm start
pnpm lint     # eslint (next core-web-vitals + typescript configs)
```

There is no test suite. Check changes with `pnpm lint` and `pnpm build`.

## Layout

```
src/
  app/
    layout.tsx              # root: global.css, Fira Sans, FontAwesome CSS setup
    (main)/                 # site chrome: Header + Footer, title template "%s | Ryan Rawlings"
      page.tsx              # home = resume rendered as a web page
      blog/page.tsx         # post list
      blog/[slug]/page.tsx  # single post (notFound() if the file is missing)
      contact/page.tsx      # contact links from career data
    (print)/resume/page.tsx # print-optimized resume (own header with contact info, no site nav/footer)
  components/
    resume/                 # Introduction, Education, Experience, SkillsWithKeywords, resume Header
    blog-post.tsx           # react-markdown with plugins enabled per post
    contact.tsx             # one FontAwesome link component per contact type
  utils/
    career-data.ts          # loads and normalizes the resume YAML
    posts.ts                # loads Markdown posts with front-matter
    helpers.ts              # monthYear()
  career-data.yaml          # resume source of truth (committed)
  career-data.override.example.yaml
  posts/*.md                # blog posts; the filename is the slug
  global.css                # all styles, including the @media print rules
```

The `@/*` import alias maps to `src/*`.

## Career data (resume)

- `getData()` in `src/utils/career-data.ts` reads `src/career-data.yaml`. If `src/career-data.override.yaml` exists (it's gitignored), it is deep-merged on top. Objects merge key by key. Scalars, arrays, and `null` replace the base value, so overriding `skills` or `companies` replaces the whole list. Use the override file for private details (phone, email) and for per-application tweaks such as `target_position`.
- `getData()` returns an untyped object. The `getCompanies`, `getSchools`, `getSkills`, and `getContactInfo` helpers turn it into the typed interfaces and convert date strings to `Date`.
- Companies **without** `dates_worked` (missing or `null`) are silently dropped. This is intentional: it's how to hide a company. Position `dates_worked` is optional. Write dates as `[from]` or `[from, to]`; a `to` of null or empty renders as "Present".
- Malformed dates fail the build instead of rendering. `parseDate` / `parseDatesWorked` throw an error that names the entry for a bad value (e.g. `2020-13`), an empty `dates_worked: []`, or a missing `graduation_date`.
- `contact_info` may be missing or `null`. Pages then render no contact links.
- Top-level keys used by pages: `name`, `target_position`, `summary` or `objective` (summary wins), `schools`, `skills` (`name` plus `keywords`), `companies` (each with `positions`, which have `achievements`), and `contact_info` (`linkedin`/`github` are usernames; `website` has no scheme).
- Paths are built from `process.cwd()`, so the app has to run from the repo root.

## Blog posts

- Each `src/posts/<slug>.md` file has front-matter with these fields: `title`, `published_at` (ISO date), `snippet`, `math`, `gfm`, `cc_licensed`.
- `math: true` turns on remark-math and rehype-mathjax. `gfm: true` turns on remark-gfm. `cc_licensed: true` adds a CC BY-NC-SA badge (`public/by-nc-sa.png`).
- `getPosts()` reads only the `*.md` files in `src/posts/` (other files are ignored) and sorts by `published_at`, newest first.
- Slugs (filenames without `.md`) may only contain letters, numbers, and hyphens. `getPost()` rejects anything else so URLs can't reach files outside `src/posts`, which means a file named any other way 404s.
- A post with a missing or invalid `published_at` is treated as not found: it 404s and is left off `/blog`.

## Print resume

`/resume` is the page to print to PDF. Page-break behavior lives in the `@media print` block at the end of `src/global.css`: it uses `break-inside: avoid-page` on the company, position, education, and skills sections, hides `.page-footer` and `nav p, nav li`, and removes the `.page-header` background. The site header's logo and name are **not** hidden, so the `(main)` pages don't print cleanly; use `/resume`. Section order differs from the home page (Skills, then Experience, then Education). The browser tab title (and so the default PDF filename) is `${name} - ${target_position}`, or just `name` when `target_position` is empty.

## Conventions

- Everything renders on the server: no `"use client"` components, no API routes, and no Server Actions. Components are a mix of sync and async server components. Don't add `"use server"` to data helpers like `src/utils/posts.ts`, because that would turn them into publicly callable endpoints.
- Styling is plain global CSS with class names. No CSS modules and no Tailwind.
- `.idea/` is committed because the author uses JetBrains IDEs.
