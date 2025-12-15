"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CopyBlock from "./CopyBlock";
import Scene from "./Scene";
import clsx from "clsx";

const MINT = "CXxfPDV1a8BxPmnviL4cWvfSPsf6hZPZBGYT5ucKbonk";

const SECTIONS = [
  { kicker: "", lines: ["When pigs fly"] },
  { kicker: "", lines: ["Market slang", "For the impossible"] },
  { kicker: "", lines: ["They say it", "When they mean never"] },
  { kicker: "", lines: ["Markets don’t care"] },
  { kicker: "", lines: ["So yeah", "Pigs fly"] },
  { kicker: "", lines: ["Still ridiculous", "Still happening"] },
  { kicker: "", lines: ["Not a promise", "Just a reminder"] }
];

export default function Experience({ xUrl }: { xUrl: string }) {
  const refs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = refs.current.filter(Boolean) as HTMLElement[];
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const idx = items.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      { threshold: [0.35, 0.5, 0.65] }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const hud = useMemo(
    () => [
      { k: "Mode", v: "Market sarcasm" },
      { k: "Altitude", v: "Improbable" },
      { k: "Signal", v: "@Flying_Pig_USD1" }
    ],
    []
  );

  return (
    <main className="min-h-screen">
      <div className="relative min-h-screen">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background glow */}
          <div
            className={clsx(
              "absolute inset-0 transition-opacity duration-700",
              active === 4
                ? "opacity-100 bg-[radial-gradient(70%_55%_at_50%_22%,rgba(217,141,161,0.28),transparent_58%),radial-gradient(45%_35%_at_50%_78%,rgba(217,141,161,0.14),transparent_64%)]"
                : "opacity-100 bg-[radial-gradient(60%_45%_at_60%_20%,rgba(217,141,161,0.16),transparent_55%),radial-gradient(35%_25%_at_25%_70%,rgba(217,141,161,0.09),transparent_60%)]"
            )}
          />

          <Scene step={active} />

          {/* HUD */}
          <div className="absolute top-6 left-6 right-6 flex items-start justify-between pointer-events-none">
            <div className="pointer-events-auto">
              <a
                href={xUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm font-mono text-white/70 backdrop-blur hover:text-white/90 hover:border-white/20 transition"
              >
                <span className="h-2 w-2 rounded-full bg-pink-400" />
                Flying Pig
              </a>
            </div>

            <div className="hidden md:flex gap-3">
              {hud.map((h) => (
                <div
                  key={h.k}
                  className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur"
                >
                  <div className="text-[11px] tracking-[0.22em] uppercase text-white/45 font-mono">
                    {h.k}
                  </div>
                  <div className="mt-1 text-sm text-white/80 font-mono">
                    {h.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
            <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur">
              <div className="text-[11px] tracking-[0.22em] uppercase text-white/45 font-mono">
                Scroll
              </div>
              <div className="mt-1 text-sm text-white/80 font-mono">
                Down
              </div>
            </div>

            <div className="pointer-events-auto text-right">
              <div className="text-[11px] tracking-[0.22em] uppercase text-white/45 font-mono">
                Chapter
              </div>
              <div className="mt-1 text-sm text-white/80 font-mono">
                {String(active + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll content */}
        <div className="relative z-10">
          {SECTIONS.map((s, i) => (
            <section
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="min-h-screen flex items-center"
            >
              <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
                <CopyBlock kicker={s.kicker} lines={s.lines} />

                {i === SECTIONS.length - 1 && (
                  <div className="mt-10 flex flex-col gap-3">
                    <div className="text-sm font-mono text-white/60">
                      Sniff the mint
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                      <button
                        onClick={() => navigator.clipboard.writeText(MINT)}
                        className="inline-flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 backdrop-blur hover:border-white/20 transition"
                      >
                        <span className="font-mono text-white/80 text-sm">
                          {MINT}
                        </span>
                        <span className="text-[11px] tracking-[0.22em] uppercase text-white/45 font-mono">
                          Copy
                        </span>
                      </button>

                      <a
                        href={xUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-pink-400/10 px-5 py-4 text-sm font-mono text-white/80 hover:border-white/20 hover:bg-pink-400/15 transition"
                      >
                        Enter the pen
                      </a>
                    </div>

                    <div className="mt-8 text-xs font-mono text-white/35 max-w-xl leading-relaxed">
                      Solana mint<br />
                      High risk<br />
                      No promises<br />
                      Just pigs with wings
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
