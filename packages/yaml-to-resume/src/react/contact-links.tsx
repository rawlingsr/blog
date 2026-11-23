import type { ReactNode } from "react";
import { contactLinks, type ContactLink } from "../format";
import type { ContactInfo } from "../types";

export type RenderContactIcon = (link: ContactLink) => ReactNode;

/** One link per filled-in contact field. Pass `renderIcon` to add your own icon set. */
export function ContactLinks({ info, renderIcon }: {
  info: ContactInfo | null | undefined;
  renderIcon?: RenderContactIcon;
}) {
  return (
    <>
      {contactLinks(info).map((link) => (
        <a key={link.type} href={link.href} className="resume-contact">
          <div className="resume-contact-btn">
            {renderIcon?.(link)}
            <span className="resume-contact-text">{`${link.label}: ${link.value}`}</span>
          </div>
        </a>
      ))}
    </>
  );
}
