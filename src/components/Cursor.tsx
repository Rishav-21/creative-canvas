import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Enhanced custom cursor:
 *  - speed-stretched halo with rotation
 *  - crisp dot
 *  - trailing particle stream
 *  - click ripple burst
 *  - crosshair guide-lines on hover targets
 *  - hover label for [data-cursor='view']
 *  - magnetic pull on [data-magnetic] elements
 */
export function Cursor() {
  const haloRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const guideXRef = useRef<HTMLDivElement>(null);
  const guideYRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const rippleLayerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"idle" | "link" | "view" | "text">("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("cursor-none-all");

    const xDot = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const yDot = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3.out" });
    const xHalo = gsap.quickTo(haloRef.current, "x", { duration: 0.55, ease: "expo.out" });
    const yHalo = gsap.quickTo(haloRef.current, "y", { duration: 0.55, ease: "expo.out" });
    const xLabel = gsap.quickTo(labelRef.current, "x", { duration: 0.3, ease: "power3.out" });
    const yLabel = gsap.quickTo(labelRef.current, "y", { duration: 0.3, ease: "power3.out" });
    const xGuideY = gsap.quickTo(guideYRef.current, "x", { duration: 0.25, ease: "power3.out" });
    const yGuideX = gsap.quickTo(guideXRef.current, "y", { duration: 0.25, ease: "power3.out" });

    let lastX = 0, lastY = 0;
    let magnetTarget: HTMLElement | null = null;

    // Idle breathing pulse on halo
    const breathe = gsap.to(haloRef.current, {
      scale: 1.06,
      duration: 1.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // ---------- trail particles ----------
    let trailTimer = 0;
    const spawnTrail = (x: number, y: number) => {
      if (!trailRef.current) return;
      const now = performance.now();
      if (now - trailTimer < 28) return;
      trailTimer = now;
      const p = document.createElement("span");
      p.className =
        "pointer-events-none absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-red";
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      trailRef.current.appendChild(p);
      gsap.to(p, {
        opacity: 0,
        scale: 0,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => p.remove(),
      });
    };

    // ---------- click ripple ----------
    const spawnRipple = (x: number, y: number) => {
      if (!rippleLayerRef.current) return;
      const r = document.createElement("span");
      r.className =
        "pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-red";
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      rippleLayerRef.current.appendChild(r);
      gsap.fromTo(
        r,
        { scale: 0.2, opacity: 0.9 },
        { scale: 4, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => r.remove() }
      );
    };

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      let tx = e.clientX;
      let ty = e.clientY;

      // magnetic pull
      if (magnetTarget) {
        const r = magnetTarget.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        tx = cx + (e.clientX - cx) * 0.35;
        ty = cy + (e.clientY - cy) * 0.35;
        gsap.to(magnetTarget, {
          x: (e.clientX - cx) * 0.25,
          y: (e.clientY - cy) * 0.25,
          duration: 0.4,
          ease: "power3.out",
        });
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      const speed = Math.min(Math.hypot(dx, dy) * 2, 60);
      const rot = Math.atan2(dy, dx) * (180 / Math.PI);

      gsap.to(haloRef.current, {
        rotate: rot,
        scaleX: 1 + speed / 200,
        scaleY: 1 - speed / 600,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });

      xDot(tx); yDot(ty);
      xHalo(tx); yHalo(ty);
      xLabel(tx); yLabel(ty);
      xGuideY(tx); yGuideX(ty);
      spawnTrail(e.clientX, e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const view = t.closest("[data-cursor='view'], video") as HTMLElement | null;
      const text = t.closest("input, textarea, [contenteditable='true']");
      const magnet = t.closest("[data-magnetic]") as HTMLElement | null;
      const link = t.closest("a, button, [role='button'], [data-cursor-hover]");

      // release previous magnet
      if (magnetTarget && magnetTarget !== magnet) {
        gsap.to(magnetTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
        magnetTarget = null;
      }
      if (magnet) magnetTarget = magnet;

      if (view) {
        setMode("view");
        setLabel(view.dataset.cursorLabel ?? "View");
      } else if (text) {
        setMode("text"); setLabel("");
      } else if (link) {
        setMode("link"); setLabel("");
      } else {
        setMode("idle"); setLabel("");
      }
    };

    const onDown = (e: MouseEvent) => {
      gsap.to([haloRef.current, dotRef.current], { scale: 0.7, duration: 0.18 });
      spawnRipple(e.clientX, e.clientY);
    };
    const onUp = () =>
      gsap.to([haloRef.current, dotRef.current], { scale: 1, duration: 0.35, ease: "back.out(2)" });

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      breathe.kill();
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
      ? "h-28 w-28 bg-accent-red/90 border-transparent"
      : mode === "link"
      ? "h-16 w-16 border-foreground/80 bg-foreground/5 backdrop-blur-sm"
      : mode === "text"
      ? "h-10 w-[2px] border-accent-red bg-accent-red rounded-sm"
      : "h-10 w-10 border-foreground/60 bg-foreground/[0.03] backdrop-blur-[2px]";

  const dotClass =
    mode === "view" || mode === "text"
      ? "opacity-0 scale-0"
      : mode === "link"
      ? "h-1 w-1 bg-accent-red"
      : "h-1.5 w-1.5 bg-accent-red";

  const showGuides = mode === "link" || mode === "view";

  return (
    <>
      {/* Trail layer */}
      <div ref={trailRef} className="pointer-events-none fixed inset-0 z-[99] hidden md:block" />
      {/* Ripple layer */}
      <div ref={rippleLayerRef} className="pointer-events-none fixed inset-0 z-[99] hidden mix-blend-difference md:block" />

      {/* Crosshair guides */}
      <div
        ref={guideXRef}
        style={{ opacity: visible && showGuides ? 0.35 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[98] hidden h-px w-screen -translate-y-1/2 bg-gradient-to-r from-transparent via-accent-red to-transparent transition-opacity duration-300 md:block"
      />
      <div
        ref={guideYRef}
        style={{ opacity: visible && showGuides ? 0.35 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[98] hidden h-screen w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent-red to-transparent transition-opacity duration-300 md:block"
      />

      {/* Halo */}
      <div
        ref={haloRef}
        style={{ opacity: visible ? 1 : 0 }}
        className={`pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border mix-blend-difference transition-[width,height,background-color,border-color,border-radius] duration-300 ease-out md:flex ${haloClass}`}
      />
      {/* Label */}
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
