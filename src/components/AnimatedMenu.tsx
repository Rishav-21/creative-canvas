import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS = ["Work", "About", "Services", "Careers", "Contact"];

export function AnimatedMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        data-magnetic
        data-cursor-hover
        className="relative z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
      >
        <div className="relative h-4 w-6">
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: [0.6, 0.05, 0.1, 0.95] }}
            className="absolute left-0 top-0 block h-0.5 w-6 bg-current"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-[7px] block h-0.5 w-6 bg-current"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: [0.6, 0.05, 0.1, 0.95] }}
            className="absolute left-0 top-[14px] block h-0.5 w-6 bg-current"
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 95% 5%)" }}
            animate={{ clipPath: "circle(150% at 95% 5%)" }}
            exit={{ clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-accent-red"
          >
            <nav className="flex flex-col items-center gap-4 text-background">
              {ITEMS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="text-6xl font-black tracking-tight hover:italic md:text-8xl"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
