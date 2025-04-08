import { BlogEntry } from "@/components/post";
import { getPost } from "@/utils/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) {
    return notFound();
  }
  return {
    title: post.title,
  };
}

export default async function Post({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) {
    return notFound();
  }

  return (
    <main>
      <BlogEntry data={post} />
    </main>
  );
}
