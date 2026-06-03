import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroGrid, HeroBoxProvider } from "./HeroGrid";
import { AnimatedMenu } from "./AnimatedMenu";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-grid", {
        scale: 0.85,
        borderRadius: "60px",
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-word-left", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-word-right", {
        xPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-accent-red">
      <HeroBoxProvider sectionRef={sectionRef}>
        <HeroGrid />
      </HeroBoxProvider>

      <div className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-between p-6 md:p-10">
        <div className="flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pointer-events-auto flex items-center gap-2 text-background"
          >
            <div className="h-3 w-3 rounded-full bg-background" />
            <span className="text-lg font-black tracking-tighter md:text-xl">VOLT/AGENCY</span>
          </motion.div>

          <div className="pointer-events-auto">
            <AnimatedMenu />
          </div>
        </div>

        <div className="flex items-end justify-between gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="hero-word-left text-[18vw] font-black leading-[0.8] tracking-[-0.05em] text-background md:text-[14vw]"
          >
            DO
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: [0.76, 0, 0.24, 1] }}
            className="hero-word-right text-right text-[18vw] font-black italic leading-[0.8] tracking-[-0.05em] text-background md:text-[14vw]"
          >
            THINGS
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
