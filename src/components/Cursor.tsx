import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("cursor-none-all");
    const onMove = (e: MouseEvent) => {
      setVisible(true);
      gsap.to(dotRef.current, { x: e.clientX, y: e.clientY, duration: 0.12, ease: "power3.out" });
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.55, ease: "power3.out" });
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor-hover], input, textarea, select"));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.documentElement.classList.remove("cursor-none-all");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{ opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-red transition-opacity duration-200 md:block"
      />
      <div
        ref={ringRef}
        style={{ opacity: visible ? 1 : 0 }}
        className={`pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/70 mix-blend-difference backdrop-blur-[1px] transition-[width,height,background-color,border-color] duration-300 ease-out md:block ${
          hover ? "h-16 w-16 border-accent-red bg-accent-red/10" : "h-10 w-10"
        }`}
      />
    </>
  );
}
