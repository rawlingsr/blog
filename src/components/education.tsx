import { School } from "@/utils/career-data";
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
      <h3>{school.degree}</h3>
      <h4 className="experience-header">
        <Link href={school.website}>{school.name}</Link>
        <span>
          {school.still_attending ? "(Expected) " : null}
          <time dateTime={school.graduation_date}>
            {school.graduation_date}
          </time>
        </span>
      </h4>
    </section>
  );
}
