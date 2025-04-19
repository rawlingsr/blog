export default async function Skills({ skills }: { skills: string[] }) {
  return (
    <article>
      <h2>Skills</h2>
      <ul className="skills">
        {skills.map((skill) => <li>{skill}</li>)}
      </ul>
    </article>
  );
}
