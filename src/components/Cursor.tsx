import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [hovering, setHovering] = useState<"none" | "link" | "view">("none");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("cursor-none-all");

    const xDot = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power3.out" });
    const yDot = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power3.out" });
    const xRing = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3.out" });
    const yRing = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const view = t.closest("[data-cursor='view'], video");
      const link = t.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]");
      if (view) {
        setHovering("view");
        setLabel((view as HTMLElement).dataset.cursorLabel ?? "View");
      } else if (link) {
        setHovering("link");
        setLabel("");
      } else {
        setHovering("none");
        setLabel("");
      }
    };

    const onDown = () => gsap.to(ringRef.current, { scale: 0.75, duration: 0.18 });
    const onUp = () => gsap.to(ringRef.current, { scale: 1, duration: 0.25 });
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

  const ringClass =
    hovering === "view"
      ? "h-24 w-24 bg-accent-red border-accent-red"
      : hovering === "link"
      ? "h-14 w-14 border-foreground bg-foreground/10"
      : "h-9 w-9 border-foreground/70";

  return (
    <>
      <div
        ref={ringRef}
        style={{ opacity: visible ? 1 : 0 }}
        className={`pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border mix-blend-difference transition-[width,height,background-color,border-color] duration-300 ease-out md:flex ${ringClass}`}
      >
        <span
          ref={labelRef}
          style={{ opacity: label ? 1 : 0 }}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-background transition-opacity duration-200"
        >
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        style={{ opacity: visible && hovering !== "view" ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-red md:block"
      />
    </>
  );
}
