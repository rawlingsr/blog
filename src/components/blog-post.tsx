import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { Post } from "@/utils/posts";
import remarkGfm from "remark-gfm";

export function BlogPost({ data }: { data: Post }) {
  const content = data.content;
  const date = data.published_at.toISOString().split("T")[0];

  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
    >
      {content}
    </Markdown>
  );
}
