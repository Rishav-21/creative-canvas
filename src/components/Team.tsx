import { motion } from "framer-motion";

const TEAM = [
  { name: "Ava Chen", role: "Chief Creative Officer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" },
  { name: "Marcus King", role: "Executive Strategy Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" },
  { name: "Lin Park", role: "Head of Design", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
  { name: "David Okafor", role: "Director of Production", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  { name: "Sofia Rossi", role: "Group Account Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80" },
];

export function Team() {
  return (
    <section className="relative overflow-hidden bg-background py-32">
      <div className="mx-auto mb-16 max-w-[1600px] px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-black tracking-tighter text-foreground md:text-7xl"
        >
          Our <span className="italic">People</span>
        </motion.h2>
      </div>
      <div className="flex gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
        {TEAM.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative h-[60vh] w-[70vw] flex-shrink-0 overflow-hidden rounded-3xl md:w-[36vw] lg:w-[28vw]"
          >
            <img
              src={p.img}
              alt={p.name}
              className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
              <h3 className="text-2xl font-black tracking-tight text-foreground">{p.name}</h3>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{p.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
