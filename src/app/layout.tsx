// Package styles first, so the site's global.css can override them.
import "yaml-to-resume/styles.css";
import "@/global.css";
import { Fira_Sans } from "next/font/google";
import { ThemeScript } from "@/components/theme-toggle";
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
    // ThemeScript sets data-theme on <html> before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={fira.className}>
        {children}
      </body>
    </html>
  );
}
