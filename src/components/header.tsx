import Link from "next/link";
import Image from "next/image";

export function Header() {
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
            <h1>Ryan Rawlings</h1>
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
