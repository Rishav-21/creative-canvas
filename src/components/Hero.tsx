import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroGrid, HeroBoxProvider } from "./HeroGrid";
import { AnimatedMenu } from "./AnimatedMenu";

gsap.registerPlugin(ScrollTrigger);

const splitChars = (word: string) =>
  word.split("").map((c, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom">
      <span className="hero-char inline-block will-change-transform">{c}</span>
    </span>
  ));

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance reveal — characters rise from below their mask
      gsap.set(".hero-char", { yPercent: 110, rotate: 8 });
      gsap.to(".hero-char", {
        yPercent: 0,
        rotate: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: { each: 0.04, from: "start" },
        delay: 0.7,
      });

      // Scroll-driven parallax split + scale
      gsap.to(".hero-grid", {
        scale: 0.88,
        borderRadius: "60px",
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-word-left", {
        xPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-word-right", {
        xPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      // Scroll-driven char fade as hero leaves
      gsap.to(".hero-char", {
        yPercent: -60,
        opacity: 0.2,
        ease: "none",
        stagger: 0.01,
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

        <div className="flex w-full items-end justify-between gap-[2vw] leading-none">
          <h1
            aria-label="DO"
            className="hero-word-left flex-1 text-left text-[clamp(5rem,15vw,16rem)] font-black leading-[0.85] tracking-[-0.05em] text-background"
          >
            {splitChars("DO")}
          </h1>
          <h1
            aria-label="THINGS"
            className="hero-word-right flex-1 text-right text-[clamp(5rem,15vw,16rem)] font-black italic leading-[0.85] tracking-[-0.05em] text-background"
          >
            {splitChars("THINGS")}
          </h1>
        </div>
      </div>
    </section>
  );
}
