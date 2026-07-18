import ratioInstinct from "../../../content/modules/ratio-instinct.json";
import binaryThinking from "../../../content/modules/binary-thinking.json";
import wavePatterns from "../../../content/modules/wave-patterns.json";
import type { LearningModule, Lesson, SubjectId } from "./types";

const modules = [
  ratioInstinct,
  binaryThinking,
  wavePatterns,
] as LearningModule[];

export const subjectLabels: Record<SubjectId, string> = {
  math: "Math",
  cs: "Computer Science",
  science: "Science",
};

export function getAllModules(): LearningModule[] {
  return modules;
}

export function getModule(moduleId: string): LearningModule | undefined {
  return modules.find((entry) => entry.id === moduleId);
}

export function getLesson(
  moduleId: string,
  lessonId: string,
): { module: LearningModule; lesson: Lesson; lessonIndex: number } | undefined {
  const learningModule = getModule(moduleId);
  if (!learningModule) return undefined;

  const lessonIndex = learningModule.lessons.findIndex(
    (lesson) => lesson.id === lessonId,
  );
  if (lessonIndex < 0) return undefined;

  return {
    module: learningModule,
    lesson: learningModule.lessons[lessonIndex],
    lessonIndex,
  };
}

export function getModulesBySubject(subject: SubjectId): LearningModule[] {
  return modules.filter((entry) => entry.subject === subject);
}

export function getNextLessonId(
  learningModule: LearningModule,
  lessonId: string,
): string | undefined {
  const index = learningModule.lessons.findIndex(
    (lesson) => lesson.id === lessonId,
  );
  if (index < 0) return undefined;
  return learningModule.lessons[index + 1]?.id;
}
