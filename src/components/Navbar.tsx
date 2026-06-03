import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedMenu } from "./AnimatedMenu";

const LINKS = ["Work", "About", "Services", "Careers", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed inset-x-0 top-0 z-[55] transition-all duration-500 ${
        scrolled ? "bg-background/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-2 text-foreground">
          <div className="h-3 w-3 rounded-full bg-accent-red" />
          <span className="text-lg font-black tracking-tighter md:text-xl">VOLT/AGENCY</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="group relative text-sm font-medium tracking-wide text-foreground"
            >
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-red transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <AnimatedMenu />
        </div>
      </div>
    </motion.header>
  );
}
