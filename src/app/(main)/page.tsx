import { Resume } from "yaml-to-resume/react";
import { getResume } from "@/utils/career-data";

export default async function Home() {
  return (
    <main>
      <Resume resume={await getResume()} />
    </main>
  );
}
