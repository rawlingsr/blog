import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { Post } from "@/utils/posts";
import remarkGfm from "remark-gfm";

export async function BlogEntry({data}: { data: Post }) {
  const content = data.content;
  const date = data.published_at.toISOString().split("T")[0];


  return (
    <main>
      <h1>{data.title}</h1>
      <time dateTime={date}>
        {date}
      </time>
      <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
        {content}
      </Markdown>
    </main>

  )

}
