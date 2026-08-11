import { useState } from "react";
import { Info, X } from "lucide-react";
import { Reveal, Section } from "./Section";
import { OPEN_ROLES, TEAM, type TeamSocial } from "./data";

function SocialIcon({ s }: { s: TeamSocial }) {
  const paths: Record<TeamSocial["type"], string> = {
    linkedin:
      "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
    github:
      "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z",
    x: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z",
  };
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.type}
      data-testid={`team-social-${s.type}`}
      onClick={(e) => e.stopPropagation()}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-foreground/60 transition-colors duration-300 hover:border-primary hover:text-primary"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
        <path d={paths[s.type]} />
      </svg>
    </a>
  );
}

export function Team() {
  const [openInfo, setOpenInfo] = useState<number | null>(null);

  return (
    <Section
      id="team"
      index="10"
      eyebrow="Team"
      title={
        <>
          The people behind <span className="text-primary">Digi-Agent.</span>
        </>
      }
    >
      <Reveal>
        <div
          data-testid="team-strip"
          className="flex flex-col gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:h-[380px] md:flex-row"
        >
          {TEAM.map((m, i) => {
            const slug = m.name.toLowerCase();
            return (
              <div
                key={m.name}
                data-testid={`team-member-${slug}`}
                className="group relative flex min-h-[240px] flex-1 flex-col justify-between overflow-hidden bg-background p-6 transition-[flex-grow,background-color] duration-500 ease-out hover:bg-card/60 md:hover:flex-[1.9]"
              >
                <button
                  type="button"
                  aria-label={`About ${m.name}`}
                  data-testid={`team-info-btn-${slug}`}
                  onClick={() => setOpenInfo(openInfo === i ? null : i)}
                  className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-foreground/50 transition-colors duration-300 hover:border-primary hover:text-primary"
                >
                  <Info className="h-4 w-4" />
                </button>

                <span className="pointer-events-none select-none font-brand text-[clamp(3.5rem,7vw,6rem)] font-extrabold uppercase leading-none tracking-tight text-primary/15 transition-colors duration-500 group-hover:text-primary/35">
                  {m.initials}
                </span>

                <div className="translate-y-0 opacity-100 transition-all delay-100 duration-500 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <h3 className="font-display text-2xl tracking-tight">{m.name}</h3>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary/80">
                    {m.role}
                  </div>
                  {m.socials.length > 0 && (
                    <div className="mt-4 flex gap-2">
                      {m.socials.map((s) => (
                        <SocialIcon key={s.type} s={s} />
                      ))}
                    </div>
                  )}
                </div>

                {openInfo === i && (
                  <div
                    data-testid={`team-info-panel-${slug}`}
                    className="absolute inset-x-0 bottom-0 z-10 border-t border-hairline bg-background/95 p-5 backdrop-blur-md"
                  >
                    <button
                      type="button"
                      aria-label="Close"
                      data-testid={`team-info-close-${slug}`}
                      onClick={() => setOpenInfo(null)}
                      className="absolute right-3 top-3 text-foreground/50 transition-colors hover:text-primary"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="eyebrow">{m.name}</div>
                    <p className="mt-2 pr-6 text-sm leading-relaxed text-foreground/85">{m.desc}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div
          data-testid="team-open-roles"
          className="mt-4 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3"
        >
          {OPEN_ROLES.map((r) => (
            <div
              key={r}
              className="flex items-center justify-between gap-4 bg-background p-6 transition-colors duration-300 hover:bg-card/60"
            >
              <span className="text-[15px] font-medium text-foreground/85">{r}</span>
              <span className="shrink-0 rounded-full border border-primary/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                Position open
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
