"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  checkChoice,
  checkMatch,
  checkMultiSelect,
  checkNumber,
  checkOrder,
  shuffle,
} from "@/lib/learning/engine";
import { getNextLessonId } from "@/lib/learning/modules";
import { markLessonComplete, setCurrentLesson } from "@/lib/learning/progress";
import { notifyProgressChanged } from "@/lib/learning/useProgressStore";
import type { LearningModule, Lesson, LessonStep } from "@/lib/learning/types";
import { ChoiceStepView } from "./steps/ChoiceStepView";
import { ExplainStepView } from "./steps/ExplainStepView";
import { MatchStepView } from "./steps/MatchStepView";
import { MultiSelectStepView } from "./steps/MultiSelectStepView";
import { NumberStepView } from "./steps/NumberStepView";
import { OrderStepView } from "./steps/OrderStepView";

type Props = {
  module: LearningModule;
  lesson: Lesson;
};

type Feedback = {
  ok: boolean;
  message: string;
};

type StepSessionProps = {
  step: LessonStep;
  accent: string;
  isLast: boolean;
  onContinue: () => void;
};

function StepSession({ step, isLast, onContinue }: StepSessionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [order, setOrder] = useState(() =>
    step.type === "order" ? shuffle(step.items.map((item) => item.id)) : [],
  );
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [rightOptions] = useState(() =>
    step.type === "match" ? shuffle(step.pairs.map((pair) => pair.right)) : [],
  );
  const [numberValue, setNumberValue] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [resolved, setResolved] = useState(false);

  function toggleMulti(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setFeedback(null);
  }

  function moveOrder(id: string, direction: -1 | 1) {
    setOrder((current) => {
      const index = current.indexOf(id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setFeedback(null);
  }

  function evaluate(): Feedback {
    switch (step.type) {
      case "explain":
        return { ok: true, message: "Keep going." };
      case "choice":
        return checkChoice(step, selectedId);
      case "multiSelect":
        return checkMultiSelect(step, selectedIds);
      case "order":
        return checkOrder(step, order);
      case "match":
        return checkMatch(step, mapping);
      case "number": {
        const parsed = numberValue.trim() === "" ? null : Number(numberValue);
        return checkNumber(step, parsed);
      }
      default:
        return { ok: false, message: "Unsupported step." };
    }
  }

  function handleCheck() {
    const result = evaluate();
    setFeedback(result);
    if (result.ok) {
      setResolved(true);
    }
  }

  const canContinue = step.type === "explain" || resolved;

  return (
    <>
      <div className="flex-1">
        {step.type === "explain" ? <ExplainStepView step={step} /> : null}
        {step.type === "choice" ? (
          <ChoiceStepView
            step={step}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id);
              setFeedback(null);
            }}
            locked={resolved}
          />
        ) : null}
        {step.type === "multiSelect" ? (
          <MultiSelectStepView
            step={step}
            selectedIds={selectedIds}
            onToggle={toggleMulti}
            locked={resolved}
          />
        ) : null}
        {step.type === "order" ? (
          <OrderStepView
            step={step}
            order={order}
            onMove={moveOrder}
            locked={resolved}
          />
        ) : null}
        {step.type === "match" ? (
          <MatchStepView
            step={step}
            rightOptions={rightOptions}
            mapping={mapping}
            onChange={(pairId, right) => {
              setMapping((current) => ({ ...current, [pairId]: right }));
              setFeedback(null);
            }}
            locked={resolved}
          />
        ) : null}
        {step.type === "number" ? (
          <NumberStepView
            step={step}
            value={numberValue}
            onChange={(value) => {
              setNumberValue(value);
              setFeedback(null);
            }}
            locked={resolved}
          />
        ) : null}

        {feedback ? (
          <p
            className={`mt-6 rounded-2xl px-4 py-3 text-sm font-medium animate-[rise_0.25s_ease] ${
              feedback.ok
                ? "bg-[color-mix(in_oklab,var(--teal)_14%,white)] text-[var(--ink)]"
                : "bg-[color-mix(in_oklab,var(--accent)_14%,white)] text-[var(--ink)]"
            }`}
            role="status"
          >
            {feedback.message}
          </p>
        ) : null}
      </div>

      <footer className="mt-8 flex flex-col gap-3">
        {canContinue ? (
          <button
            type="button"
            onClick={onContinue}
            className="flex min-h-12 items-center justify-center rounded-2xl bg-[var(--ink)] px-5 text-sm font-semibold text-[var(--surface)] transition-transform active:scale-[0.98]"
          >
            {isLast ? "Finish lesson" : "Continue"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCheck}
            className="flex min-h-12 items-center justify-center rounded-2xl bg-[var(--accent)] px-5 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Check
          </button>
        )}
      </footer>
    </>
  );
}

export function LessonPlayer({
  module: learningModule,
  lesson,
}: Props) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const step = lesson.steps[stepIndex];
  const progress =
    ((stepIndex + (step.type === "explain" ? 1 : 0.35)) / lesson.steps.length) *
    100;

  const nextLessonId = useMemo(
    () => getNextLessonId(learningModule, lesson.id),
    [learningModule, lesson.id],
  );

  useEffect(() => {
    setCurrentLesson(learningModule.id, lesson.id);
    notifyProgressChanged();
  }, [learningModule.id, lesson.id]);

  function handleContinue() {
    if (stepIndex >= lesson.steps.length - 1) {
      markLessonComplete(learningModule.id, lesson.id, nextLessonId);
      notifyProgressChanged();
      setFinished(true);
      return;
    }
    setStepIndex((value) => value + 1);
  }

  if (finished) {
    return (
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-lg flex-col px-5 pb-10 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
          Lesson complete
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)] animate-[rise_0.4s_ease]">
          {lesson.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          You finished this lesson in {learningModule.title}. Keep the streak of
          curiosity going with the next challenge, or jump back to the catalog.
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-10">
          {nextLessonId ? (
            <Link
              href={`/learn/${learningModule.id}/play/${nextLessonId}`}
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[var(--ink)] px-5 text-sm font-semibold text-[var(--surface)]"
            >
              Next lesson
            </Link>
          ) : null}
          <Link
            href={`/learn/${learningModule.id}`}
            className="flex min-h-12 items-center justify-center rounded-2xl border border-[var(--line)] px-5 text-sm font-semibold text-[var(--ink)]"
          >
            Back to module
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-lg flex-col px-5 pb-8 pt-4">
      <header className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push(`/learn/${learningModule.id}`)}
            className="text-sm font-semibold text-[var(--muted)]"
          >
            Close
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {stepIndex + 1} / {lesson.steps.length}
          </p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--wash)]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: learningModule.accent,
            }}
          />
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          {learningModule.title}
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--ink)]">
          {lesson.title}
        </h1>
      </header>

      <StepSession
        key={step.id}
        step={step}
        accent={learningModule.accent}
        isLast={stepIndex >= lesson.steps.length - 1}
        onContinue={handleContinue}
      />
    </div>
  );
}
