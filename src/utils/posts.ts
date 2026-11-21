"use server";

import fm from "front-matter";
import fs from "node:fs/promises";
import { join } from "path";


export interface Post {
  slug: string;
  title: string;
  published_at: Date;
  content: string;
  snippet: string;
  math: boolean;
  gfm: boolean;
  cc_licensed: boolean;
}

export async function getPosts(): Promise<Post[]> {
  const files = await fs.readdir(join(process.cwd(), "/src/posts/"));
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

  const fileName = join(process.cwd(), "/src/posts/", `${slug}.md`);

  try {
    await fs.access(fileName);
  } catch {
    return null;
  }

  const text = await fs.readFile(fileName, { encoding: "utf8" });
  const { attributes, body } = fm<Post>(text);
  const published_at = new Date(attributes.published_at);
  if (Number.isNaN(published_at.getTime())) {
    return null;
  }

  return {
    slug,
    title: attributes.title,
    published_at,
    content: body,
    snippet: attributes.snippet,
    math: attributes.math,
    gfm: attributes.gfm,
    cc_licensed: attributes.cc_licensed,
  };
}
