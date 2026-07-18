import type { OrderStep } from "@/lib/learning/types";

type Props = {
  step: OrderStep;
  order: string[];
  onMove: (id: string, direction: -1 | 1) => void;
  locked: boolean;
};

export function OrderStepView({ step, order, onMove, locked }: Props) {
  const labeled = order
    .map((id) => step.items.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <div className="animate-[rise_0.35s_ease]">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
        {step.prompt}
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Use the arrows to reorder from top to bottom.
      </p>
      <ol className="mt-6 space-y-3">
        {labeled.map((item, index) => {
          if (!item) return null;
          return (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3 py-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--wash)] text-sm font-semibold text-[var(--muted)]">
                {index + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-[var(--ink)]">
                {item.label}
              </span>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  disabled={locked || index === 0}
                  onClick={() => onMove(item.id, -1)}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-[var(--ink)] disabled:opacity-30"
                  aria-label={`Move ${item.label} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={locked || index === labeled.length - 1}
                  onClick={() => onMove(item.id, 1)}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-[var(--ink)] disabled:opacity-30"
                  aria-label={`Move ${item.label} down`}
                >
                  ↓
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
