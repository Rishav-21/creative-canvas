import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaLinkedin, FaVimeoV } from "react-icons/fa";

const COLS = [
  { t: "Studio", l: ["Work", "About", "Services", "Careers"] },
  { t: "Contact", l: ["New York", "London", "Tokyo", "Berlin"] },
];

export function Footer() {
  return (
    <footer className="bg-background px-6 py-16 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-[1600px]"
      >
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2 text-foreground">
              <div className="h-3 w-3 rounded-full bg-accent-red" />
              <span className="text-xl font-black tracking-tighter">VOLT/AGENCY</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              An independent creative agency doing big things for big brands.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.t}>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.t}</div>
              <ul className="mt-4 space-y-2">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#" className="text-sm text-foreground hover:text-accent-red">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VOLT/AGENCY. All rights reserved.
          </div>
          <div className="flex gap-5 text-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-accent-red"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-accent-red"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-accent-red"><FaLinkedin /></a>
            <a href="#" aria-label="Vimeo" className="hover:text-accent-red"><FaVimeoV /></a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
