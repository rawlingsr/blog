import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <>
      <Header name={"Ryan Rawlings"} />
      <div className="container content">
        <main>
          <h2>404 Not Found</h2>
          <p>The requested page could not be found</p>
        </main>
      </div>
      <Footer />
    </>
  );
}
