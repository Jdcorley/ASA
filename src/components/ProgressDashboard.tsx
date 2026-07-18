"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/learning/useProgressStore";
import type { LearningModule } from "@/lib/learning/types";

type Props = {
  modules: LearningModule[];
};

export function ProgressDashboard({ modules }: Props) {
  const { store, completedCount, reset } = useProgressStore();
  const totalLessons = modules.reduce(
    (sum, entry) => sum + entry.lessons.length,
    0,
  );

  return (
    <section className="mt-8 animate-[rise_0.55s_ease]">
      <div className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          Lessons completed
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-[-0.05em] text-[var(--ink)]">
          {completedCount}
          <span className="text-2xl text-[var(--muted)]">/{totalLessons}</span>
        </p>
      </div>

      <ul className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {modules.map((entry) => {
          const done = store.modules[entry.id]?.completedLessonIds.length ?? 0;
          return (
            <li
              key={entry.id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-semibold text-[var(--ink)]">{entry.title}</p>
                <p className="text-sm text-[var(--muted)]">
                  {done} of {entry.lessons.length} lessons
                </p>
              </div>
              <Link
                href={`/learn/${entry.id}`}
                className="text-sm font-semibold text-[var(--accent)]"
              >
                Open
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={reset}
        className="mt-8 text-sm font-semibold text-[var(--muted)] underline-offset-4 hover:underline"
      >
        Reset local progress
      </button>
    </section>
  );
}
