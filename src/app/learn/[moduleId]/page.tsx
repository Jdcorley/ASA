import Link from "next/link";
import { notFound } from "next/navigation";
import { ModuleLessons } from "@/components/ModuleLessons";
import { getModule, subjectLabels } from "@/lib/learning/modules";

type Props = {
  params: Promise<{ moduleId: string }>;
};

export async function generateStaticParams() {
  const { getAllModules } = await import("@/lib/learning/modules");
  return getAllModules().map((entry) => ({ moduleId: entry.id }));
}

export async function generateMetadata({ params }: Props) {
  const { moduleId } = await params;
  const learningModule = getModule(moduleId);
  return {
    title: learningModule?.title ?? "Module",
  };
}

export default async function ModulePage({ params }: Props) {
  const { moduleId } = await params;
  const learningModule = getModule(moduleId);
  if (!learningModule) notFound();

  const firstLesson = learningModule.lessons[0];

  return (
    <main className="mx-auto w-full max-w-lg px-5 pb-8 pt-6">
      <Link href="/learn" className="text-sm font-semibold text-[var(--muted)]">
        ← All modules
      </Link>

      <header className="mt-6 animate-[rise_0.4s_ease]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          {subjectLabels[learningModule.subject]} ·{" "}
          {learningModule.estimatedMinutes} min
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
          {learningModule.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
          {learningModule.tagline}
        </p>
        {firstLesson ? (
          <Link
            href={`/learn/${learningModule.id}/play/${firstLesson.id}`}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl px-6 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
            style={{ background: learningModule.accent }}
          >
            Start module
          </Link>
        ) : null}
      </header>

      <ModuleLessons module={learningModule} />
    </main>
  );
}
