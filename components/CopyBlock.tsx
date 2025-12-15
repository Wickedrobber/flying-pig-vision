import clsx from "clsx";

export default function CopyBlock({
  kicker,
  lines,
  className
}: {
  kicker?: string;
  lines: string[];
  className?: string;
}) {
  return (
    <div className={clsx("max-w-xl", className)}>
      {kicker ? (
        <div className="text-xs tracking-[0.26em] uppercase text-white/45 font-mono">
          {kicker}
        </div>
      ) : null}
      <div className="mt-4 space-y-2">
        {lines.map((l, i) => (
          <div
            key={i}
            className="text-3xl md:text-5xl leading-[1.03] tracking-tightest font-semibold"
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
