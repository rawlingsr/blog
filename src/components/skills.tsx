import { Skill } from "@/utils/career-data"

export default async function Skills({ skills }: { skills: Skill[] }) {
  return (
    <article>
      <h2>Skills</h2>
      <ul className="skills">
        {skills.map((skill) => <li key={skill.name}>{skill.name}</li>)}
      </ul>
    </article>
  );
}
