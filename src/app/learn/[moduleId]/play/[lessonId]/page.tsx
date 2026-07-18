import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";
import { getAllModules, getLesson } from "@/lib/learning/modules";

type Props = {
  params: Promise<{ moduleId: string; lessonId: string }>;
};

export async function generateStaticParams() {
  return getAllModules().flatMap((module) =>
    module.lessons.map((lesson) => ({
      moduleId: module.id,
      lessonId: lesson.id,
    })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { moduleId, lessonId } = await params;
  const result = getLesson(moduleId, lessonId);
  return {
    title: result ? result.lesson.title : "Lesson",
  };
}

export default async function LessonPlayPage({ params }: Props) {
  const { moduleId, lessonId } = await params;
  const result = getLesson(moduleId, lessonId);
  if (!result) notFound();

  return <LessonPlayer module={result.module} lesson={result.lesson} />;
}
