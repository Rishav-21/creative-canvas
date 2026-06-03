import { motion } from "framer-motion";

const V1 = "https://assets.mixkit.co/videos/4640/4640-720.mp4";
const V2 = "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-32809-large.mp4";
const V3 = "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-1173-large.mp4";

function InlineVideo({ src, className }: { src: string; className: string }) {
  return (
    <span className={`inline-block align-middle overflow-hidden ${className}`}>
      <video src={src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
    </span>
  );
}

export function BigThings() {
  return (
    <section id="about" className="relative bg-background px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="col-span-1 text-[14vw] font-black leading-[0.85] tracking-[-0.05em] text-foreground lg:col-span-8 lg:text-[9vw]"
        >
          WE ARE{" "}
          <InlineVideo src={V1} className="h-[0.7em] w-[1.4em] rounded-full" />{" "}
          <InlineVideo src={V2} className="h-[0.7em] w-[0.7em] rounded-full" />{" "}
          <br />
          BBDO <br />
          WE{" "}
          <InlineVideo src={V3} className="h-[0.7em] w-[1.4em] rounded-full" /> <br />
          <span className="italic">DO</span> <br />
          BIG THINGS
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="col-span-1 flex flex-col justify-end gap-6 lg:col-span-4"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            We solve big problems with strategy and creative that make a big impact.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            We work with brands and marketers that have the biggest ambitions.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            We hire big talent and bring them big opportunities that build boundless careers.
          </p>
          <p className="text-2xl font-bold tracking-tight text-foreground">Want to do big things?</p>
          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
          >
            Contact Us
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
