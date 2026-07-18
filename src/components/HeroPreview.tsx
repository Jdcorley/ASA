"use client";

import { useEffect, useState } from "react";

const options = [
  { id: "a", label: "2 cups blue" },
  { id: "b", label: "6 cups blue" },
  { id: "c", label: "3 cups blue" },
];

export function HeroPreview() {
  const [selected, setSelected] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSelected("b");
      setPulse(true);
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative isolate w-full overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-6 shadow-[0_24px_60px_-30px_rgba(15,26,42,0.45)] animate-[rise_0.8s_ease_both]">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_70%)]"
        aria-hidden
      />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        Live lesson step
      </p>
      <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug tracking-[-0.02em] text-[var(--ink)]">
        Paint mix is 3 blue : 1 white. You pour 2 cups white — how much blue?
      </p>
      <ul className="mt-5 space-y-2">
        {options.map((option, index) => {
          const active = selected === option.id;
          const correct = option.id === "b";
          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => {
                  setSelected(option.id);
                  setPulse(option.id === "b");
                }}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                  active && correct
                    ? "border-[var(--teal)] bg-[color-mix(in_oklab,var(--teal)_14%,white)] text-[var(--ink)]"
                    : active
                      ? "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_12%,white)]"
                      : "border-[var(--line)] bg-[var(--wash)] text-[var(--ink)]"
                } ${pulse && correct && active ? "animate-[pop_0.45s_ease]" : ""}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span>{option.label}</span>
                {active && correct ? (
                  <span className="text-xs font-semibold text-[var(--teal)]">
                    Correct
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
