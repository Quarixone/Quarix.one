import type { ShowcaseProject } from "@/lib/showcase-projects";

export function ShowcaseProjectMockup({
  project,
  large = false,
}: {
  project: ShowcaseProject;
  large?: boolean;
}) {
  return (
    <div
      className={`mx-auto overflow-hidden rounded-sm bg-white shadow-2xl shadow-black/30 ${
        large ? "max-w-3xl" : "max-w-sm"
      }`}
    >
      <div className="flex h-6 items-center gap-1 border-b border-zinc-200 bg-zinc-50 px-3">
        <span className="size-2 rounded-full bg-red-400" />
        <span className="size-2 rounded-full bg-amber-400" />
        <span className="size-2 rounded-full bg-emerald-400" />
        <span className="ml-3 h-2 w-24 rounded-full bg-zinc-200" />
      </div>
      <div
        className={`${
          project.mockup === "portfolio" ||
          project.mockup === "personal" ||
          project.mockup === "ai" ||
          project.mockup === "freelance"
            ? "bg-zinc-950 text-white"
            : "bg-white text-zinc-950"
        } p-6 ${large ? "min-h-[26rem]" : "min-h-44"}`}
      >
        <div className="mx-auto max-w-xs text-center">
          <span className="inline-flex rounded-full border border-current/10 px-3 py-1 text-[10px] opacity-70">
            {project.category}
          </span>
          <h3 className="mt-4 text-balance text-2xl font-semibold leading-none tracking-[-0.08em]">
            {project.subtitle}
          </h3>
          <p className="mx-auto mt-3 max-w-56 text-[11px] leading-4 opacity-60">
            {project.description}
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-2">
          <span className="h-12 rounded-lg bg-current/10" />
          <span className="h-12 rounded-lg bg-current/15" />
          <span className="h-12 rounded-lg bg-current/10" />
        </div>

        {large ? (
          <div className="mx-auto mt-8 grid max-w-md gap-2">
            <span className="h-2 rounded-full bg-current/15" />
            <span className="h-2 w-4/5 rounded-full bg-current/10" />
            <span className="h-2 w-2/3 rounded-full bg-current/10" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
