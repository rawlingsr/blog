import { Resume } from "resume-from-yaml/react";
import { getResume } from "@/utils/career-data";

export default async function Home() {
  return (
    <main>
      <Resume resume={await getResume()} />
    </main>
  );
}
