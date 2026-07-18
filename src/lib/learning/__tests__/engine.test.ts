import { describe, expect, it } from "vitest";
import {
  checkChoice,
  checkMatch,
  checkMultiSelect,
  checkNumber,
  checkOrder,
} from "../engine";

describe("learning engine", () => {
  it("accepts the correct choice", () => {
    const result = checkChoice(
      {
        id: "c1",
        type: "choice",
        prompt: "Pick",
        options: [
          { id: "a", label: "A" },
          { id: "b", label: "B" },
        ],
        correctId: "b",
        success: "Good",
      },
      "b",
    );
    expect(result.ok).toBe(true);
    expect(result.message).toBe("Good");
  });

  it("requires exact multi-select membership", () => {
    const step = {
      id: "m1",
      type: "multiSelect" as const,
      prompt: "Pick all",
      options: [
        { id: "a", label: "A" },
        { id: "b", label: "B" },
        { id: "c", label: "C" },
      ],
      correctIds: ["a", "c"],
    };

    expect(checkMultiSelect(step, ["a", "c"]).ok).toBe(true);
    expect(checkMultiSelect(step, ["a"]).ok).toBe(false);
    expect(checkMultiSelect(step, ["a", "b", "c"]).ok).toBe(false);
  });

  it("validates order and match steps", () => {
    expect(
      checkOrder(
        {
          id: "o1",
          type: "order",
          prompt: "Order",
          items: [
            { id: "x", label: "X" },
            { id: "y", label: "Y" },
          ],
          correctOrder: ["x", "y"],
        },
        ["x", "y"],
      ).ok,
    ).toBe(true);

    expect(
      checkMatch(
        {
          id: "match",
          type: "match",
          prompt: "Match",
          pairs: [
            { id: "p1", left: "L1", right: "R1" },
            { id: "p2", left: "L2", right: "R2" },
          ],
        },
        { p1: "R1", p2: "R2" },
      ).ok,
    ).toBe(true);
  });

  it("checks numbers with tolerance", () => {
    expect(
      checkNumber(
        {
          id: "n1",
          type: "number",
          prompt: "Value",
          answer: 10,
          tolerance: 0.5,
        },
        10.4,
      ).ok,
    ).toBe(true);
    expect(
      checkNumber(
        {
          id: "n1",
          type: "number",
          prompt: "Value",
          answer: 10,
        },
        11,
      ).ok,
    ).toBe(false);
  });
});
