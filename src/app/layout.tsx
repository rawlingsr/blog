import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "@/global.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
      <body>
        <Header />
        <div className="container">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
