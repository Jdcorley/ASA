"use client";

import { ModuleRow } from "@/components/ModuleRow";
import { useProgressStore } from "@/lib/learning/useProgressStore";
import type { LearningModule } from "@/lib/learning/types";

type Props = {
  modules: LearningModule[];
};

export function ModuleCatalog({ modules }: Props) {
  const { store } = useProgressStore();

  return (
    <section className="mt-8 animate-[rise_0.55s_ease]">
      {modules.map((entry) => (
        <ModuleRow
          key={entry.id}
          module={entry}
          completedLessons={
            store.modules[entry.id]?.completedLessonIds.length ?? 0
          }
        />
      ))}
    </section>
  );
}
