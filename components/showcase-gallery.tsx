import Link from "next/link";

import { ShowcaseProjectMockup } from "@/components/showcase-project-mockup";
import { showcaseProjects } from "@/lib/showcase-projects";

export function ShowcaseGallery() {
  return (
    <div className="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {showcaseProjects.map((project) => (
        <Link
          key={project.slug}
          href={`/showcase/${project.slug}`}
          className="group text-left outline-none"
        >
          <div
            className={`overflow-hidden rounded-xl bg-gradient-to-br ${project.accent} p-8 shadow-2xl shadow-black/30 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-black/50 group-focus-visible:ring-4 group-focus-visible:ring-white/30`}
          >
            <ShowcaseProjectMockup project={project} />
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
            {project.title}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-500">
            {project.subtitle}
          </p>
        </Link>
      ))}
    </div>
  );
}
