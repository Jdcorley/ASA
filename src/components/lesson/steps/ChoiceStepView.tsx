import type { ChoiceStep } from "@/lib/learning/types";

type Props = {
  step: ChoiceStep;
  selectedId: string | null;
  onSelect: (id: string) => void;
  locked: boolean;
};

export function ChoiceStepView({ step, selectedId, onSelect, locked }: Props) {
  return (
    <div className="animate-[rise_0.35s_ease]">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
        {step.prompt}
      </h2>
      <ul className="mt-6 space-y-3">
        {step.options.map((option) => {
          const active = selectedId === option.id;
          return (
            <li key={option.id}>
              <button
                type="button"
                disabled={locked}
                onClick={() => onSelect(option.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-all ${
                  active
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--surface)]"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ink)]"
                }`}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
