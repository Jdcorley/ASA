import { describe, expect, it } from "vitest";
import { getAllModules, getLesson, getModule } from "../modules";

describe("module content", () => {
  it("loads seed modules with lessons and steps", () => {
    const allModules = getAllModules();
    expect(allModules.length).toBeGreaterThanOrEqual(3);

    for (const entry of allModules) {
      expect(entry.id).toBeTruthy();
      expect(entry.lessons.length).toBeGreaterThan(0);
      for (const lesson of entry.lessons) {
        expect(lesson.steps.length).toBeGreaterThan(0);
      }
    }
  });

  it("resolves a known lesson path", () => {
    const learningModule = getModule("ratio-instinct");
    expect(learningModule?.title).toBe("Ratio Instinct");

    const lesson = getLesson("ratio-instinct", "part-whole");
    expect(lesson?.lesson.title).toBe("Parts of a whole");
    expect(lesson?.lesson.steps[0]?.type).toBe("explain");
  });
});
