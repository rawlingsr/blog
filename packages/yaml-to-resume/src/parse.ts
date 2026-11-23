import { parse } from "yaml";
import { deepMerge, isPlainObject } from "./normalize";
import type { RawResume } from "./types";

function parseMapping(text: string, label: string): RawResume {
  const value: unknown = parse(text);
  if (value == null) {
    return {};
  }
  if (!isPlainObject(value)) {
    throw new Error(`${label} must be a YAML mapping (key: value pairs) at the top level.`);
  }
  return value;
}

/**
 * Parses resume YAML and deep-merges an optional override on top.
 * Objects merge key by key; scalars, arrays, and null in the override replace the base value.
 * Returns the merged data unvalidated; pass it to `normalizeResume` to validate it.
 */
export function parseResumeYaml(text: string, overrideText?: string): RawResume {
  const base = parseMapping(text, "Resume YAML");
  if (overrideText === undefined) {
    return base;
  }
  return deepMerge(base, parseMapping(overrideText, "Resume override YAML")) as RawResume;
}
