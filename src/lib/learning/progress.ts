import type { ModuleProgress, ProgressStore } from "./types";

const STORAGE_KEY = "lumen.progress.v1";

const emptyStore = (): ProgressStore => ({ modules: {} });

export function readProgress(): ProgressStore {
  if (typeof window === "undefined") {
    return emptyStore();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as ProgressStore;
    return parsed.modules ? parsed : emptyStore();
  } catch {
    return emptyStore();
  }
}

export function writeProgress(store: ProgressStore): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getModuleProgress(moduleId: string): ModuleProgress | null {
  return readProgress().modules[moduleId] ?? null;
}

export function markLessonComplete(
  moduleId: string,
  lessonId: string,
  nextLessonId?: string,
): ModuleProgress {
  const store = readProgress();
  const existing = store.modules[moduleId] ?? {
    moduleId,
    completedLessonIds: [],
    updatedAt: new Date().toISOString(),
  };

  const completedLessonIds = existing.completedLessonIds.includes(lessonId)
    ? existing.completedLessonIds
    : [...existing.completedLessonIds, lessonId];

  const updated: ModuleProgress = {
    moduleId,
    completedLessonIds,
    currentLessonId: nextLessonId,
    updatedAt: new Date().toISOString(),
  };

  store.modules[moduleId] = updated;
  writeProgress(store);
  return updated;
}

export function setCurrentLesson(
  moduleId: string,
  lessonId: string,
): ModuleProgress {
  const store = readProgress();
  const existing = store.modules[moduleId] ?? {
    moduleId,
    completedLessonIds: [],
    updatedAt: new Date().toISOString(),
  };

  const updated: ModuleProgress = {
    ...existing,
    currentLessonId: lessonId,
    updatedAt: new Date().toISOString(),
  };

  store.modules[moduleId] = updated;
  writeProgress(store);
  return updated;
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function countCompletedLessons(store: ProgressStore): number {
  return Object.values(store.modules).reduce(
    (total, moduleProgress) => total + moduleProgress.completedLessonIds.length,
    0,
  );
}
