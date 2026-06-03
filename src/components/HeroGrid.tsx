import { createContext, useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface HeroBox {
  ref: React.RefObject<HTMLElement | null>;
  width: number;
  height: number;
}

const HeroBoxCtx = createContext<HeroBox | null>(null);

export function HeroBoxProvider({
  children,
  sectionRef,
}: {
  children: ReactNode;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ width: r.width, height: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sectionRef]);

  return (
    <HeroBoxCtx.Provider value={{ ref: sectionRef, width: size.width, height: size.height }}>
      {children}
    </HeroBoxCtx.Provider>
  );
}

const VIDEO_SRC = "https://assets.mixkit.co/videos/4640/4640-720.mp4";

interface FrameProps {
  className?: string;
  rounded?: string;
  initial?: Record<string, number | string>;
  delay?: number;
}

function FramePanel({ className, rounded = "rounded-[40px]", initial, delay = 0 }: FrameProps) {
  return (
    <motion.div
      initial={initial ?? { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
      whileHover={{ scale: 1.015 }}
      className={`group relative ${rounded} ${className ?? ""}`}
    >
      <div className={`pointer-events-none absolute inset-0 ${rounded} ring-1 ring-accent-red`} />
      <div className={`pointer-events-none absolute inset-[3px] ${rounded} ring-1 ring-accent-red/50`} />
      <div className={`pointer-events-none absolute inset-0 ${rounded} shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]`} />
      <div className={`pointer-events-none absolute inset-0 ${rounded} bg-background/0 transition-colors duration-500 group-hover:bg-background/[0.06]`} />
    </motion.div>
  );
}

export function HeroGrid() {
  return (
    <>
      <motion.video
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-accent-red/35 mix-blend-multiply" />

      <div className="hero-grid pointer-events-none absolute inset-0 z-20 grid grid-cols-12 grid-rows-6 gap-4 p-4 md:gap-6 md:p-6">
        <FramePanel
          delay={0.1}
          initial={{ opacity: 0, x: -80 }}
          rounded="rounded-[28px] md:rounded-[44px]"
          className="pointer-events-auto col-span-12 row-span-3 md:col-span-6 md:row-span-6"
        />

        <div className="col-span-6 row-span-3 flex flex-col gap-4 md:col-span-2 md:row-span-6 md:gap-6">
          <FramePanel
            delay={0.5}
            initial={{ scale: 0, opacity: 0 }}
            rounded="rounded-full"
            className="pointer-events-auto aspect-square w-full"
          />
          <FramePanel
            delay={0.4}
            initial={{ opacity: 0, y: 80 }}
            rounded="rounded-[24px] md:rounded-[32px]"
            className="pointer-events-auto flex-1"
          />
        </div>

        <FramePanel
          delay={0.25}
          initial={{ opacity: 0, x: 80 }}
          rounded="rounded-[28px] md:rounded-[44px]"
          className="pointer-events-auto col-span-6 row-span-3 md:col-span-4 md:row-span-6"
        />
      </div>
    </>
  );
}
