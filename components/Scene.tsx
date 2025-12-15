"use client";

import clsx from "clsx";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Scene({ step }: { step: number }) {
  // 0..6 arası bekliyoruz
  const s = clamp(step ?? 0, 0, 6);

  // "So yeah / Pigs fly" = 4
  const isFly = s >= 4;

  // Basit step-based hareket
  const lift = [-6, -4, 0, 10, 28, 34, 30][s]; // px
  const tilt = [-6, -4, -2, 0, 4, 6, 3][s]; // deg
  const wing = [4, 7, 10, 12, 18, 20, 16][s]; // deg
  const scale = [0.98, 0.99, 1.0, 1.01, 1.04, 1.03, 1.02][s];

  return (
    <div className="relative h-full w-full rounded-[32px] border border-white/10 bg-black/30 overflow-hidden">
      {/* Backplate */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(217,141,161,0.10),transparent_60%),radial-gradient(50%_40%_at_50%_85%,rgba(217,141,161,0.06),transparent_65%)]" />

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')] [background-size:120px_120px]" />

      {/* Spotlight moment */}
      <div
        className={clsx(
          "absolute inset-0 transition-opacity duration-700",
          s === 4
            ? "opacity-100 bg-[radial-gradient(60%_50%_at_50%_22%,rgba(217,141,161,0.22),transparent_60%)]"
            : "opacity-100"
        )}
      />

      {/* 2D Stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={clsx(
            "relative",
            "transition-transform duration-700 ease-out",
            isFly && "animate-[float_2.2s_ease-in-out_infinite]"
          )}
          style={{
            transform: `translateY(${-lift}px) rotate(${tilt}deg) scale(${scale})`
          }}
        >
          {/* Shadow */}
          <div
            className="absolute left-1/2 top-[190px] -translate-x-1/2 rounded-full bg-black/50 blur-xl transition-all duration-700"
            style={{
              width: isFly ? 140 : 180,
              height: isFly ? 26 : 34,
              opacity: isFly ? 0.35 : 0.55
            }}
          />

          {/* Pig SVG */}
          <svg
            width="320"
            height="260"
            viewBox="0 0 320 260"
            className="drop-shadow-[0_20px_55px_rgba(0,0,0,0.65)]"
            aria-label="Flying pig"
          >
            {/* Wings */}
            <g
              style={{
                transformOrigin: "85px 120px",
                transform: `rotate(${wing}deg)`
              }}
            >
              <path
                d="M55 110 C25 95, 18 70, 40 55 C70 35, 98 55, 96 88 C95 104, 78 118, 55 110 Z"
                fill="rgba(243,240,244,0.92)"
              />
              <path
                d="M54 108 C42 100, 38 86, 49 77 C63 66, 78 74, 77 90 C76 101, 65 112, 54 108 Z"
                fill="rgba(243,240,244,0.72)"
              />
            </g>

            <g
              style={{
                transformOrigin: "235px 120px",
                transform: `rotate(${-wing}deg)`
              }}
            >
              <path
                d="M265 110 C295 95, 302 70, 280 55 C250 35, 222 55, 224 88 C225 104, 242 118, 265 110 Z"
                fill="rgba(243,240,244,0.92)"
              />
              <path
                d="M266 108 C278 100, 282 86, 271 77 C257 66, 242 74, 243 90 C244 101, 255 112, 266 108 Z"
                fill="rgba(243,240,244,0.72)"
              />
            </g>

            {/* Body */}
            <ellipse cx="160" cy="140" rx="108" ry="82" fill="#C97A9B" />
            <ellipse cx="160" cy="150" rx="98" ry="72" fill="rgba(255,255,255,0.06)" />

            {/* Ears */}
            <path d="M95 88 C88 55, 120 52, 126 78 C117 88, 108 92, 95 88 Z" fill="#B96A8D" />
            <path d="M225 88 C232 55, 200 52, 194 78 C203 88, 212 92, 225 88 Z" fill="#B96A8D" />

            {/* Snout */}
            <ellipse cx="160" cy="165" rx="58" ry="44" fill="#B96A8D" />
            <ellipse cx="160" cy="170" rx="52" ry="38" fill="rgba(0,0,0,0.06)" />
            <circle cx="143" cy="168" r="6" fill="rgba(20,16,22,0.9)" />
            <circle cx="177" cy="168" r="6" fill="rgba(20,16,22,0.9)" />

            {/* Eyes (blank degen stare) */}
            <circle cx="125" cy="130" r="7" fill="#0E0D10" />
            <circle cx="195" cy="130" r="7" fill="#0E0D10" />
            <circle cx="123" cy="128" r="2" fill="rgba(255,255,255,0.35)" />
            <circle cx="193" cy="128" r="2" fill="rgba(255,255,255,0.35)" />

            {/* Tiny mouth */}
            <path d="M148 192 C156 198, 164 198, 172 192" stroke="rgba(10,8,12,0.55)" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Tail */}
            <path
              d="M255 168 C282 170, 285 198, 263 198 C246 198, 246 180, 260 182"
              stroke="#B96A8D"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Micro label */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.22em] uppercase text-white/45 font-mono">
            {s === 4 ? "pigs fly moment" : "improbable altitude"}
          </div>
        </div>
      </div>

      {/* Frame */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10" />

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(${-(lift)}px) rotate(${tilt}deg) scale(${scale}); }
          50% { transform: translateY(${-(lift + 10)}px) rotate(${tilt + 1}deg) scale(${scale}); }
          100% { transform: translateY(${-(lift)}px) rotate(${tilt}deg) scale(${scale}); }
        }
      `}</style>
    </div>
  );
}
