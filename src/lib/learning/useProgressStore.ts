"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  clearProgress,
  countCompletedLessons,
  readProgress,
  writeProgress,
} from "./progress";
import type { ProgressStore } from "./types";

const listeners = new Set<() => void>();
let cachedSnapshot: ProgressStore = { modules: {} };
let cachedRaw: string | null = null;

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === "lumen.progress.v1") {
      listener();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

function getSnapshot(): ProgressStore {
  if (typeof window === "undefined") {
    return cachedSnapshot;
  }

  const raw = window.localStorage.getItem("lumen.progress.v1");
  if (raw === cachedRaw) {
    return cachedSnapshot;
  }

  cachedRaw = raw;
  cachedSnapshot = readProgress();
  return cachedSnapshot;
}

function getServerSnapshot(): ProgressStore {
  return { modules: {} };
}

export function useProgressStore() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const reset = useCallback(() => {
    clearProgress();
    cachedRaw = null;
    emit();
  }, []);

  const persist = useCallback((next: ProgressStore) => {
    writeProgress(next);
    cachedRaw = null;
    emit();
  }, []);

  return {
    store,
    completedCount: countCompletedLessons(store),
    reset,
    persist,
  };
}

export function notifyProgressChanged() {
  cachedRaw = null;
  emit();
}
