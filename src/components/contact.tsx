import { ContactInfo } from "@/utils/career-data";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faMapLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function Linkedin({ linkedin, size }: {
  linkedin: string | null;
  size: number;
}) {
  if (!linkedin) {
    return null;
  }
  return (
    <Link
      href={`https://www.linkedin.com/in/${linkedin}/`}
      className="contact"
    >
      <div className="contact-btn">
        <FontAwesomeIcon
          icon={faLinkedin}
          className={`fa-${size}x fa-fw`}
        />
        <span className="contact-text">
          LinkedIn Profile: {linkedin}
        </span>
      </div>
    </Link>
  );
}

export function GitHub({ github, size }: {
  github: string | null;
  size: number;
}) {
  if (!github) {
    return null;
  }
  return (
    <Link
      href={`https://github.com/${github}/`}
      className="contact"
    >
      <div className="contact-btn">
        <FontAwesomeIcon
          icon={faGithub}
          className={`fa-${size}x fa-fw`}
        />
        <span className="contact-text">
          GitHub Profile: {github}
        </span>
      </div>
    </Link>
  );
}

export function Email({ email, size }: {
  email: string | null;
  size: number;
}) {
  if (!email) {
    return null;
  }
  return (
    <Link
      href={`mailto:${email}`}
      className="contact"
    >
      <div className="contact-btn">
        <FontAwesomeIcon
          icon={faEnvelope}
          className={`fa-${size}x fa-fw`}
        />
        <span className="contact-text">
          Email Address: {email}
        </span>
      </div>
    </Link>
  );
}

export function Location({ location, size }: {
  location: string | null;
  size: number;
}) {
  if (!location) {
    return null;
  }
  return (
    <Link
      href={`https://www.google.com/maps/place/${location}/`}
      className="contact"
    >
      <div className="contact-btn">
        <FontAwesomeIcon
          icon={faMapLocation}
          className={`fa-${size}x fa-fw`}
        />
        <span className="contact-text">
          Location: {location}
        </span>
      </div>
    </Link>
  );
}


export function Website({ website, size }: {
  website: string | null;
  size: number;
}) {
  if (!website) {
    return null;
  }
  return (
    <Link
      href={`https://${website}/`}
      className="contact"
    >
      <div className="contact-btn">
        <FontAwesomeIcon
          icon={faGlobe}
          className={`fa-${size}x fa-fw`}
        />
        <span className="contact-text">
          Website: {website}
        </span>
      </div>
    </Link>
  );
}

export function Phone({ phone, size }: {
  phone: string | null;
  size: number;
}) {
  if (!phone) {
    return null;
  }
  return (
    <Link
      href={`tel:${phone}`}
      className="contact"
    >
      <div className="contact-btn">
        <FontAwesomeIcon
          icon={faPhone}
          className={`fa-${size}x fa-fw`}
        />
        <span className="contact-text">
          Phone Number: {phone}
        </span>
      </div>
    </Link>
  );
}
