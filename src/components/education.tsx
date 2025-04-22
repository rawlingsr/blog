import { School } from "@/utils/career-data";
import { monthYear } from "@/utils/helpers"
import Link from "next/link";

export default function Education({ schools }: { schools: School[] }) {
  return (
    <article>
      <h2>Education</h2>
      {schools.map((school) => <Institution key={school.degree} school={school} />)}
    </article>
  );
}

function Institution({ school }: { school: School }) {
  return (
    <section>
      <h3 className="school-header">
        <Link href={school.website}>{school.name}</Link>
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
