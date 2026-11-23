import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faGlobe,
  faMapLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ContactType } from "yaml-to-resume";
import type { RenderContactIcon } from "yaml-to-resume/react";

const icons: Record<ContactType, IconDefinition> = {
  linkedin: faLinkedin,
  github: faGithub,
  email: faEnvelope,
  location: faMapLocation,
  website: faGlobe,
  phone: faPhone,
};

/**
 * The site's FontAwesome icons for yaml-to-resume's <ContactLinks> and <ResumeHeader>.
 * `size` is FontAwesome's multiplier (fa-1x, fa-3x, ...).
 */
export function fontAwesomeContactIcon(size: number): RenderContactIcon {
  return function ContactIcon(link) {
    return <FontAwesomeIcon icon={icons[link.type]} className={`fa-${size}x fa-fw`} />;
  };
}
