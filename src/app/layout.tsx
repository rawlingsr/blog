import type { Metadata } from "next";
import "@/global.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Fira_Sans } from "next/font/google";

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "600"]
})

export const metadata: Metadata = {
  title: {
    template: "%s | Ryan Rawlings - Developer in Test",
    default: "Ryan Rawlings - Developer in Test",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fira.className}>
        <Header />
        <div className="container content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
