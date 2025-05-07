import {
  Email,
  GitHub,
  Linkedin,
  Location,
  Phone,
  Website,
} from "@/components/contact";
import { ContactInfo } from "@/utils/career-data";
import Link from "next/link";
import Image from "next/image";

interface Data {
  name: string,
  target_position: string,
  contact_info: ContactInfo
}

export async function Header({ data }: {
  data: Data
}) {
  const links = data.contact_info;
  const size = 1;

  return (
    <header className="resume-header">
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            <Image
              src="/icon.png"
              alt="RR Icon"
              width="64"
              height="64"
              className="icon"
            />
            <div>
              <h1>{data.name}</h1>
              {data.target_position ? <h2>{data.target_position}</h2> : null}
            </div>
          </Link>
          <div className="resume-header-links">
            <Linkedin linkedin={links.linkedin} size={size} />
            <GitHub github={links.github} size={size} />
            <Email email={links.email} size={size} />
            <Location location={links.location} size={size} />
            <Website website={links.website} size={size} />
            <Phone phone={links.phone} size={size} />
          </div>
        </nav>
      </div>
    </header>
  );
}
