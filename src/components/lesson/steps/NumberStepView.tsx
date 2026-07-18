import type { NumberStep } from "@/lib/learning/types";

type Props = {
  step: NumberStep;
  value: string;
  onChange: (value: string) => void;
  locked: boolean;
};

export function NumberStepView({ step, value, onChange, locked }: Props) {
  return (
    <div className="animate-[rise_0.35s_ease]">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
        {step.prompt}
      </h2>
      <label className="mt-6 block">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
          Your answer{step.unit ? ` (${step.unit})` : ""}
        </span>
        <input
          type="number"
          inputMode="decimal"
          disabled={locked}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4 text-lg font-semibold text-[var(--ink)] outline-none focus:border-[var(--ink)]"
          placeholder="Type a number"
        />
      </label>
    </div>
  );
}
