import Link from "next/link";
import Image from "next/image";

export function Header({ name, target_position }: {
  name: string;
  target_position?: string;
}) {
  return (
    <header className="page-header">
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
              <h1>{name}</h1>
              {target_position ? <h2>{target_position}</h2> : null}
            </div>
          </Link>
          <ul>
            <li>
              <Link href="/blog/">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact/">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
