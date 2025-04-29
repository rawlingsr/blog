import { BlogPost } from "@/components/blog-post";
import { Fallback } from "@/components/fallback";
import { getPost } from "@/utils/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const experimental_ppr = true

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
  const date = post.published_at.toISOString().split("T")[0];

  return (
    <main>
      <article>
        <h2>{post.title}</h2>
        <time dateTime={date}>
          {date}
        </time>
        <h3>{post.snippet}</h3>
        <Suspense fallback={<Fallback/>}>
          <BlogPost data={post} />
        </Suspense>
        {post.cc_licensed ? <CC_Image /> : null}
      </article>
    </main>
  );
}

async function CC_Image() {
  return (
    <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
      <Image
        src={"/by-nc-sa.png"}
        height={70}
        width={200}
        alt="Creative Commons, Attribution, Non-Commercial, Share Alike"
      />
    </Link>
  );
}
