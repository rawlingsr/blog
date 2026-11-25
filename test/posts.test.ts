import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getPost, getPosts } from "@/utils/posts";

beforeEach(() => {
  vi.spyOn(process, "cwd").mockReturnValue(path.join(__dirname, "fixtures", "posts"));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getPost", () => {
  it("loads a post and maps its front-matter", async () => {
    const post = await getPost("newer-post");
    expect(post).toMatchObject({
      slug: "newer-post",
      title: "Newer Post",
      snippet: "The newer one.",
      math: true,
      gfm: false,
      cc_licensed: true,
    });
    expect(post?.published_at).toBeInstanceOf(Date);
    expect(post?.published_at.toISOString().slice(0, 10)).toBe("2024-06-01");
    expect(post?.content.trim()).toBe("Newer body.");
  });

  it("returns null for a slug with no file", async () => {
    expect(await getPost("missing")).toBeNull();
  });

  it.each(["../etc/passwd", "a/b", "a.b", "", "older-post.md", "has space"])(
    "rejects the unsafe slug %j",
    async (slug) => {
      expect(await getPost(slug)).toBeNull();
    },
  );

  it("returns null for a post with an invalid published_at", async () => {
    expect(await getPost("bad-date")).toBeNull();
  });

  it("returns null for a post with no title", async () => {
    expect(await getPost("no-title")).toBeNull();
  });

  it("only turns flags on for real booleans, so quoted \"false\" stays off", async () => {
    expect(await getPost("quoted-booleans")).toMatchObject({ math: false, gfm: false, cc_licensed: false });
  });

  it("defaults a missing snippet to an empty string and missing flags to false", async () => {
    expect(await getPost("no-snippet")).toMatchObject({
      title: "No Snippet",
      snippet: "",
      math: false,
      gfm: false,
      cc_licensed: false,
    });
  });
});

describe("getPosts", () => {
  it("returns valid .md posts, newest first, leaving out posts without a title or date", async () => {
    const posts = await getPosts();
    expect(posts.map((p) => p.slug)).toEqual(["newer-post", "quoted-booleans", "older-post", "no-snippet"]);
  });
});
