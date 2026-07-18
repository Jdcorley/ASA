import type { MultiSelectStep } from "@/lib/learning/types";

type Props = {
  step: MultiSelectStep;
  selectedIds: string[];
  onToggle: (id: string) => void;
  locked: boolean;
};

export function MultiSelectStepView({
  step,
  selectedIds,
  onToggle,
  locked,
}: Props) {
  return (
    <div className="animate-[rise_0.35s_ease]">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
        {step.prompt}
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">Select all that apply.</p>
      <ul className="mt-6 space-y-3">
        {step.options.map((option) => {
          const active = selectedIds.includes(option.id);
          return (
            <li key={option.id}>
              <button
                type="button"
                disabled={locked}
                onClick={() => onToggle(option.id)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-all ${
                  active
                    ? "border-[var(--teal)] bg-[color-mix(in_oklab,var(--teal)_12%,white)] text-[var(--ink)]"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md border text-[10px] ${
                    active
                      ? "border-[var(--teal)] bg-[var(--teal)] text-white"
                      : "border-[var(--line)]"
                  }`}
                  aria-hidden
                >
                  {active ? "✓" : ""}
                </span>
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
