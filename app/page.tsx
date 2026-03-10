import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Cases from "@/components/Cases";
import Footer from "@/components/Footer";

export default function Home() {
  return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <Hero />
        <Cases />
        <Footer />
      </main>
  );
}