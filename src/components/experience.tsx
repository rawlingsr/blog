import { Company, getCareerData, Position } from "@/utils/experience";
import Link from "next/link";

export async function Experience() {
  const companies = await getCareerData();
  console.log(companies);
  return (
    <article>
      <h2>Experience</h2>

      {companies.map((company, index) => {
        return <CompanyExperience company={company} key={index} />;
      })}
    </article>
  );
}

export function CompanyExperience({ company }: { company: Company }) {
  const [from, to] = company.dates_worked;
  console.log(from);
  return (
    <section>
      <h3 className="experience-header">
        <Link href={company.website}>
          {company.name}
        </Link>
        <TimeSpan dates_worked={company.dates_worked} />
      </h3>
      <p>{ company.description }</p>
      {company.positions?.map((position, index) => (
        <PositionExperience position={position} key={index} />
      ))}
    </section>
  );
}
function PositionExperience({ position }: { position: Position }) {
  const [from, to] = position.dates_worked ?? ["", ""];

  return (
    <div>
      <h4 className="experience-header">
        <span>{position.title}</span>
        <TimeSpan dates_worked={position.dates_worked} />
      </h4>
      <p>{position.description}</p>
      <ul>
        {position.achievements?.map(x => <li key={x}>{x}</li>)}
      </ul>
    </div>
  );
}

function TimeSpan({ dates_worked }: { dates_worked: [string, string] | null }) {
  if (!dates_worked) {
    return null;
  }
  const [from, to] = dates_worked;

  return (
    <span>
      <time dateTime={from}>{from}</time>
      {" - "}
      <time dateTime={to}>{to}</time>
    </span>
  );
}
