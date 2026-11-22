import type { ReactNode } from "react";
import type { ContactInfo } from "../types";
import { ContactLinks, type RenderContactIcon } from "./contact-links";

export function ResumeHeader({
  name,
  target_position,
  contact_info,
  logo,
  homeHref = "/",
  renderIcon,
}: {
  name: string;
  target_position?: string;
  contact_info?: ContactInfo | null;
  /** Shown before the name, e.g. an <img>. */
  logo?: ReactNode;
  homeHref?: string;
  renderIcon?: RenderContactIcon;
}) {
  return (
    <header className="resume-header">
      <nav>
        <a href={homeHref} className="logo">
          {logo}
          <div>
            <h1>{name}</h1>
            {target_position ? <h2>{target_position}</h2> : null}
          </div>
        </a>
        <div className="resume-header-links">
          <ContactLinks info={contact_info} renderIcon={renderIcon} />
        </div>
      </nav>
    </header>
  );
}
