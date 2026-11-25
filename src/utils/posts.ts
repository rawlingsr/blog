import fm from "front-matter";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";


/** A blog post from `src/posts/<slug>.md`. Everything except `slug` and `content` comes from front-matter. */
export interface Post {
  /** The filename without `.md`, used in the URL (`/blog/<slug>`). Letters, numbers, and hyphens only. */
  slug: string;
  /** Required; a post without one is treated as not found. */
  title: string;
  /** Required ISO date; sorts `/blog` newest first and is shown as YYYY-MM-DD. */
  published_at: Date;
  /** The Markdown body after the front-matter. */
  content: string;
  /** Short summary shown on `/blog` and under the post's title. Empty if missing. */
  snippet: string;
  /** Renders LaTeX math (`$...$`, `$$...$$`) with remark-math and rehype-mathjax. */
  math: boolean;
  /**
   * GitHub Flavored Markdown (remark-gfm): tables, ~~strikethrough~~, task lists (`- [ ]`),
   * bare URLs as links, and footnotes. Off means plain CommonMark.
   */
  gfm: boolean;
  /** Shows the CC BY-NC-SA license badge (`public/by-nc-sa.png`) on the post. */
  cc_licensed: boolean;
}

export async function getPosts(): Promise<Post[]> {
  const files = await readdir(join(process.cwd(), "src", "posts"));
  const slugs = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
  const results = await Promise.all(slugs.map(getPost));
  const posts = results.filter((post): post is Post => post !== null);
  posts.sort((a, b) => b.published_at.getTime() - a.published_at.getTime());
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  // Slugs come from the URL; only allow plain filenames so they can't escape src/posts.
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return null;
  }

  let text: string;
  try {
    text = await readFile(join(process.cwd(), "src", "posts", `${slug}.md`), { encoding: "utf8" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }

  // Front-matter is untrusted text: check each field's type instead of trusting the cast.
  const { attributes, body } = fm<Record<string, unknown>>(text);

  // A post without a title or a valid date is treated as not found (404, left off /blog).
  const title = attributes.title;
  if (typeof title !== "string" || title.trim() === "") {
    return null;
  }
  const published_at = new Date(attributes.published_at as string);
  if (Number.isNaN(published_at.getTime())) {
    return null;
  }

  return {
    slug,
    title,
    published_at,
    content: body,
    snippet: typeof attributes.snippet === "string" ? attributes.snippet : "",
    // Only a real YAML boolean turns these on, so `math: "false"` stays off.
    math: attributes.math === true,
    gfm: attributes.gfm === true,
    cc_licensed: attributes.cc_licensed === true,
  };
}
