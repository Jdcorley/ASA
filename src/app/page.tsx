import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { HeroPreview } from "@/components/HeroPreview";

export default function HomePage() {
  return (
    <main className="relative mx-auto flex min-h-[100dvh] w-full max-w-lg flex-col px-5 pb-8 pt-6">
      <div
        className="pointer-events-none absolute left-[-20%] top-[18%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(232,93,76,0.22),transparent_70%)] animate-[drift_12s_ease-in-out_infinite]"
        aria-hidden
      />

      <header className="relative z-10 animate-[rise_0.55s_ease]">
        <BrandMark size="lg" />
      </header>

      <section className="relative z-10 mt-8 animate-[rise_0.7s_ease]">
        <h1 className="max-w-[16ch] font-[family-name:var(--font-display)] text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.045em] text-[var(--ink)] sm:text-5xl">
          Learn by playing with ideas.
        </h1>
        <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-[var(--muted)]">
          Short creative modules and mini-games that teach math, CS, and science
          through how you interact — not through walls of text.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/learn"
            className="flex min-h-12 items-center justify-center rounded-2xl bg-[var(--ink)] px-6 text-sm font-semibold text-[var(--surface)] transition-transform active:scale-[0.98]"
          >
            Start learning
          </Link>
          <Link
            href="/learn/ratio-instinct/play/part-whole"
            className="flex min-h-12 items-center justify-center rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface)_80%,transparent)] px-6 text-sm font-semibold text-[var(--ink)] backdrop-blur-sm transition-transform active:scale-[0.98]"
          >
            Try a lesson
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-10 flex flex-1 items-end">
        <HeroPreview />
      </section>
    </main>
  );
}
