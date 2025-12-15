"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Scene({ step }: { step: number }) {
  const s = clamp(step ?? 0, 0, 6);
  const fly = s >= 4; // "So yeah / Pigs fly" moment

  const lift = [-6, -4, 0, 10, 34, 42, 38][s];
  const tilt = [-4, -3, -2, 0, 4, 6, 4][s];
  const scale = [0.98, 0.99, 1, 1.01, 1.06, 1.05, 1.04][s];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-black/45">
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_30%,rgba(217,141,161,0.18),transparent_65%)]" />

      {/* White flash only at fly moment */}
      {fly && (
        <div className="absolute inset-0 bg-white/10 animate-flash pointer-events-none" />
      )}

      {/* Subject */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={clsx(
            "relative select-none text-center",
            fly && "animate-float"
          )}
          style={{
            transform: `translateY(${-lift}px) rotate(${tilt}deg) scale(${scale})`
          }}
        >
          {/* Shadow */}
          <div
            className="absolute left-1/2 top-[150px] -translate-x-1/2 rounded-full bg-black/60 blur-2xl transition-all duration-700"
            style={{
              width: fly ? 140 : 180,
              height: fly ? 24 : 32,
              opacity: fly ? 0.35 : 0.55
            }}
          />

          {/* Pig */}
          <div className="text-8xl drop-shadow-[0_22px_60px_rgba(0,0,0,0.75)]">
            🐖
          </div>

          {/* Glitch stamp */}
          {fly && (
            <div className="absolute -top-20 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="rounded-full border border-white/20 bg-black/70 px-5 py-2 font-mono text-[11px] tracking-[0.3em] uppercase text-white/90">
                  when pigs fly
                </div>
                <div className="absolute inset-0 rounded-full border border-[rgba(217,141,161,0.35)] animate-stamp" />
                <div className="absolute inset-0 rounded-full mix-blend-screen opacity-60 animate-glitch" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frame */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10" />

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(${-lift}px) rotate(${tilt}deg) scale(${scale}); }
          50% { transform: translateY(${-(lift + 12)}px) rotate(${tilt + 1}deg) scale(${scale}); }
          100% { transform: translateY(${-lift}px) rotate(${tilt}deg) scale(${scale}); }
        }
        @keyframes flash {
          0% { opacity: 0.08; }
          50% { opacity: 0.22; }
          100% { opacity: 0.08; }
        }
        @keyframes stamp {
          0% { transform: scale(0.92); opacity: 0.2; }
          50% { transform: scale(1.06); opacity: 0.55; }
          100% { transform: scale(0.92); opacity: 0.2; }
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
              rgba(217,141,161,0.12) 0px,
              rgba(217,141,161,0.12) 2px,
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

        .animate-float { animation: float 2.1s ease-in-out infinite; }
        .animate-flash { animation: flash 1.6s ease-in-out infinite; }
        .animate-stamp { animation: stamp 1.1s ease-in-out infinite; }
        .animate-glitch { animation: glitch 0.8s linear infinite; }
      `}</style>
    </div>
  );
}
