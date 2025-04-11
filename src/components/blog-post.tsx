"use client";

import Markdown from "react-markdown";
import rehypeMathJax from "rehype-mathjax";
import remarkMath from "remark-math";
import { Post } from "@/utils/posts";
import remarkGfm from "remark-gfm";

function remarkPlugins(data: Post) {
  let plugins = [];

  if (data.math) {
    plugins.push(remarkMath);
  }

  if (data.gfm) {
    plugins.push(remarkGfm);
  }

  return plugins;
}

function rehypePlugins(data: Post) {
  let plugins = [];

  if (data.math) {
    plugins.push(rehypeMathJax);
  }

  return plugins;
}

export function BlogPost({ data }: { data: Post }) {
  const content = data.content;
  const date = data.published_at.toISOString().split("T")[0];

  return (
    <Markdown
      remarkPlugins={remarkPlugins(data)}
      rehypePlugins={rehypePlugins(data)}
    >
      {content}
    </Markdown>
  );
}
