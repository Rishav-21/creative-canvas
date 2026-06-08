import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "link" | "view" | "drag">("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("cursor-none-all");
    const xTo = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power3.out" });
    const rxTo = gsap.quickTo(ringRef.current, "x", { duration: 0.55, ease: "power3.out" });
    const ryTo = gsap.quickTo(ringRef.current, "y", { duration: 0.55, ease: "power3.out" });
    const lxTo = gsap.quickTo(labelRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const lyTo = gsap.quickTo(labelRef.current, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      xTo(e.clientX); yTo(e.clientY);
      rxTo(e.clientX); ryTo(e.clientY);
      lxTo(e.clientX); lyTo(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const view = t.closest("[data-cursor='view'], video, img");
      const drag = t.closest("[data-cursor='drag']");
      const link = t.closest("a, button, [data-cursor-hover], input, textarea, select");
      if (view) { setVariant("view"); setLabel((view as HTMLElement).dataset.cursorLabel ?? "View"); }
      else if (drag) { setVariant("drag"); setLabel("Drag"); }
      else if (link) { setVariant("link"); setLabel(""); }
      else { setVariant("default"); setLabel(""); }
    };
    const onDown = () => gsap.to(ringRef.current, { scale: 0.7, duration: 0.2 });
    const onUp = () => gsap.to(ringRef.current, { scale: 1, duration: 0.3 });
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.documentElement.classList.remove("cursor-none-all");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const ringSize =
    variant === "view" ? "h-24 w-24 bg-accent-red border-accent-red" :
    variant === "drag" ? "h-20 w-20 bg-foreground/10 border-foreground" :
    variant === "link" ? "h-16 w-16 border-accent-red bg-accent-red/10" :
    "h-10 w-10";

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
        className={`pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/70 mix-blend-difference transition-[width,height,background-color,border-color] duration-300 ease-out md:block ${ringSize}`}
      />
      <div
        ref={labelRef}
        style={{ opacity: visible && label ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-opacity duration-200 md:block"
      >
        {label}
      </div>
    </>
  );
}
