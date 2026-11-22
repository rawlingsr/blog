import { monthYear } from "../format";
import type { Company, DatesWorked, Position } from "../types";

export function Experience({ companies }: { companies: Company[] }) {
  return (
    <article className="resume-experience">
      <div className="resume-experience-header">
        <h2>Experience</h2>
      </div>
      {companies.map((company, index) => <CompanyExperience company={company} key={index} />)}
    </article>
  );
}

function CompanyExperience({ company }: { company: Company }) {
  return (
    <section className="resume-company">
      <div className="resume-company-summary">
        <h3 className="resume-company-header">
          <CompanyName company={company} />
          <TimeSpan dates_worked={company.dates_worked} />
        </h3>
        <p className="resume-description">{company.description}</p>
      </div>
      {company.positions?.map((position, index) => (
        <PositionExperience position={position} key={index} />
      ))}
    </section>
  );
}

function CompanyName({ company }: { company: Company }) {
  const name = (
    <>
      <span className="resume-company-name">{company.name}</span>
      {company.location
        ? (
          <>
            {" | "}
            <span className="resume-company-location">{company.location}</span>
          </>
        )
        : null}
    </>
  );
  return company.website ? <a href={company.website}>{name}</a> : name;
}

function PositionExperience({ position }: { position: Position }) {
  return (
    <div className="resume-position">
      <h4 className="resume-position-header">
        <span>{position.title}</span>
        <TimeSpan dates_worked={position.dates_worked} />
      </h4>
      <p className="resume-description">{position.description}</p>
      <ul>
        {position.achievements?.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
}

function TimeSpan({ dates_worked }: { dates_worked?: DatesWorked }) {
  if (!dates_worked) {
    return null;
  }
  const [from, to] = dates_worked;
  return (
    <span>
      <time dateTime={from.toISOString()}>{monthYear(from)}</time>
      {to
        ? (
          <>
            {" - "}
            <time dateTime={to.toISOString()}>{monthYear(to)}</time>
          </>
        )
        : " - Present"}
    </span>
  );
}
