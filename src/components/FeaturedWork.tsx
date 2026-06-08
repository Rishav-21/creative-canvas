import { useRef } from "react";
import { motion } from "framer-motion";

const WORK = [
  {
    client: "PEPSI",
    campaign: "The Choice",
    category: "Brand Film",
    video: "https://assets.mixkit.co/videos/1198/1198-720.mp4",
  },
  {
    client: "WHISKAS",
    campaign: "Lucky Cat",
    category: "Integrated Campaign",
    video: "https://assets.mixkit.co/videos/2400/2400-720.mp4",
  },
  {
    client: "MCDONALD'S",
    campaign: "Happy Doggy",
    category: "Social",
    video: "https://assets.mixkit.co/videos/4063/4063-720.mp4",
  },
  {
    client: "SKINNY",
    campaign: "Ads In My Phone Calls",
    category: "Digital",
    video: "https://assets.mixkit.co/videos/5012/5012-720.mp4",
  },
];

function Card({ item, index }: { item: (typeof WORK)[number]; index: number }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => vidRef.current?.play().catch(() => {})}
      onMouseLeave={() => vidRef.current?.pause()}
      className={`group relative block overflow-hidden rounded-3xl bg-card ${
        index % 2 === 1 ? "lg:mt-24" : ""
      }`}
      data-cursor="view"
      data-cursor-label="Play"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <video
          ref={vidRef}
          src={item.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        <div className="absolute left-6 top-6 rounded-full bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground backdrop-blur">
          {item.category}
        </div>
      </div>
      <div className="flex items-end justify-between p-6 md:p-8">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {item.client}
          </div>
          <h3 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-4xl">
            {item.campaign}
          </h3>
        </div>
        <span className="text-2xl text-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
      </div>
    </motion.a>
  );
}

export function FeaturedWork() {
  return (
    <section id="work" className="relative bg-background px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between"
        >
          <h2 className="text-5xl font-black tracking-tighter text-foreground md:text-7xl">
            Featured <br /> <span className="italic">Work</span>
          </h2>
          <a href="#" className="hidden text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground md:block">
            VIEW ALL →
          </a>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {WORK.map((w, i) => (
            <Card key={w.client} item={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
