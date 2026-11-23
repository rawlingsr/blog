# CLAUDE.md

Personal website: resume, blog, and contact page. Built with Next.js 16 (App Router), React 19, and TypeScript. There is no database and no CMS. All content comes from YAML and Markdown files in `src/`, which server components read from disk at request or build time.

The repo is a pnpm workspace. The Next.js site is the root package. The YAML → resume logic and the resume React components live in `packages/yaml-to-resume/` (MIT, not yet published) so they can be used from other sites. The site depends on it as `yaml-to-resume: workspace:^`.

## Commands

Use **pnpm**. It's the only package manager that has been tested with this repo.

```sh
pnpm install
pnpm dev      # next dev --turbopack
pnpm build    # production build; also type-checks
pnpm start
pnpm lint     # eslint (next core-web-vitals + typescript configs)
pnpm test     # vitest run: site tests + every workspace package
pnpm test:watch

pnpm --filter yaml-to-resume build      # tsdown → packages/yaml-to-resume/dist/ (only needed to pack/publish)
pnpm --filter yaml-to-resume typecheck  # tsc on the package alone
```

Check changes with `pnpm lint`, `pnpm test`, and `pnpm build`. For package changes, also run the package's `typecheck`.

## Tests

Vitest. The root `vitest.config.mts` defines two kinds of projects: `site` (the `@` alias, `test/**/*.test.ts`) and `packages/*`, each with its own `vitest.config.mts`. Both configs set `TZ=Pacific/Honolulu` on purpose so code that mixes local time and UTC fails in tests.

- `packages/yaml-to-resume/test/`: the package's logic (`deepMerge`, the getters, date validation, `parseResumeYaml`, `normalizeResume`), formatting (`format.test.ts`: `monthYear`, `formatDateRange`, `contactLinks`), its Node loader, and its components (`react.test.tsx`, rendered with `react-dom/server` `renderToStaticMarkup`, no DOM). They import from `../src/index`, `../src/node`, or `../src/react/index`, never from `@/`. Loader tests pass explicit paths to `test/fixtures/*.yaml`; no cwd mock. `examples.test.tsx` loads and renders `examples/resume.yaml` (+ override) so the shipped example can't drift from the code. The package's vitest config includes `*.test.ts` and `*.test.tsx`.
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
    (print)/resume/page.tsx # print-optimized resume: <ResumeHeader> + <Resume> (no site nav/footer)
  components/
    blog-post.tsx           # react-markdown with plugins enabled per post
    contact.tsx             # fontAwesomeContactIcon(size): the site's renderIcon for the package's contact links
  utils/
    career-data.ts          # getResume() (validated Resume, used by pages), getData() (raw merged YAML); re-exports the getters/types
    posts.ts                # loads Markdown posts with front-matter
  career-data.yaml          # resume source of truth (committed)
  career-data.override.example.yaml
  posts/*.md                # blog posts; the filename is the slug
  global.css                # site styles (chrome, nav, blog, page-level print); resume styles come from the package
test/                       # site vitest tests + fixtures (see Tests)
packages/yaml-to-resume/
  src/index.ts              # "." entry: types, parseResumeYaml, normalizeResume, getters, format helpers (no fs, no React)
  src/node.ts               # "./node" entry: readResumeYaml (raw merged), loadResume (normalized); explicit paths
  src/types.ts              # School, Skill, Company, Position, ContactInfo, DatesWorked, RawResume, Resume, Intro
  src/normalize.ts          # parseDate, parseDatesWorked, deepMerge, getters, normalizeResume
  src/parse.ts              # parseResumeYaml(text, overrideText?): YAML → merged RawResume
  src/format.ts             # monthYear, formatDateRange, contactLinks (contact URL rules + validation)
  src/react/                # "./react" entry: Resume, ResumeHeader, ContactLinks, Introduction, Education, Experience, Skills(WithKeywords)
  src/styles.css            # "./styles.css" entry: optional default styles for the components, incl. print page breaks
  test/                     # package tests
  examples/                 # resume.yaml + resume.override.yaml: fictional template users copy; shipped and tested
  README.md                 # the user-facing docs (shipped on npm)
  tsdown.config.ts          # build config (see "Publishing yaml-to-resume")
  tsconfig.json             # package-only TS config, used by typecheck and the .d.ts build
  dist/                     # build output, gitignored (also ignored by the root tsconfig and eslint)
```

Inside the workspace, the package's `exports` point at TypeScript source in `src/`, so the site and tests use it without a build step; that's why `next.config.ts` lists `yaml-to-resume` in `transpilePackages`. Published copies use the compiled `dist/` instead (see "Publishing yaml-to-resume").

The `@/*` import alias maps to `src/*`.

## Publishing yaml-to-resume

- **Build:** tsdown, pinned to an exact version (it's 0.x). `tsdown.config.ts` builds ESM `.js` + `.d.ts` for the three entries into `dist/` and copies `styles.css`. `platform: "neutral"` (the main and react entries also run in browsers), `fixedExtension: false` (plain `.js`/`.d.ts`), and `deps.neverBundle: [/^node:/]`; `yaml` and `react` stay external as dependency/peer. Check tsdown option names against its installed `.d.ts` files, not memory.
- **Two sets of exports:** `exports` → `src/` (workspace), `publishConfig.exports` → `dist/`. pnpm swaps in `publishConfig.exports` when packing or publishing. Add a new entry point to both.
- **Package metadata:** `files` = `dist`, `examples`, `README.md`, `LICENSE`. `engines.node >= 22`. React is an optional peer (`>=18`); the main and `/node` entries work without it. `"private": true` stays until Ryan decides to publish (his npm account); `repository`/`homepage` are still empty.
- **Docs:** `README.md` is what users read. When the public API, props, or YAML rules change, update the README and, if relevant, `examples/resume.yaml` (its test will catch drift in the example, not in the README prose).
- **Before a release,** test the packed package outside the workspace (this was done for 0.1.0, all passing):
  1. `pnpm --filter yaml-to-resume build`, then `pnpm pack` from the package directory into a scratch folder. Check with `tar -tzf` that the tarball has only `dist/`, `examples/`, `README.md`, `LICENSE`, `package.json`, and that its `exports` point at `dist/`.
  2. In an empty `"type": "module"` project, `npm install <tarball> react react-dom` and run a script that `loadResume`s the example and renders `<Resume>` with `renderToStaticMarkup`. Also check the main entry without React installed.
  3. Type-check a file importing from `.`, `/node`, and `/react` with `tsc --noEmit` under both `moduleResolution: bundler` and `node16`.
  4. A fresh Next.js app built from the README's own snippets, **without** `transpilePackages`: `next build`, then serve and check the HTML and that the `.resume-*` styles are in the CSS.

## Career data (resume)

- `getResume()` in `src/utils/career-data.ts` calls `loadResume` from `yaml-to-resume/node` with `src/career-data.yaml` and `src/career-data.override.yaml` and returns a validated `Resume`; pages pass it to the `yaml-to-resume/react` components. `getData()` reads the same files with `readResumeYaml` and returns the raw merged data (the site tests use it). Build these paths from literal segments (`join(process.cwd(), "src", "career-data.yaml")`); a variable path makes Turbopack trace the whole project and warn. If the override file exists (it's gitignored), it is deep-merged on top. Objects merge key by key. Scalars, arrays, and `null` replace the base value, so overriding `skills` or `companies` replaces the whole list. Use the override file for private details (phone, email) and for per-application tweaks such as `target_position`.
- The top level of each file must be a YAML mapping. YAML syntax errors name the file.
- `normalizeResume(raw)` (used by `loadResume`) runs the `getCompanies`, `getSchools`, `getSkills`, and `getContactInfo` getters, converts date strings to `Date`, and resolves `intro` from `summary`/`objective`. They and `deepMerge` live in `packages/yaml-to-resume/src/normalize.ts`; `src/utils/career-data.ts` re-exports the getters and types.
- Companies **without** `dates_worked` (missing or `null`) are silently dropped. This is intentional: it's how to hide a company. Position `dates_worked` is optional. Write dates as `[from]` or `[from, to]`; a `to` of null or empty renders as "Present".
- Malformed dates fail the build instead of rendering. `parseDate` / `parseDatesWorked` throw an error that names the entry for a bad value (e.g. `2020-13`), an empty `dates_worked: []`, or a missing `graduation_date`.
- `contact_info` may be missing or `null`. Pages then render no contact links. `contactLinks()` in the package's `format.ts` owns the URL rules: `website` may be a bare domain (gets `https://`) or a full URL; `linkedin`/`github` may be a username or a full URL on that site. Any other `linkedin`/`github` value fails at load time with an error naming the field.
- Top-level keys used by pages: `name`, `target_position`, `summary` or `objective` (summary wins), `schools`, `skills` (`name` plus `keywords`), `companies` (each with `positions`, which have `achievements`), and `contact_info` (see the contact rules above).
- Paths are built from `process.cwd()`, so the app has to run from the repo root.

## Blog posts

- Each `src/posts/<slug>.md` file has front-matter with these fields: `title`, `published_at` (ISO date), `snippet`, `math`, `gfm`, `cc_licensed`.
- `math: true` turns on remark-math and rehype-mathjax. `gfm: true` turns on remark-gfm. `cc_licensed: true` adds a CC BY-NC-SA badge (`public/by-nc-sa.png`).
- `getPosts()` reads only the `*.md` files in `src/posts/` (other files are ignored) and sorts by `published_at`, newest first.
- Slugs (filenames without `.md`) may only contain letters, numbers, and hyphens. `getPost()` rejects anything else so URLs can't reach files outside `src/posts`, which means a file named any other way 404s.
- A post with a missing or invalid `published_at` is treated as not found: it 404s and is left off `/blog`.

## Print resume

`/resume` is the page to print to PDF. The page-break rules (`break-inside: avoid-page` on `.resume-company-summary`, `.resume-position`, `.resume-education`, and `.resume-skills`) live in the package's `src/styles.css`. The site's `@media print` block at the end of `src/global.css` handles only the page chrome: it hides `.page-footer` and `nav p, nav li`, and removes the `.page-header` background. The site header's logo and name are **not** hidden, so the `(main)` pages don't print cleanly; use `/resume`. Section order differs from the home page (Skills, then Experience, then Education), set with `<Resume sections={[…]}>`. The print page passes `introHeadingClassName="intro-heading"` (a site rule in `global.css`). The browser tab title (and so the default PDF filename) is `${name} - ${target_position}`, or just `name` when `target_position` is empty.

## Conventions

- Everything renders on the server: no `"use client"` components, no API routes, and no Server Actions. Components are a mix of sync and async server components. Don't add `"use server"` to data helpers like `src/utils/posts.ts`, because that would turn them into publicly callable endpoints.
- Styling is plain global CSS with class names. No CSS modules and no Tailwind. `src/app/layout.tsx` imports `yaml-to-resume/styles.css` before `global.css` so site rules can override the package's.
- `packages/yaml-to-resume` must stay framework-neutral: no `next/*` imports, no `@/` imports, and nothing site-specific (paths, branding, FontAwesome). Site-specific code stays in `src/` and goes in through props (`logo`, `renderIcon`, `className`). Its components are server-safe (no hooks, no `"use client"`), and every class name they use starts with `resume-`. `eslint.config.mjs` turns off the Next-specific `no-img-element` and `no-html-link-for-pages` rules for `packages/**`.
- `.idea/` is committed because the author uses JetBrains IDEs.
