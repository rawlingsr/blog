interface Intro {
  objective?: string;
  summary?: string;
}

export function Introduction({
  data,
  is_resume = false,
}: {
  data: Intro;
  is_resume?: boolean;
}) {
  const class_name = is_resume ? "intro-heading" : "";
  if (data.summary) {
    return (
      <article>
        <h2 className={class_name}>Summary</h2>
        {data.summary}
      </article>
    );
  }

  if (data.objective) {
    return (
      <article>
        <h2 className={class_name}>Objective</h2>
        {data.objective}
      </article>
    );
  }

  return null;
}
