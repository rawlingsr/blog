import { parse } from "yaml";
import { readFile } from "node:fs/promises";
import { join } from "path";

export interface Company {
  name: string;
  dates_worked: [string, string];
  description: string;
  location: string;
  website: URL;
  positions: Position[];

}

export interface Position {
  title: string;
  dates_worked: [string, string] | null;
  description: string;
  achievements: string[];
}



export async function getCareerData(): Promise<Company[]> {
  const fileName = join(process.cwd(), "/src/career-data.yaml");
  const data = await readFile(fileName, { encoding: "utf8" });
  const parsedData = parse(data);

  return parsedData["companies"];
}



// export async function getPost(slug: string): Promise<Post | null> {
//   const fileName = join(process.cwd(), "/src/posts/", `${slug}.md`);

//   try {
//     await fs.access(fileName);
//   } catch {
//     return null;
//   }

//   const text = await fs.readFile(fileName, { encoding: "utf8" });
//   const { attributes, body } = fm<Post>(text);

//   return {
//     slug,
//     title: attributes.title,
//     published_at: new Date(attributes.published_at),
//     content: body,
//     snippet: attributes.snippet,
//     math: attributes.math,
//     gfm: attributes.gfm,
//     cc_licensed: attributes.cc_licensed,
//   };
// }
