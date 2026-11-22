import { readFile } from "node:fs/promises";
import { normalizeResume } from "./normalize";
import { parseResumeYaml } from "./parse";
import type { RawResume, Resume } from "./types";

export interface ResumeFiles {
  /** Path to the resume YAML. Must exist. */
  file: string;
  /** Optional path to an override YAML merged on top. It's fine if this file doesn't exist. */
  overrideFile?: string;
}

async function readOptional(path: string): Promise<string | undefined> {
  try {
    return await readFile(path, { encoding: "utf8" });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return undefined;
    }
    throw err;
  }
}

/** Reads and merges the resume files, without validating them. */
export async function readResumeYaml({ file, overrideFile }: ResumeFiles): Promise<RawResume> {
  const text = await readFile(file, { encoding: "utf8" });
  const overrideText = overrideFile ? await readOptional(overrideFile) : undefined;
  try {
    return parseResumeYaml(text, overrideText);
  } catch (err) {
    const files = overrideText === undefined ? file : `${file} or ${overrideFile}`;
    throw new Error(`Could not parse ${files}: ${(err as Error).message}`, { cause: err });
  }
}

/** Reads, merges, and validates the resume files. */
export async function loadResume(files: ResumeFiles): Promise<Resume> {
  return normalizeResume(await readResumeYaml(files));
}
