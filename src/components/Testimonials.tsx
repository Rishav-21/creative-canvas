import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUOTES = [
  { q: "They don't just deliver work — they reshape how we think about our brand.", n: "Priya Mehta", c: "CMO · Pepsi" },
  { q: "The most creatively ambitious partner we've ever worked with. Period.", n: "James Liu", c: "VP Marketing · Nike" },
  { q: "Bold, strategic, and ruthlessly effective. Every brief becomes a moment.", n: "Elena García", c: "Brand Director · Spotify" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, []);
  const cur = QUOTES[i];
  return (
    <section className="relative overflow-hidden bg-background px-6 py-32 md:px-10">
      <div className="mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
              <span className="text-accent-red">“</span>
              {cur.q}
              <span className="text-accent-red">”</span>
            </p>
            <footer className="mt-10">
              <div className="text-lg font-bold text-foreground">{cur.n}</div>
              <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{cur.c}</div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-10 flex justify-center gap-2">
          {QUOTES.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              className={`h-1 transition-all ${k === i ? "w-10 bg-accent-red" : "w-4 bg-border"}`}
              aria-label={`quote ${k + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
