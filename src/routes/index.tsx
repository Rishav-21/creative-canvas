import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BigThings } from "@/components/BigThings";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Showcase } from "@/components/Showcase";
import { Services } from "@/components/Services";
import { Clients } from "@/components/Clients";
import { Stats } from "@/components/Stats";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { Careers } from "@/components/Careers";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { useLenis } from "@/hooks/useLenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VOLT/AGENCY — A Creative Agency Doing Big Things" },
      { name: "description", content: "Independent creative agency delivering strategy, design and integrated campaigns for the world's most ambitious brands." },
      { property: "og:title", content: "VOLT/AGENCY — Do Big Things" },
      { property: "og:description", content: "Strategy, creative, design, advertising and production for ambitious brands." },
    ],
  }),
  component: Home,
});

function Home() {
  useLenis();
  return (
    <main id="top" className="relative bg-background text-foreground">
      <Cursor />
      <Navbar />
      <Hero />
      <BigThings />
      <FeaturedWork />
      <Showcase />
      <Services />
      <Clients />
      <Stats />
      <Team />
      <Testimonials />
      <Careers />
      <ContactCTA />
      <Footer />
    </main>
  );
}
