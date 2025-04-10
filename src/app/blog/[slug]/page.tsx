import { BlogEntry } from "@/components/post";
import { getPost } from "@/utils/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
      <article>
        <p>{post.math ? "true" : "false"}</p>
        <BlogEntry data={post} />
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
        alt="Creative Commons logo thing"
      />
    </Link>
  );
}
