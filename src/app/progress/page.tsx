import { BrandMark } from "@/components/BrandMark";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { getAllModules } from "@/lib/learning/modules";

export const metadata = {
  title: "Progress",
};

export default function ProgressPage() {
  const modules = getAllModules();

  return (
    <main className="mx-auto w-full max-w-lg px-5 pb-8 pt-6">
      <BrandMark />
      <header className="mt-8 animate-[rise_0.4s_ease]">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
          Progress
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--muted)]">
          Your completed lessons stay on this device for now — perfect while we
          shape the learning experience from your phone.
        </p>
      </header>
      <ProgressDashboard modules={modules} />
    </main>
  );
}
