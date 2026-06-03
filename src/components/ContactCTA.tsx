import { motion } from "framer-motion";

const WORDS = ["LET'S", "DO", "BIG", "THINGS", "TOGETHER"];

export function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-accent-red px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="text-[14vw] font-black leading-[0.85] tracking-[-0.05em] text-background md:text-[10vw]">
          {WORDS.map((w, i) => (
            <motion.span
              key={w}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
              className={`mr-[0.15em] inline-block ${i === 3 ? "italic" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <a
            href="mailto:hello@voltagency.com"
            className="group inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 text-base font-semibold text-foreground transition-transform hover:scale-105"
          >
            Start a Project
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a href="mailto:hello@voltagency.com" className="text-background underline-offset-4 hover:underline">
            hello@voltagency.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
