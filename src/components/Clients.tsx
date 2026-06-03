const CLIENTS = ["Google", "Nike", "Apple", "Meta", "Spotify", "Netflix", "Microsoft", "Adobe"];

export function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="group/marquee relative overflow-hidden border-y border-border bg-background py-10">
      <div className="mb-6 px-6 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground md:px-10">
        Trusted By
      </div>
      <div className="flex animate-marquee whitespace-nowrap">
        {row.map((c, i) => (
          <span
            key={i}
            className="mx-12 text-6xl font-black tracking-tighter text-foreground/80 md:text-8xl"
          >
            {c} <span className="text-accent-red">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}
