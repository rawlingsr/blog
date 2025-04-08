import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, Post } from "@/utils/posts";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostListPage() {
  const posts = await getPosts();
  return (
    <main>
      <h2>Posts</h2>
      <div>
        {posts.map((post: Post) => <PostCard key={post.slug} post={post} />)}
      </div>
    </main>
  );
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <Link href={`/blog/${post.slug}`} className="post-link">
      <div id={post.slug} className="post-list-item">
        <h3>
          {post.title}
        </h3>
        <time>
          {new Date(post.published_at).toISOString().split("T")[0]}
        </time>
        <div>
          {post.snippet}
        </div>
      </div>
    </Link>
  );
}
