import type { ExplainStep } from "@/lib/learning/types";

type Props = {
  step: ExplainStep;
};

export function ExplainStepView({ step }: Props) {
  return (
    <div className="animate-[rise_0.35s_ease]">
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
        {step.title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
        {step.body}
      </p>
      {step.callout ? (
        <p className="mt-6 border-l-4 border-[var(--accent)] pl-4 text-sm font-medium leading-relaxed text-[var(--ink)]">
          {step.callout}
        </p>
      ) : null}
    </div>
  );
}
