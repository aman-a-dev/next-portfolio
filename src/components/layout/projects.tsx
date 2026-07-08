"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "@/components/custom/project-card";
import { projectsList } from "@/data/projects";
import { Heading } from "@/components/common/intro";
gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      // Pin the section and translate the track horizontally as the user
      // scrolls down — vertical scroll drives horizontal motion, on every
      // screen size. Cards are full-bleed (100vw) on mobile and a fixed
      // width on desktop; either way `track.scrollWidth` already accounts
      // for the track's own left/right padding, so we don't need a manual
      // buffer constant.
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => "+=" + getScrollAmount(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each card dims/desaturates until it nears the center of the
      // viewport, then comes fully into focus — tied to the same
      // horizontal timeline via containerAnimation.
      gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.85, filter: "grayscale(1)" },
          {
            opacity: 1,
            scale: 1,
            filter: "grayscale(0)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 78%",
              end: "left 45%",
              scrub: true,
            },
          },
        );
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative mb-5">
      <div className="mx-auto max-w-[1100px] px-6 pb-10 pt-24">
        <div className="mb-3.5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide text-red-400">
          <span className="h-px w-6 bg-red-400" />
          selected work — {String(projectsList.length).padStart(2, "0")}
        </div>
        <Heading
          text="Projects that shipped,"
          highlight="not just prototypes."
        />
      </div>

      <div
        ref={wrapRef}
        className="relative flex h-[100dvh] items-center overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex gap-2 px-1 m-3 lg:gap-7 lg:px-[6vw]"
        >
          {projectsList.map((project, i) => (
            <ProjectCard key={project.title} index={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
