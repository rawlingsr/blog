import "@/global.css";
import { Fira_Sans } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "600"]
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={fira.className}>
        {children}
      </body>
    </html>
  );
}
