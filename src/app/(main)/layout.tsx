import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getData } from "@/utils/career-data";

const data = getData().then(data => {

  if (!data || !data.name) {
    return "USER NAME";
  } else {
    return data.name;
  }
});

export async function generateMetadata(): Promise<Metadata> {
  const name = await data;
  return {
    title: {
      template: `%s | ${name}`,
      default: `${name}`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const name = await data;

  return (
    <>
      <Header name={name}/>
        <div className="container content">
          {children}
        </div>
      <Footer />
    </>
  );
}
