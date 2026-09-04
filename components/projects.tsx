"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Project = {
  name: string;
  /** File under /public/projects — falls back to a placeholder panel if missing. */
  src: string;
};

const PROJECTS: Project[] = [
  { name: "Finlio", src: "/projects/finlio.png" },
  { name: "Finlio — Our story", src: "/projects/finliostory.png" },
  { name: "GTA Funding", src: "/projects/gta-funding.png" },
  { name: "Kivo", src: "/projects/kivo.png" },
  { name: "Build Your Identity", src: "/projects/san.jpg" },
  { name: "Britalian", src: "/projects/web.jpg" },
  { name: "Personal site", src: "/projects/personal-site.png" },
];

function PlaceholderPanel() {
  return (
    <div className="flex h-full w-full items-center justify-center text-muted">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
        <circle cx="8.5" cy="10" r="1.6" />
        <path d="m4.5 17 4.8-4.4a1.8 1.8 0 0 1 2.4 0L19.5 19" />
      </svg>
    </div>
  );
}

function Slide({ project }: { project: Project }) {
  const [missing, setMissing] = useState(false);

  return (
    <div className="relative aspect-[16/10] w-[280px] shrink-0 overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] sm:w-[360px]">
      {missing ? (
        <PlaceholderPanel />
      ) : (
        <Image
          src={project.src}
          alt={project.name}
          fill
          sizes="(min-width: 640px) 360px, 280px"
          onError={() => setMissing(true)}
          className="object-cover object-top"
        />
      )}
    </div>
  );
}

export function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const loop = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The row is rendered twice, so travelling half its width loops seamlessly.
      loop.current = gsap.to(track.current, {
        xPercent: -50,
        duration: 45,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: track },
  );

  return (
    <section
      id="work"
      data-reveal-scroll
      className="w-full overflow-hidden pb-24 pt-4"
      aria-label="Project screenshots"
    >
      <div
        data-reveal-child
        data-parallax-drift
        className="will-reveal [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
        onMouseEnter={() => loop.current?.pause()}
        onMouseLeave={() => loop.current?.resume()}
      >
        <div ref={track} className="flex w-max gap-4">
          {[...PROJECTS, ...PROJECTS].map((project, i) => (
            <Slide key={`${project.name}-${i}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
