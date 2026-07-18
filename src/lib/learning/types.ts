export type SubjectId = "math" | "cs" | "science";

export type StepType =
  | "explain"
  | "choice"
  | "multiSelect"
  | "order"
  | "match"
  | "number";

export type Option = {
  id: string;
  label: string;
};

export type ExplainStep = {
  id: string;
  type: "explain";
  title: string;
  body: string;
  callout?: string;
};

export type ChoiceStep = {
  id: string;
  type: "choice";
  prompt: string;
  options: Option[];
  correctId: string;
  hint?: string;
  success?: string;
};

export type MultiSelectStep = {
  id: string;
  type: "multiSelect";
  prompt: string;
  options: Option[];
  correctIds: string[];
  hint?: string;
  success?: string;
};

export type OrderStep = {
  id: string;
  type: "order";
  prompt: string;
  items: Option[];
  correctOrder: string[];
  hint?: string;
  success?: string;
};

export type MatchPair = {
  id: string;
  left: string;
  right: string;
};

export type MatchStep = {
  id: string;
  type: "match";
  prompt: string;
  pairs: MatchPair[];
  hint?: string;
  success?: string;
};

export type NumberStep = {
  id: string;
  type: "number";
  prompt: string;
  answer: number;
  tolerance?: number;
  unit?: string;
  hint?: string;
  success?: string;
};

export type LessonStep =
  | ExplainStep
  | ChoiceStep
  | MultiSelectStep
  | OrderStep
  | MatchStep
  | NumberStep;

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  steps: LessonStep[];
};

export type LearningModule = {
  id: string;
  title: string;
  subject: SubjectId;
  tagline: string;
  estimatedMinutes: number;
  accent: string;
  lessons: Lesson[];
};

export type ModuleProgress = {
  moduleId: string;
  completedLessonIds: string[];
  currentLessonId?: string;
  updatedAt: string;
};

export type ProgressStore = {
  modules: Record<string, ModuleProgress>;
};
