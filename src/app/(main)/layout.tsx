import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: "%s | Ryan Rawlings",
      default: `Ryan Rawlings`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header name={"Ryan Rawlings"}/>
        <div className="container content">
          {children}
        </div>
      <Footer />
    </>
  );
}
