"use client";

import clsx from "clsx";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Scene({ step }: { step: number }) {
  const s = clamp(step ?? 0, 0, 6);

  const isFly = s >= 4; // "So yeah / Pigs fly"
  const isPre = s === 3;

  // Step-driven motion (aggressive but deterministic)
  const lift = [-10, -6, 2, 14, 46, 58, 52][s];
  const tilt = [-8, -6, -3, 0, 6, 8, 5][s];
  const zoom = [0.96, 0.98, 1.0, 1.02, 1.06, 1.05, 1.04][s];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-black/45">
      {/* Backlight */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_25%,rgba(217,141,161,0.16),transparent_62%),radial-gradient(55%_45%_at_50%_85%,rgba(255,255,255,0.05),transparent_65%)]" />

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.16] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')] [background-size:120px_120px]" />

      {/* Moment spotlight */}
      <div
        className={clsx(
          "absolute inset-0 transition-opacity duration-700",
          isFly
            ? "opacity-100 bg-[radial-gradient(55%_45%_at_50%_28%,rgba(217,141,161,0.26),transparent_62%)]"
            : "opacity-100"
        )}
      />

      {/* FX layer */}
      {(isPre || isFly) && (
        <>
          {/* Shockwave */}
          <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -z-20">
            <div className="h-[320px] w-[320px] rounded-full border border-white/10 blur-[0.2px] animate-shock" />
            <div className="mt-[-320px] h-[320px] w-[320px] rounded-full border border-[rgba(217,141,161,0.14)] blur-[1px] animate-shockDelay" />
          </div>

          {/* Jet trail */}
          <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -z-10">
            <div className="h-[170px] w-[14px] rounded-full bg-white/18 blur-xl animate-trail" />
            <div className="mt-2 h-[150px] w-[10px] rounded-full bg-[rgba(217,141,161,0.32)] blur-2xl animate-trailSlow" />
          </div>

          {/* Flash */}
          {isFly && (
            <div className="absolute inset-[-60px] -z-30 bg-[radial-gradient(40%_35%_at_50%_35%,rgba(217,141,161,0.25),transparent_65%)] animate-flash" />
          )}
        </>
      )}

      {/* Subject */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={clsx(
            "relative select-none",
            isFly && "animate-float",
            (isPre || isFly) && "animate-shiver"
          )}
          style={{
            transform: `translateY(${-lift}px) rotate(${tilt}deg) scale(${zoom})`
          }}
        >
          {/* Shadow */}
          <div
            className="absolute left-1/2 top-[150px] -translate-x-1/2 rounded-full bg-black/55 blur-2xl transition-all duration-700"
            style={{
              width: isFly ? 150 : 190,
              height: isFly ? 26 : 34,
              opacity: isFly ? 0.35 : 0.55
            }}
          />

          {/* Wings (cheap and funny) */}
          <div className="absolute left-[-78px] top-[18px] rotate-[-12deg]">
            <div className={clsx("text-5xl", isFly ? "animate-wingL" : "opacity-80")}>🪽</div>
          </div>
          <div className="absolute right-[-78px] top-[18px] rotate-[12deg]">
            <div className={clsx("text-5xl", isFly ? "animate-wingR" : "opacity-80")}>🪽</div>
          </div>

          {/* Pig */}
          <div className="text-center">
            <div className="text-[11px] tracking-[0.32em] uppercase text-white/45 font-mono">
              flying pig protocol
            </div>

            <div className={clsx("mt-3 text-7xl", isFly ? "drop-shadow-[0_20px_55px_rgba(0,0,0,0.75)]" : "")}>
              🐖
            </div>

            <div className="mt-3 font-mono text-xs text-white/45">
              step {s + 1} / 07
            </div>
          </div>

          {/* Glitch stamp */}
          {isFly && (
            <div className="absolute left-1/2 top-[-74px] -translate-x-1/2">
              <div className="relative">
                <div className="rounded-full border border-white/15 bg-black/55 px-5 py-2 font-mono text-[11px] tracking-[0.28em] uppercase text-white/80 backdrop-blur">
                  when pigs fly
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-full border border-[rgba(217,141,161,0.25)] animate-stamp" />
                <div className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen opacity-70 animate-glitch" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frame */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10" />

      {/* Animations */}
      <style jsx global>{`
        @keyframes shock {
          0% { transform: scale(0.55); opacity: 0; }
          18% { opacity: 0.55; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes shockDelay {
          0% { transform: scale(0.6); opacity: 0; }
          28% { opacity: 0.35; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes trail {
          0% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(14px); opacity: 0.75; }
          100% { transform: translateY(0); opacity: 0.35; }
        }
        @keyframes trailSlow {
          0% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(18px); opacity: 0.45; }
          100% { transform: translateY(0); opacity: 0.2; }
        }
        @keyframes flash {
          0% { opacity: 0.08; }
          50% { opacity: 0.34; }
          100% { opacity: 0.08; }
        }
        @keyframes float {
          0% { transform: translateY(${-lift}px) rotate(${tilt}deg) scale(${zoom}); }
          50% { transform: translateY(${-(lift + 12)}px) rotate(${tilt + 1}deg) scale(${zoom}); }
          100% { transform: translateY(${-lift}px) rotate(${tilt}deg) scale(${zoom}); }
        }
        @keyframes shiver {
          0% { filter: none; }
          50% { filter: drop-shadow(0 0 18px rgba(217,141,161,0.18)); }
          100% { filter: none; }
        }
        @keyframes wingL {
          0% { transform: rotate(-10deg) translateY(0); }
          50% { transform: rotate(8deg) translateY(-4px); }
          100% { transform: rotate(-10deg) translateY(0); }
        }
        @keyframes wingR {
          0% { transform: rotate(10deg) translateY(0); }
          50% { transform: rotate(-8deg) translateY(-4px); }
          100% { transform: rotate(10deg) translateY(0); }
        }
        @keyframes stamp {
          0% { transform: scale(0.92); opacity: 0.15; }
          50% { transform: scale(1.06); opacity: 0.45; }
          100% { transform: scale(0.92); opacity: 0.15; }
        }
        @keyframes glitch {
          0% {
            background: repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.06) 0px,
              rgba(255,255,255,0.06) 2px,
              rgba(0,0,0,0) 2px,
              rgba(0,0,0,0) 6px
            );
            transform: translateX(-2px);
          }
          50% {
            background: repeating-linear-gradient(
              90deg,
              rgba(217,141,161,0.10) 0px,
              rgba(217,141,161,0.10) 2px,
              rgba(0,0,0,0) 2px,
              rgba(0,0,0,0) 7px
            );
            transform: translateX(2px);
          }
          100% {
            background: repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.06) 0px,
              rgba(255,255,255,0.06) 2px,
              rgba(0,0,0,0) 2px,
              rgba(0,0,0,0) 6px
            );
            transform: translateX(-2px);
          }
        }

        .animate-shock { animation: shock 1.25s ease-out infinite; }
        .animate-shockDelay { animation: shockDelay 1.25s ease-out infinite; }
        .animate-trail { animation: trail 0.9s ease-in-out infinite; }
        .animate-trailSlow { animation: trailSlow 1.2s ease-in-out infinite; }
        .animate-flash { animation: flash 1.6s ease-in-out infinite; }
        .animate-float { animation: float 2.1s ease-in-out infinite; }
        .animate-shiver { animation: shiver 1.3s ease-in-out infinite; }
        .animate-wingL { animation: wingL 0.65s ease-in-out infinite; }
        .animate-wingR { animation: wingR 0.65s ease-in-out infinite; }
        .animate-stamp { animation: stamp 1.1s ease-in-out infinite; }
        .animate-glitch { animation: glitch 0.8s linear infinite; }
      `}</style>
    </div>
  );
}
