type BrandMarkProps = {
  size?: "sm" | "lg";
};

export function BrandMark({ size = "sm" }: BrandMarkProps) {
  const textClass = size === "lg" ? "text-5xl sm:text-7xl" : "text-xl";
  const markClass = size === "lg" ? "h-3 w-3" : "h-2 w-2";

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`${markClass} rounded-sm bg-[var(--accent)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_25%,transparent)]`}
        aria-hidden
      />
      <span
        className={`font-[family-name:var(--font-display)] font-bold tracking-[-0.04em] text-[var(--ink)] ${textClass}`}
      >
        Lumen
      </span>
    </div>
  );
}
