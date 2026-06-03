import { motion } from "framer-motion";

const SERVICES = [
  { n: "01", t: "Strategy", d: "Brand, growth and communications strategy." },
  { n: "02", t: "Creative", d: "Big ideas built to break culture." },
  { n: "03", t: "Brand Design", d: "Identity systems with staying power." },
  { n: "04", t: "Advertising", d: "Integrated campaigns across every channel." },
  { n: "05", t: "Production", d: "Film, photography and post in-house." },
  { n: "06", t: "Digital", d: "Products, sites and platforms that perform." },
  { n: "07", t: "Social Media", d: "Always-on content that builds fandoms." },
  { n: "08", t: "Content Creation", d: "Editorial-grade storytelling at scale." },
  { n: "09", t: "Experience Design", d: "Spaces, events and IRL activations." },
];

export function Services() {
  return (
    <section id="services" className="relative bg-light-gray px-6 py-32 text-background md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-5xl font-black tracking-tighter md:text-7xl"
        >
          What We <span className="italic">Do</span>
        </motion.h2>
        <div className="border-t border-background/10">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="group grid grid-cols-12 items-center gap-4 border-b border-background/10 py-8 transition-colors hover:bg-background hover:text-foreground"
            >
              <div className="col-span-2 text-sm font-medium opacity-60 md:col-span-1">{s.n}</div>
              <h3 className="col-span-10 text-3xl font-black tracking-tight transition-transform group-hover:translate-x-2 md:col-span-5 md:text-5xl">
                {s.t}
              </h3>
              <p className="col-span-12 text-sm opacity-70 md:col-span-5 md:text-base">{s.d}</p>
              <span className="col-span-12 text-right text-2xl opacity-0 transition-opacity group-hover:opacity-100 md:col-span-1">
                →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
