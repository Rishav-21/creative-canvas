import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Stagger-reveal children of a container on scroll-in (upward motion). */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  selector = "[data-reveal]",
  opts: { y?: number; stagger?: number; duration?: number; start?: string } = {}
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    const { y = 80, stagger = 0.08, duration = 1, start = "top 85%" } = opts;
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);
      if (!targets.length) return;
      gsap.from(targets, {
        y, opacity: 0, duration, stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current!, start },
      });
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

/** Parallax translate-Y for a single element while it is in view. */
export function useParallax<T extends HTMLElement = HTMLElement>(amount = 80) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current!, {
        yPercent: -amount / 4,
        ease: "none",
        scrollTrigger: { trigger: ref.current!, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, [amount]);
  return ref;
}
