import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Reads the optional cover letter from private/cover-letter.md (gitignored).
 * Returns null when the file doesn't exist, which is always the case on the deployed site.
 */
export async function getCoverLetter(): Promise<string | null> {
  try {
    return await readFile(join(process.cwd(), "private", "cover-letter.md"), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}
