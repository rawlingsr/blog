import { monthYear } from "../format";
import type { School } from "../types";

export function Education({ schools }: { schools: School[] }) {
  return (
    <article className="education-section">
      <h2>Education</h2>
      {schools.map((school) => <Institution key={school.degree} school={school} />)}
    </article>
  );
}

function Institution({ school }: { school: School }) {
  return (
    <section>
      <h3 className="school-header">
        <a href={school.website}>{school.name}</a>
        <span>
          {school.still_attending ? "(Expected) " : null}
          <time dateTime={school.graduation_date.toISOString()}>
            {monthYear(school.graduation_date)}
          </time>
        </span>
      </h3>
      <h4>{school.degree}</h4>
      <p className="description">{school.description}</p>
    </section>
  );
}
