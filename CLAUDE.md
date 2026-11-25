# CLAUDE.md

Personal website: resume, blog, and contact page. Built with Next.js 16 (App Router), React 19, and TypeScript. There is no database and no CMS. All content comes from YAML and Markdown files in `src/`, which server components read from disk at request or build time.

The YAML → resume logic and the resume React components live in their own repo, `yaml-to-resume` (`github.com/rawlingsr/yaml-to-resume`, MIT, not yet on npm), so they can be used from other sites. The site installs it from GitHub; see "yaml-to-resume" below.

## Commands

Use **pnpm**. It's the only package manager that has been tested with this repo.

```sh
pnpm install
pnpm dev      # next dev --turbopack
pnpm build    # production build; also type-checks
pnpm start
pnpm lint     # eslint (next core-web-vitals + typescript configs)
pnpm test     # vitest run (site tests only; the package's tests live in its repo)
pnpm test:watch
```

Check changes with `pnpm lint`, `pnpm test`, and `pnpm build`.

## Tests

Vitest. `vitest.config.mts` sets the `@` alias, includes `test/**/*.test.ts`, and sets `TZ=Pacific/Honolulu` on purpose so code that mixes local time and UTC fails in tests.

- `test/career-loader.test.ts`, `test/posts.test.ts`: the site's loaders, which read from `process.cwd()`. They use `vi.spyOn(process, "cwd")` to point at directories under `test/fixtures/<name>/`, each shaped like the repo root (`src/career-data.yaml`, `src/posts/`).
- `test/real-content.test.ts`: smoke test on the real `src/career-data.yaml` (plus your local override, if you have one) and checks that every real post loads.

## Layout

```
src/
  app/
    layout.tsx              # root: yaml-to-resume/styles.css then global.css, Fira Sans, FontAwesome CSS setup
    (main)/                 # site chrome: Header + Footer, title template "%s | Ryan Rawlings"
      page.tsx              # home = <Resume> from yaml-to-resume/react
      blog/page.tsx         # post list
      blog/[slug]/page.tsx  # single post (notFound() if the file is missing)
      contact/page.tsx      # <ContactLinks> from yaml-to-resume/react
    (print)/resume/page.tsx # print-optimized resume: <ResumeHeader> + <Resume> (no site nav/footer), preceded by the optional cover letter
  components/
    blog-post.tsx           # react-markdown with plugins enabled per post
    contact.tsx             # fontAwesomeContactIcon(size): the site's renderIcon for the package's contact links
    theme-toggle.tsx        # <ThemeToggle> button (header) + <ThemeScript> inline script (root layout)
  utils/
    career-data.ts          # getResume() (validated Resume, used by pages), getData() (raw merged YAML); re-exports the getters/types
    posts.ts                # loads Markdown posts with front-matter
    cover-letter.ts         # getCoverLetter(): private/cover-letter.md or null
  career-data.yaml          # resume source of truth (committed)
  career-data.override.example.yaml
  posts/*.md                # blog posts; the filename is the slug
  global.css                # site styles (chrome, nav, blog, page-level print); resume styles come from the package
test/                       # site vitest tests + fixtures (see Tests)
```

The `@/*` import alias maps to `src/*`.

## yaml-to-resume

- **Where it lives:** its own repo, cloned at `../yaml-to-resume` (`~/projects/yaml-to-resume`). Its `CLAUDE.md` covers its code, tests, YAML rules, and npm publishing. Package changes (and their lint/typecheck/test runs) happen there, not here.
- **How the site gets it:** `"yaml-to-resume": "github:rawlingsr/yaml-to-resume#semver:^0.2.0"`. The `#semver:` range matches the repo's `vX.Y.Z` tags, and `pnpm-lock.yaml` pins the exact commit. The package's `exports` point at TypeScript source in `src/` and GitHub installs build nothing, so `next.config.ts` lists it in `transpilePackages`. Keep that until the site switches to an npm release (which would ship compiled `dist/`).
- **Updating:** release in the package repo (bump `version`, commit, tag `vX.Y.Z`, push with tags), then here `pnpm update yaml-to-resume` and commit `package.json`/`pnpm-lock.yaml`. A new major (or a 0.x minor, under `^0.2.0`) needs the spec in `package.json` changed.
- **Trying package changes before a release:** either way, the committed `package.json` and lockfile must end up back on the `#semver:` spec, or Vercel can't install it.
  - **Local, unpushed:** `pnpm link ../yaml-to-resume`. pnpm 10 records this as a `"yaml-to-resume": "link:../yaml-to-resume"` entry in `pnpm.overrides` in `package.json` (an override beats any version spec), so undo it by removing that entry and running `pnpm install`.
  - **Pushed to a branch, untagged:** pin the exact commit, `github:rawlingsr/yaml-to-resume#<full sha>`, and `pnpm install`. This installs from GitHub the way Vercel does. Pushing to a branch instead of `main` keeps GitHub's README (which names the next `#semver:` range) from pointing at a tag that doesn't exist yet.

## Career data (resume)

- `getResume()` in `src/utils/career-data.ts` calls `loadResume` from `yaml-to-resume/node` with `src/career-data.yaml` and `src/career-data.override.yaml` and returns a validated `Resume`; pages pass it to the `yaml-to-resume/react` components. `getData()` reads the same files with `readResumeYaml` and returns the raw merged data (the site tests use it). Build these paths from literal segments (`join(process.cwd(), "src", "career-data.yaml")`); a variable path makes Turbopack trace the whole project and warn. If the override file exists (it's gitignored), it is deep-merged on top. Objects merge key by key. Scalars, arrays, and `null` replace the base value, so overriding `skills` or `companies` replaces the whole list. Use the override file for private details (phone, email) and for per-application tweaks such as `target_position`.
- The top level of each file must be a YAML mapping. YAML syntax errors name the file.
- `normalizeResume(raw)` (used by `loadResume`) runs the `getCompanies`, `getSchools`, `getSkills`, `getCertifications`, and `getContactInfo` getters, converts date strings to `Date`, and resolves `intro` from `summary`/`objective`. They and `deepMerge` live in the package's `src/normalize.ts`; `src/utils/career-data.ts` re-exports the getters and types.
- Companies **without** `dates_worked` (missing or `null`) are silently dropped. This is intentional: it's how to hide a company. Position `dates_worked` is optional. Write dates as `[from]` or `[from, to]`; a `to` of null or empty renders as "Present".
- Malformed dates fail the build instead of rendering. `parseDate` / `parseDatesWorked` throw an error that names the entry for a bad value (e.g. `2020-13`), an empty `dates_worked: []`, or a missing `graduation_date`.
- `contact_info` may be missing or `null`. Pages then render no contact links. `contactLinks()` in the package's `format.ts` owns the URL rules: `website` may be a bare domain (gets `https://`) or a full URL; `linkedin`/`github` may be a username or a full URL on that site. Any other `linkedin`/`github` value fails at load time with an error naming the field.
- Top-level keys used by pages: `name`, `target_position`, `summary` or `objective` (summary wins), `schools`, `skills` (`name` plus `keywords`), `companies` (each with `positions`, which have `achievements`), `certifications`, and `contact_info` (see the contact rules above).
- `certifications` is an optional list: `name` (required), plus optional `issuer`, `year` (four digits, e.g. `2017`), and `url` (a full http(s) link, such as a verification page, which makes the name a link). A missing name, a bad year, or a non-http(s) URL fails at load time with an error naming the entry. The section renders nothing when the list is empty.
- Paths are built from `process.cwd()`, so the app has to run from the repo root.

## Blog posts

- Each `src/posts/<slug>.md` file has front-matter with these fields: `title`, `published_at` (ISO date), `snippet`, `math`, `gfm`, `cc_licensed`.
- `math: true` turns on remark-math and rehype-mathjax. `gfm: true` turns on remark-gfm. `cc_licensed: true` adds a CC BY-NC-SA badge (`public/by-nc-sa.png`).
- `getPosts()` reads only the `*.md` files in `src/posts/` (other files are ignored) and sorts by `published_at`, newest first.
- Slugs (filenames without `.md`) may only contain letters, numbers, and hyphens. `getPost()` rejects anything else so URLs can't reach files outside `src/posts`, which means a file named any other way 404s.
- A post with a missing or invalid `published_at` is treated as not found: it 404s and is left off `/blog`.

## Print resume

`/resume` is the page to print to PDF. If `private/cover-letter.md` exists (the `private/` folder is gitignored, so never on the deployed site), the page first renders it as Markdown under its own `<ResumeHeader>` inside `.cover-letter`, which has `break-after: page` in print, so the letter prints on page 1 and the resume starts on page 2. The page-break rules (`break-inside: avoid-page` on `.resume-company-summary`, `.resume-position`, `.resume-education`, `.resume-skills`, and `.resume-certifications`) live in the package's `src/styles.css`. The site's `@media print` block at the end of `src/global.css` forces `color-scheme: light` (so a dark theme, from the OS or the toggle, still prints dark text on white), sets print sizing to keep `/resume` at two Letter pages (`@page { margin: 0.5in }`, 10.5pt root font, tighter heading/paragraph/list margins), and otherwise handles only the page chrome: it hides `.page-footer` and `nav p, nav li`, and removes the `.page-header` background. The site header's logo and name are **not** hidden, so the `(main)` pages don't print cleanly; use `/resume`. Section order differs from the home page (Skills, Experience, Education, then Certifications, which fills the space at the end of page 2), set with `<Resume sections={[…]}>`. The home page uses the package's default order, which puts Certifications last. Check page fit in a real Firefox print preview; layout-height estimates don't account for where page breaks land. The print page passes `introHeadingClassName="intro-heading"` (a site rule in `global.css`). The browser tab title (and so the default PDF filename) is `${name} - ${target_position}`, or just `name` when `target_position` is empty.

## Conventions

- Everything renders on the server: no `"use client"` components, no API routes, and no Server Actions. Components are a mix of sync and async server components. Don't add `"use server"` to data helpers like `src/utils/posts.ts`, because that would turn them into publicly callable endpoints.
- The one piece of client JS is the three-way theme toggle in `src/components/theme-toggle.tsx`. Each click cycles system → light → dark, and the button's icon shows the current mode. `<ThemeScript>` is an inline `<script>` in the root layout's `<head>`. Before paint it applies the saved choice (`localStorage.theme`, `light` or `dark`) as `data-theme` on `<html>`, and it handles clicks on the server-rendered `.theme-toggle` button in the header through a delegated document listener. `global.css` maps `data-theme` to `color-scheme`, so any color written with `light-dark()` follows it. System mode is no `data-theme` and nothing saved, so the site follows `prefers-color-scheme`. `<html>` has `suppressHydrationWarning` because of that attribute.
- Styling is plain global CSS with class names. No CSS modules and no Tailwind. `src/app/layout.tsx` imports `yaml-to-resume/styles.css` before `global.css` so site rules can override the package's.
- `yaml-to-resume` must stay framework-neutral (no `next/*` imports, nothing site-specific such as paths, branding, or FontAwesome). Site-specific code stays in `src/` and goes in through props (`logo`, `renderIcon`, `className`). Its components only use class names that start with `resume-`.
- `.idea/` is committed because the author uses JetBrains IDEs.
