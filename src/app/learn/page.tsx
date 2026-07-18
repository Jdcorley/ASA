import { BrandMark } from "@/components/BrandMark";
import { ModuleCatalog } from "@/components/ModuleCatalog";
import { getAllModules } from "@/lib/learning/modules";

export const metadata = {
  title: "Learn",
};

export default function LearnPage() {
  const modules = getAllModules();

  return (
    <main className="mx-auto w-full max-w-lg px-5 pb-8 pt-6">
      <BrandMark />
      <header className="mt-8 animate-[rise_0.4s_ease]">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
          Modules
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--muted)]">
          Pick a subject track. Each module is a sequence of interactive steps
          and tiny games you can shape later by describing the learning moment
          you want.
        </p>
      </header>
      <ModuleCatalog modules={modules} />
    </main>
  );
}
