import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        <nav>
          <p>
            © 2025 Ryan Rawlings. All rights reserved unless otherwise specified.
          </p>
          <ul>
            <li>
              <Link href="https://github.com/rawlingsr">
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/rawlingsryan/">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
