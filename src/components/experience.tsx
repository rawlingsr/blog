import { Company, Position } from "@/utils/career-data";
import { monthYear } from "@/utils/helpers";
import Link from "next/link";

export default function Experience({ companies }: { companies: Company[] }) {
  return (
    <article>
      <div className="experience-header">
        <h2>Experience</h2>
      </div>
      {companies.map((company, index) => {
        return <CompanyExperience company={company} key={index} />;
      })}
    </article>
  );
}

function CompanyExperience({ company }: { company: Company }) {
  return (
    <section>
        <h3 className="company-header">
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
        <p className="description">{company.description}</p>
      {company.positions?.map((position, index) => (
        <PositionExperience position={position} key={index} />
      ))}
    </section>
  );
}

function PositionExperience({ position }: { position: Position }) {
  return (
    <div className="position">
      <h4 className="position-header">
        <span>{position.title}</span>
        <TimeSpan dates_worked={position.dates_worked} />
      </h4>
      <p className="description">{position.description}</p>
      <ul>
        {position.achievements?.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
}

function TimeSpan({ dates_worked }: { dates_worked: [Date, Date] | null }) {
  if (!dates_worked) {
    return null;
  }

  const [from, to] = dates_worked;

  if (!from) {
    return null;
  }

  if (!to) {
    return (
      <span>
        <time dateTime={from.toISOString()}>{monthYear(from)}</time>
        {" - Present"}
      </span>
    );
  }

  return (
    <span>
      <time dateTime={from.toISOString()}>{monthYear(from)}</time>
      {" - "}
      <time dateTime={to.toISOString()}>{monthYear(to)}</time>
    </span>
  );
}
