import Markdown from "react-markdown";
import rehypeMathJax from "rehype-mathjax";
import remarkMath from "remark-math";
import { Post } from "@/utils/posts";
import remarkGfm from "remark-gfm";

function remarkPlugins(data: Post) {
  const plugins = [];

  if (data.math) {
    plugins.push(remarkMath);
  }

  if (data.gfm) {
    plugins.push(remarkGfm);
  }

  return plugins;
}

function rehypePlugins(data: Post) {
  const plugins = [];

  if (data.math) {
    plugins.push(rehypeMathJax);
  }

  return plugins;
}

export async function BlogPost({ data }: { data: Post }) {
  return (
    <Markdown
      remarkPlugins={remarkPlugins(data)}
      rehypePlugins={rehypePlugins(data)}
    >
      {data.content}
    </Markdown>
  );
}
