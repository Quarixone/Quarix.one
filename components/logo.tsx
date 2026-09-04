/**
 * Quarix mark — "Quarter": a ring with one quadrant stepped out along the
 * diagonal. Drawn on a 100×100 box, filled with currentColor so it inherits
 * the theme. Use variant="micro" below ~32px, where the wider gap and heavier
 * ring keep the cut from filling in.
 */
export function QuarixMark({
  size = 34,
  variant = "default",
  className,
}: {
  size?: number;
  variant?: "default" | "micro";
  className?: string;
}) {
  const micro = variant === "micro";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="Quarix"
      className={className}
    >
      <path
        d={
          micro
            ? "M50 88 A38 38 0 1 1 88 50 L66 50 A16 16 0 1 0 50 66 Z"
            : "M50 88 A38 38 0 1 1 88 50 L70 50 A20 20 0 1 0 50 70 Z"
        }
        fill="currentColor"
      />
      <path
        d={
          micro
            ? "M98 60 A38 38 0 0 1 60 98 L60 76 A16 16 0 0 0 76 60 Z"
            : "M95 57 A38 38 0 0 1 57 95 L57 77 A20 20 0 0 0 77 57 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}
