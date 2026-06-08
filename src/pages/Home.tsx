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
import { ScrollProgress } from "@/components/ScrollProgress";
import { MarqueeBand } from "@/components/MarqueeBand";
import { useLenis } from "@/hooks/useLenis";

export default function Home() {
  useLenis();
  return (
    <main id="top" className="relative bg-background text-foreground">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <BigThings />
      <MarqueeBand />
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
