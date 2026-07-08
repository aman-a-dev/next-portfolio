"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { skillsList } from "@/data/skills";
import { Heading } from "@/components/common/intro";
import { Me2 } from "@/components/custom/me";

// Alternate radius per index so nodes weave between two orbits (in % of container)
const RADIUS_INNER = 29;
const RADIUS_OUTER = 43;

// Timing for the staged reveal: image first, then skills cascade in after it.
const IMAGE_DURATION = 0.6;
const IMAGE_TO_SKILLS_GAP = 0.25;
const SKILLS_START_DELAY = IMAGE_DURATION + IMAGE_TO_SKILLS_GAP;
const SKILL_STAGGER = 0.08;

function getPosition(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // start at 12 o'clock
  const radius = index % 2 === 0 ? RADIUS_INNER : RADIUS_OUTER;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

// Parent controls stagger timing; children just declare hidden/visible states.
const stageVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: SKILLS_START_DELAY,
      staggerChildren: SKILL_STAGGER,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: IMAGE_DURATION, ease: "easeOut" },
  },
};

const skillVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function SkillsSection() {
  const total = skillsList.length;
  const positions = skillsList.map((_, i) => getPosition(i, total));
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden px-6 py-24 sm:py-32"
    >
      {/* ambient core glow, using primary token so it follows the theme */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/15 via-accent-2/10 to-transparent blur-3xl" />

      {/* heading */}
      <div className="relative mx-auto max-w-2xl text-center">
        <Heading
          text="Skills and"
          highlight="Tools"
          paragraph="The stack I reach for to take an idea from schema to shipped product."
        />
      </div>

      {/* orbit stage — one viewport trigger drives the whole sequence */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        variants={stageVariants}
        className="relative mx-auto mt-16 aspect-square w-full max-w-[34rem]"
      >
        {/* decorative guide rings, rotate slowly */}
        <svg
          viewBox="0 0 100 100"
          className="orbit-ring absolute inset-0 h-full w-full opacity-30"
        >
          <circle
            cx="50"
            cy="50"
            r={RADIUS_INNER}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="0.3"
            strokeDasharray="1 3"
          />
          <circle
            cx="50"
            cy="50"
            r={RADIUS_OUTER}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="0.3"
            strokeDasharray="1 4"
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>
        </svg>

        {/* connecting lines, pulse of light flowing from core to each skill */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
              <stop
                offset="100%"
                stopColor="var(--accent-2)"
                stopOpacity="0.6"
              />
            </linearGradient>
          </defs>
          {positions.map((p, i) => (
            <line
              key={skillsList[i].skill}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke="url(#lineGrad)"
              strokeWidth="0.35"
              strokeDasharray="2 3"
              className={reduceMotion ? "" : "orbit-dash"}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </svg>

        {/* center image — appears first */}
        <motion.div
          variants={imageVariants}
          className="absolute left-1/2 top-1/2 z-10 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className={`absolute inset-[-8%] rounded-full bg-[conic-gradient(from_0deg,var(--primary),var(--accent-2),var(--primary))] opacity-70 blur-[2px] ${
              reduceMotion ? "" : "avatar-ring"
            }`}
          />

          <Me2 />
        </motion.div>

        {/* skill nodes — cascade up + fade in after the image, each showing icon + name */}
        {skillsList.map((item, i) => {
          const { x, y } = positions[i];
          const node = (
            <motion.div
              variants={skillVariants}
              className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.div
                animate={
                  reduceMotion ? undefined : { y: [0, i % 2 === 0 ? -6 : 6, 0] }
                }
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: SKILLS_START_DELAY + i * SKILL_STAGGER,
                }}
                whileHover={{ scale: 1.12 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground/80 shadow-sm backdrop-blur-md transition-colors duration-300 group-hover:border-primary/50 group-hover:text-foreground group-hover:shadow-[0_0_20px_rgba(0,0,0,0.12)] sm:h-14 sm:w-14"
              >
                {item.logo}
              </motion.div>
              <span className="pointer-events-none whitespace-nowrap rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm sm:text-xs">
                {item.skill}
              </span>
            </motion.div>
          );

          return item.url ? (
            <a
              key={item.skill}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {node}
            </a>
          ) : (
            <Fragment key={item.skill}>{node}</Fragment>
          );
        })}
      </motion.div>

      <style>{`
        .orbit-ring {
          animation: spin-slow 70s linear infinite;
          transform-origin: 50% 50%;
        }
        .avatar-ring {
          animation: spin-slow 8s linear infinite;
        }
        .orbit-dash {
          animation: dashflow 2.5s linear infinite;
        }
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes dashflow {
          to {
            stroke-dashoffset: -20;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-ring,
          .avatar-ring,
          .orbit-dash {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
