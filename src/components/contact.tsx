import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faMapLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { contactLinks, type ContactType } from "resume-from-yaml";

const icons: Record<ContactType, IconDefinition> = {
  linkedin: faLinkedin,
  github: faGithub,
  email: faEnvelope,
  location: faMapLocation,
  website: faGlobe,
  phone: faPhone,
};

// URLs and labels come from resume-from-yaml; this file only adds the site's FontAwesome look.
function ContactButton({ type, value, size }: {
  type: ContactType;
  value?: string;
  size: number;
}) {
  const [link] = contactLinks({ [type]: value });
  if (!link) {
    return null;
  }
  return (
    <Link href={link.href} className="contact">
      <div className="contact-btn">
        <FontAwesomeIcon
          icon={icons[type]}
          className={`fa-${size}x fa-fw`}
        />
        <span className="contact-text">
          {`${link.label}: ${link.value}`}
        </span>
      </div>
    </Link>
  );
}

export function Linkedin({ linkedin, size }: { linkedin?: string; size: number }) {
  return <ContactButton type="linkedin" value={linkedin} size={size} />;
}

export function GitHub({ github, size }: { github?: string; size: number }) {
  return <ContactButton type="github" value={github} size={size} />;
}

export function Email({ email, size }: { email?: string; size: number }) {
  return <ContactButton type="email" value={email} size={size} />;
}

export function Location({ location, size }: { location?: string; size: number }) {
  return <ContactButton type="location" value={location} size={size} />;
}

export function Website({ website, size }: { website?: string; size: number }) {
  return <ContactButton type="website" value={website} size={size} />;
}

export function Phone({ phone, size }: { phone?: string; size: number }) {
  return <ContactButton type="phone" value={phone} size={size} />;
}
