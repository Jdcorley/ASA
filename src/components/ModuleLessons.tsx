"use client";

import Link from "next/link";
import { useProgressStore } from "@/lib/learning/useProgressStore";
import type { LearningModule } from "@/lib/learning/types";

type Props = {
  module: LearningModule;
};

export function ModuleLessons({ module: learningModule }: Props) {
  const { store } = useProgressStore();
  const completed = store.modules[learningModule.id]?.completedLessonIds ?? [];

  return (
    <section className="mt-10 animate-[rise_0.55s_ease]">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        Lessons
      </h2>
      <ol className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {learningModule.lessons.map((lesson, index) => {
          const done = completed.includes(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                href={`/learn/${learningModule.id}/play/${lesson.id}`}
                className="flex items-start gap-4 py-5 transition-colors hover:bg-[color-mix(in_oklab,var(--surface)_55%,transparent)]"
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: done ? learningModule.accent : "var(--wash)",
                    color: done ? "white" : "var(--muted)",
                  }}
                >
                  {done ? "✓" : index + 1}
                </span>
                <span>
                  <span className="block font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
                    {lesson.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[var(--muted)]">
                    {lesson.summary}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
