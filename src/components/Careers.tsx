import { motion } from "framer-motion";

const JOBS = [
  { t: "Senior Art Director", l: "New York", d: "Full-time" },
  { t: "Creative Strategist", l: "London", d: "Full-time" },
  { t: "Motion Designer", l: "Remote", d: "Contract" },
  { t: "Producer", l: "Tokyo", d: "Full-time" },
  { t: "Brand Copywriter", l: "Berlin", d: "Full-time" },
];

export function Careers() {
  return (
    <section id="careers" className="relative bg-background px-6 py-32 md:px-10">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <h2 className="text-6xl font-black tracking-tighter text-foreground md:text-8xl">
            Join <span className="italic">Us</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            We hire big talent. People who'd rather make something true than something safe.
            Boundless careers, generous benefits, and the kind of work that travels.
          </p>
        </motion.div>
        <div className="lg:col-span-7">
          {JOBS.map((j, i) => (
            <motion.a
              key={j.t}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex items-center justify-between border-b border-border py-6 transition-colors hover:border-accent-red"
            >
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground transition-transform group-hover:translate-x-2 md:text-3xl">
                  {j.t}
                </h3>
                <div className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {j.l} · {j.d}
                </div>
              </div>
              <span className="text-2xl text-foreground transition-transform group-hover:translate-x-1">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
