import Link from "next/link";
import { subjectLabels } from "@/lib/learning/modules";
import type { LearningModule } from "@/lib/learning/types";

type ModuleRowProps = {
  module: LearningModule;
  completedLessons?: number;
};

export function ModuleRow({ module, completedLessons = 0 }: ModuleRowProps) {
  const total = module.lessons.length;
  const progress = total === 0 ? 0 : Math.round((completedLessons / total) * 100);

  return (
    <Link
      href={`/learn/${module.id}`}
      className="group block border-b border-[var(--line)] py-5 transition-colors last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {subjectLabels[module.subject]} · {module.estimatedMinutes} min
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)] transition-transform group-hover:translate-x-0.5">
            {module.title}
          </h3>
          <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-[var(--muted)]">
            {module.tagline}
          </p>
        </div>
        <span
          className="mt-1 h-10 w-1.5 shrink-0 rounded-full"
          style={{ background: module.accent }}
          aria-hidden
        />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--wash)]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: module.accent }}
          />
        </div>
        <span className="text-xs font-medium text-[var(--muted)]">
          {completedLessons}/{total}
        </span>
      </div>
    </Link>
  );
}
