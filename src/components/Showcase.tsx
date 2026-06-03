import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-video",
        { clipPath: "inset(15% 15% 15% 15% round 80px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "center center", scrub: 1 },
        }
      );
      gsap.to(".showcase-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[120vh] w-full overflow-hidden bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="showcase-video absolute inset-0 overflow-hidden">
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="showcase-bg h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-foreground">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] opacity-80">
            Case Study · Nike
          </p>
          <h2 className="text-[12vw] font-black leading-[0.85] tracking-[-0.05em] md:text-[8vw]">
            MOVE <span className="italic">DIFFERENTLY</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg opacity-90">
            A cinematic launch film celebrating the athletes who refuse to follow the line.
            12 markets. 9 languages. One unstoppable feeling.
          </p>
        </div>
      </div>
    </section>
  );
}
