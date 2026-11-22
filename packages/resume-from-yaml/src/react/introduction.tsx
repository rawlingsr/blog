import type { Intro } from "../types";

export function Introduction({ intro, headingClassName }: {
  intro: Intro | null;
  headingClassName?: string;
}) {
  if (!intro) {
    return null;
  }
  return (
    <article>
      <h2 className={headingClassName}>{intro.kind === "summary" ? "Summary" : "Objective"}</h2>
      {intro.text}
    </article>
  );
}
