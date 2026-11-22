import { ContactLinks } from "resume-from-yaml/react";
import { fontAwesomeContactIcon } from "@/components/contact";
import { getResume } from "@/utils/career-data";

export default async function ContactPage() {
  const { contact_info } = await getResume();
  return (
    <main>
      <h2>Links</h2>
      <ContactLinks info={contact_info} renderIcon={fontAwesomeContactIcon(3)} />
    </main>
  );
}
