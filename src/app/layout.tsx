import type { Metadata } from "next";
import "@/global.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Fira_Sans } from "next/font/google";
import { getData } from "@/utils/career-data";

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "600"]
})

const data = getData().then(data => {
  let name;
  let target_position;

  if (!data || !data.name) {
    name = "USER NAME";
  } else {
    name = data.name;
  }

  if (!data || !data.target_position) {
    target_position = "TARGET POSITION";
  } else {
    target_position = data.target_position;
  }

  return {name, target_position};
});

export async function generateMetadata(): Promise<Metadata> {
  const {name: name, target_position: target_position} = await data;
  return {
    title: {
      template: `%s | ${name}`,
      default: `${name} - ${target_position}`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {name: name, target_position: target_position} = await data;

  return (
    <html lang="en">
      <body className={fira.className}>
        <Header name={name} target_position={target_position} />
        <div className="container content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
