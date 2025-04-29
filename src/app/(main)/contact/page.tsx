import { getData, getContactInfo } from "@/utils/career-data";

import {
  Email,
  GitHub,
  Linkedin,
  Location,
  Phone,
  Website,
} from "@/components/contact";

export default async function ContactPage() {
  const data = await getData();
  const links = getContactInfo(data);
  if (!links) {
    return null;
  }
  const size = 3;
  return (
    <main>
      <h2>Links</h2>
      <Linkedin linkedin={links.linkedin} size={size} />
      <GitHub github={links.github} size={size} />
      <Email email={links.email} size={size} />
      <Location location={links.location} size={size} />
      <Website website={links.website} size={size} />
      <Phone phone={links.phone} size={size} />
    </main>
  );
}
