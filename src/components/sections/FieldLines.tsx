import { cn } from "@/lib/cn";

const VANISH_X = 620;
const VANISH_Y = 150;
const ROW_STARTS = Array.from({ length: 19 }, (_, i) => -700 + i * 130);

/**
 * Decorative crop-row linework converging on the horizon — a quiet
 * agricultural texture for dark sections. Purely presentational.
 */
export function FieldLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 640"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <linearGradient id="field-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9bd79" stopOpacity="0" />
          <stop offset="0.45" stopColor="#d9bd79" stopOpacity="0.1" />
          <stop offset="1" stopColor="#d9bd79" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#field-fade)" strokeWidth="1">
        {ROW_STARTS.map((x) => (
          <path
            key={x}
            d={`M ${x} 640 Q ${(x + VANISH_X) / 2 + (x - VANISH_X) * 0.12} 380 ${VANISH_X} ${VANISH_Y}`}
          />
        ))}
        <path d={`M -100 ${VANISH_Y + 6} Q ${VANISH_X} ${VANISH_Y - 18} 1100 ${VANISH_Y + 6}`} strokeOpacity="0.6" />
      </g>
    </svg>
  );
}
