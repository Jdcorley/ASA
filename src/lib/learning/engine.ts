import type {
  ChoiceStep,
  LessonStep,
  MatchStep,
  MultiSelectStep,
  NumberStep,
  OrderStep,
} from "./types";

export type CheckResult = {
  ok: boolean;
  message: string;
};

export function isInteractiveStep(step: LessonStep): boolean {
  return step.type !== "explain";
}

export function checkChoice(
  step: ChoiceStep,
  selectedId: string | null,
): CheckResult {
  if (!selectedId) {
    return { ok: false, message: "Pick an option to continue." };
  }
  if (selectedId === step.correctId) {
    return {
      ok: true,
      message: step.success ?? "Nice — that clicks into place.",
    };
  }
  return {
    ok: false,
    message: step.hint ?? "Not quite. Try another angle.",
  };
}

export function checkMultiSelect(
  step: MultiSelectStep,
  selectedIds: string[],
): CheckResult {
  if (selectedIds.length === 0) {
    return { ok: false, message: "Select every option that fits." };
  }

  const selected = new Set(selectedIds);
  const correct = new Set(step.correctIds);
  const sameSize = selected.size === correct.size;
  const allMatch = [...correct].every((id) => selected.has(id));

  if (sameSize && allMatch) {
    return {
      ok: true,
      message: step.success ?? "All the right pieces, none of the extras.",
    };
  }

  return {
    ok: false,
    message: step.hint ?? "Close — check which ones truly belong.",
  };
}

export function checkOrder(
  step: OrderStep,
  order: string[],
): CheckResult {
  if (order.length !== step.correctOrder.length) {
    return { ok: false, message: "Arrange every item first." };
  }

  const matches = order.every((id, index) => id === step.correctOrder[index]);
  if (matches) {
    return {
      ok: true,
      message: step.success ?? "That sequence feels right.",
    };
  }

  return {
    ok: false,
    message: step.hint ?? "The order is off — reshuffle and try again.",
  };
}

export function checkMatch(
  step: MatchStep,
  mapping: Record<string, string>,
): CheckResult {
  const allPaired = step.pairs.every((pair) => Boolean(mapping[pair.id]));
  if (!allPaired) {
    return { ok: false, message: "Match every pair to continue." };
  }

  const correct = step.pairs.every((pair) => mapping[pair.id] === pair.right);
  if (correct) {
    return {
      ok: true,
      message: step.success ?? "Those connections line up.",
    };
  }

  return {
    ok: false,
    message: step.hint ?? "One or more matches are swapped.",
  };
}

export function checkNumber(
  step: NumberStep,
  value: number | null,
): CheckResult {
  if (value === null || Number.isNaN(value)) {
    return { ok: false, message: "Enter a number to check." };
  }

  const tolerance = step.tolerance ?? 0;
  const ok = Math.abs(value - step.answer) <= tolerance;
  if (ok) {
    return {
      ok: true,
      message: step.success ?? "Exactly — that number fits.",
    };
  }

  return {
    ok: false,
    message: step.hint ?? "Not that value. Adjust and check again.",
  };
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
