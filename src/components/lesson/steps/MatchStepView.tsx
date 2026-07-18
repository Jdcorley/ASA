import type { MatchStep } from "@/lib/learning/types";

type Props = {
  step: MatchStep;
  rightOptions: string[];
  mapping: Record<string, string>;
  onChange: (pairId: string, right: string) => void;
  locked: boolean;
};

export function MatchStepView({
  step,
  rightOptions,
  mapping,
  onChange,
  locked,
}: Props) {
  return (
    <div className="animate-[rise_0.35s_ease]">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
        {step.prompt}
      </h2>
      <ul className="mt-6 space-y-4">
        {step.pairs.map((pair) => (
          <li
            key={pair.id}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4"
          >
            <p className="text-sm font-semibold text-[var(--ink)]">{pair.left}</p>
            <label className="mt-3 block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              Matches
              <select
                disabled={locked}
                value={mapping[pair.id] ?? ""}
                onChange={(event) => onChange(pair.id, event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--wash)] px-3 py-3 text-sm font-medium text-[var(--ink)]"
              >
                <option value="">Choose…</option>
                {rightOptions.map((right) => (
                  <option key={right} value={right}>
                    {right}
                  </option>
                ))}
              </select>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
