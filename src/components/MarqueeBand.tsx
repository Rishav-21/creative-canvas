import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["CREATE", "DISRUPT", "PROVOKE", "AMPLIFY", "INSPIRE", "DEFINE"];

export function MarqueeBand() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const row = [...WORDS, ...WORDS, ...WORDS];

  return (
    <section ref={ref} className="relative overflow-hidden bg-accent-red py-10">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {row.map((w, i) => (
          <span
            key={i}
            className={`mx-8 text-[10vw] font-black uppercase leading-none tracking-tighter md:text-[7vw] ${
              i % 2 === 0 ? "text-background" : "text-background/30 italic"
            }`}
          >
            {w} <span className="text-background/60">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}
