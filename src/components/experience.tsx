import { Company, getCareerData, Position } from "@/utils/experience";
import Link from "next/link";

export async function Experience() {
  const companies = await getCareerData();
  return (
    <article>
      <h2>Experience</h2>

      {companies.map((company, index) => {
        return <CompanyExperience company={company} key={index} />;
      })}
    </article>
  );
}

function CompanyExperience({ company }: { company: Company }) {
  return (
    <section>
      <h3 className="experience-header">
        <Link href={company.website}>
          <span className="company-name">{company.name}</span>
          {company.location
            ? (
              <>
                {" | "}
                <span className="company-location">
                  {company.location}
                </span>
              </>
            )
            : null}
        </Link>
        <TimeSpan dates_worked={company.dates_worked} />
      </h3>
      <p>{company.description}</p>
      {company.positions?.map((position, index) => (
        <PositionExperience position={position} key={index} />
      ))}
    </section>
  );
}

function PositionExperience({ position }: { position: Position }) {
  return (
    <section className="position">
      <h4 className="position-header">
        <span>{position.title}</span>
        <TimeSpan dates_worked={position.dates_worked} />
      </h4>
      <p>{position.description}</p>
      <ul>
        {position.achievements?.map((x) => <li key={x}>{x}</li>)}
      </ul>
    </section>
  );
}

function TimeSpan({ dates_worked }: { dates_worked: [string, string] | null }) {
  if (!dates_worked) {
    return null;
  }

  const [from, to] = dates_worked;

  if (!from || from == "") {
    return null;
  }

  if (!to) {
    return (
      <span>
        <time dateTime={from}>{from}</time>
        {" - Present"}
      </span>
    );
  }

  return (
    <span>
      <time dateTime={from}>{from}</time>
      {" - "}
      <time dateTime={to}>{to}</time>
    </span>
  );
}
