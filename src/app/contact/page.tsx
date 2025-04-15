import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false;

export default async function Contact() {
  return (
    <main>
      <h2>Get in touch</h2>
      <ul className="contact-list">
        <li className="contact">
          <Link href="https://www.linkedin.com/in/rawlingsryan/">
            <div className="contact-btn">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="fa-3x fa-fw"
              />
              <span className="contact-text">
                https://www.linkedin.com/in/rawlingsryan
              </span>
            </div>
          </Link>
        </li>
        <li className="contact">
          <Link href="https://github.com/rawlingsr">
            <div className="contact-btn">
              <FontAwesomeIcon
                icon={faGithub}
                className="fa-3x fa-fw"
              />
              <span className="contact-text">
                https://github.com/rawlingsr
              </span>
            </div>
          </Link>
        </li>
        <li className="contact">
          <Link href="mailto:contact@ryan-rawlings.com">
            <div className="contact-btn">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="fa-3x fa-fw"
              />
              <span className="contact-text">
                contact@ryan-rawlings.com
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </main>
  );
}
