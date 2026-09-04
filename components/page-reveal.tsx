"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// GSAP's own force3D default ("auto") already promotes each animating element
// to its own compositor layer for the duration of the tween and hands it back
// afterwards, so there is nothing to override here.

// The mobile URL bar showing and hiding changes viewport height, which would
// otherwise make ScrollTrigger re-measure and jump mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

const HIDDEN = { opacity: 0, y: 14 };
const SHOWN = { opacity: 1, y: 0 };
const EASE = "power3.out";

export function PageReveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // The hero animates in CSS so it never waits on this bundle.
      const sections = gsap.utils.toArray<HTMLElement>("[data-reveal-scroll]");
      const scrolled = sections.flatMap((section) =>
        gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-reveal-child]"),
        ),
      );
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(scrolled, SHOWN);
        return;
      }

      // Promote only while a thing is moving; hand the layer back afterwards so
      // idle elements are not permanently taking up compositor memory.
      const promote = (t: HTMLElement[]) =>
        gsap.set(t, { willChange: "transform, opacity" });
      const settle = (t: HTMLElement[]) => gsap.set(t, { willChange: "auto" });

      gsap.set(scrolled, HIDDEN);

      // --- sections: staggered as each scrolls into view ------------------
      sections.forEach((section) => {
        const kids = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-reveal-child]"),
        );

        // A short section at the end of the document can never scroll high
        // enough to cross a "85% down the viewport" line, so it would sit at
        // opacity 0 forever. Those enter as soon as they are properly on screen.
        const isShort = section.offsetHeight < window.innerHeight * 0.35;

        gsap.to(kids, {
          ...SHOWN,
          duration: 0.7,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: {
            trigger: section,
            start: isShort ? "top bottom-=24" : "top 85%",
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => promote(kids),
          },
          onComplete: () => settle(kids),
        });
      });

      // --- scroll-linked motion ------------------------------------------
      // The hero drifts up and dims as it leaves, so the page has depth
      // rather than a flat scroll.
      const hero = document.querySelector<HTMLElement>("[data-parallax-hero]");
      if (hero) {
        gsap.to(hero, {
          yPercent: -10,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
          },
        });
      }

      // The project strip drifts against the scroll as it crosses the screen.
      const drift = document.querySelector<HTMLElement>("[data-parallax-drift]");
      if (drift) {
        gsap.fromTo(
          drift,
          { y: 36 },
          {
            y: -36,
            ease: "none",
            scrollTrigger: {
              trigger: drift,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      }

      // Triggers are measured in a layout effect - before webfonts settle and
      // before the router restores scroll. Re-measure once both have happened.
      const refresh = () => {
        ScrollTrigger.refresh();

        // Safety net: anything already on screen but still hidden gets shown.
        // Invisible content is the worst failure mode this file can have.
        scrolled.forEach((el) => {
          const r = el.getBoundingClientRect();
          const onScreen = r.top < window.innerHeight && r.bottom > 0;
          if (onScreen && Number(getComputedStyle(el).opacity) === 0) {
            gsap.to(el, {
              ...SHOWN,
              duration: 0.6,
              ease: EASE,
              overwrite: "auto",
            });
          }
        });
      };
      requestAnimationFrame(refresh);
      document.fonts?.ready.then(refresh);
      ScrollTrigger.addEventListener("refreshInit", () => ScrollTrigger.clearScrollMemory());
    },
    { scope },
  );

  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}
