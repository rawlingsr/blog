import { Skill } from "@/utils/career-data";

export function Skills({ skills }: { skills: Skill[] }) {
  return (
    <article>
      <h2>Skills</h2>
      <ul className="skills">
        {skills.map((skill) => <li key={skill.name}>{skill.name}</li>)}
      </ul>
    </article>
  );
}

export function SkillsWithKeywords({ skills }: { skills: Skill[] }) {
  return (
    <article>
      <h2>Skills</h2>
      <ul className="skills-alt">
        {skills.map((skill) => (
          <li key={skill.name}>
            {skill.name}
            <Keywords keywords={skill.keywords} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function Keywords({ keywords }: { keywords: string[] }) {
  if (!keywords) {
    return null;
  }
  return (
    <ul className="skill-keywords">
      {keywords.map((keyword) => (
        <li key={keyword}>
          {keyword}
        </li>
      ))}
    </ul>
  );
}
