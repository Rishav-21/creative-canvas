import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { n: 120, suffix: "+", label: "Clients" },
  { n: 350, suffix: "+", label: "Awards" },
  { n: 80, suffix: "+", label: "Countries" },
  { n: 25, suffix: "+", label: "Years" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="relative bg-background px-6 py-32 md:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="flex flex-col"
          >
            <div className="text-6xl font-black tracking-tighter text-foreground md:text-8xl">
              <Counter to={s.n} suffix={s.suffix} />
            </div>
            <div className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
