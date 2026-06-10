import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Custom cursor: trailing outer halo + crisp center dot with an
 * angled "tick" indicator. Morphs on hover targets and click.
 */
export function Cursor() {
  const haloRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"idle" | "link" | "view" | "text">("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("cursor-none-all");

    const xDot = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3.out" });
    const xHalo = gsap.quickTo(haloRef.current, "x", { duration: 0.55, ease: "expo.out" });
    const yHalo = gsap.quickTo(haloRef.current, "y", { duration: 0.55, ease: "expo.out" });
    const xLabel = gsap.quickTo(labelRef.current, "x", { duration: 0.3, ease: "power3.out" });
    const yLabel = gsap.quickTo(labelRef.current, "y", { duration: 0.3, ease: "power3.out" });

    let rot = 0;
    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const speed = Math.min(Math.hypot(dx, dy) * 2, 60);
      rot = Math.atan2(dy, dx) * (180 / Math.PI);
      gsap.to(haloRef.current, { rotate: rot, duration: 0.4, ease: "power3.out" });
      gsap.to(haloRef.current, {
        scaleX: 1 + speed / 200,
        scaleY: 1 - speed / 600,
        duration: 0.3,
        ease: "power3.out",
      });
      xDot(e.clientX); yDot(e.clientY);
      xHalo(e.clientX); yHalo(e.clientY);
      xLabel(e.clientX); yLabel(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const view = t.closest("[data-cursor='view'], video");
      const text = t.closest("input, textarea, [contenteditable='true']");
      const link = t.closest("a, button, [role='button'], [data-cursor-hover]");
      if (view) {
        setMode("view");
        setLabel((view as HTMLElement).dataset.cursorLabel ?? "View");
      } else if (text) {
        setMode("text");
        setLabel("");
      } else if (link) {
        setMode("link");
        setLabel("");
      } else {
        setMode("idle");
        setLabel("");
      }
    };

    const onDown = () => gsap.to([haloRef.current, dotRef.current], { scale: 0.7, duration: 0.18 });
    const onUp = () => gsap.to([haloRef.current, dotRef.current], { scale: 1, duration: 0.3, ease: "back.out(2)" });
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

  const haloClass =
    mode === "view"
      ? "h-28 w-28 bg-accent-red/90 border-transparent backdrop-blur-0"
      : mode === "link"
      ? "h-16 w-16 border-foreground/80 bg-foreground/5 backdrop-blur-sm"
      : mode === "text"
      ? "h-10 w-1 border-accent-red bg-accent-red rounded-sm"
      : "h-10 w-10 border-foreground/60 bg-foreground/[0.03] backdrop-blur-[2px]";

  const dotClass =
    mode === "view" || mode === "text"
      ? "opacity-0 scale-0"
      : mode === "link"
      ? "h-1 w-1 bg-accent-red"
      : "h-1.5 w-1.5 bg-accent-red";

  return (
    <>
      {/* Halo */}
      <div
        ref={haloRef}
        style={{ opacity: visible ? 1 : 0 }}
        className={`pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border mix-blend-difference transition-[width,height,background-color,border-color,border-radius] duration-300 ease-out md:flex ${haloClass}`}
      />
      {/* Label (for "view" hovers) */}
      <div
        ref={labelRef}
        style={{ opacity: visible && label ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[102] hidden -translate-x-1/2 -translate-y-1/2 select-none text-[10px] font-bold uppercase tracking-[0.25em] text-background transition-opacity duration-200 md:block"
      >
        {label}
      </div>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{ opacity: visible ? 1 : 0 }}
        className={`pointer-events-none fixed left-0 top-0 z-[101] hidden -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out md:block ${dotClass}`}
      />
    </>
  );
}
