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
  const promises = [];
  for (const file of files) {
    const slug = file.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.published_at.getTime() - a.published_at.getTime());
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const fileName = join(process.cwd(), "/src/posts/", `${slug}.md`);

  try {
    await fs.access(fileName);
  } catch {
    return null;
  }

  const text = await fs.readFile(fileName, { encoding: "utf8" });
  const { attributes, body } = fm<Post>(text);

  return {
    slug,
    title: attributes.title,
    published_at: new Date(attributes.published_at),
    content: body,
    snippet: attributes.snippet,
    math: attributes.math,
    gfm: attributes.gfm,
    cc_licensed: attributes.cc_licensed,
  };
}
