"use client";
import { TextEffect } from "@/components/vendor/text-effect";
import { Button } from "@/components/ui/button";
import { momoSignatureFont } from "@/fonts/font";
import Link from "next/link";
import { Video, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { Me } from "@/components/custom/me";
import { MatrixRain } from "@/components/vendor/matrix-rain";

export default function Hero() {
  return (
    <>
      <MatrixRain
        className="absolute inset-0 h-full w-full -z-10"
        fixedColor="#ff3030cc"
        speed={80}
        fontSize={20}
      />
      <section
        id="hero"
        className="pt-24 mx-auto mb-10 flex w-full max-w-6xl flex-col gap-10 px-5 py-14 lg:min-h-[85vh] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-0"
      >
        {/* Left column: greeting + name (+ mobile Anteneh) at top, tagline + CTAs at bottom */}
        <div className="flex w-full flex-col gap-6 lg:h-[70vh] lg:w-auto lg:justify-between lg:py-10">
          <div>
            <div className="flex items-center">
              <TextEffect
                per="word"
                as="h3"
                preset="slide"
                className="mb-2 text-left text-sm sm:text-base font-mono"
              >
                Hi &#128075;, I'm
              </TextEffect>
              <span className="ml-1 animate-[blink_1.1s_step-start_infinite] text-red-400">
                _
              </span>
            </div>

            <TextEffect
              per="char"
              delay={0.5}
              variants={variantObj}
              className="text-left font-display text-[15vw] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-[5vw] xl:text-[4.5rem]"
            >
              Amanuel
            </TextEffect>

            {/* Anteneh sits under Amanuel, right-aligned, on mobile/tablet only */}
            <TextEffect
              className={`${momoSignatureFont.className} text-right text-[15vw] leading-[0.92] tracking-tight text-primary sm:text-6xl lg:hidden`}
              per="char"
              delay={0.5}
              variants={variantObj}
            >
              Anteneh
            </TextEffect>
          </div>

          <div className="flex flex-col gap-6">
            <TextEffect per="char" delay={1.5}>
              Full Stack Web Developer
            </TextEffect>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.8 }}
              className="flex gap-2"
            >
              <Button nativeButton={false} render={<Link href="/contact" />}>
                Let's talk <Lightbulb />
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/about" />}
                variant="secondary"
              >
                2 min Interview
                <Video />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Center image, full width on mobile, fixed height column on desktop */}
        <div className="flex w-full justify-center lg:w-auto lg:h-[70vh] lg:shrink-0">
          <Me />
        </div>

        {/* Anteneh as its own vertically-centered column, desktop only */}
        <div className="hidden lg:flex lg:h-[70vh] lg:w-auto lg:flex-1 lg:items-center lg:justify-start">
          <TextEffect
            className={`${momoSignatureFont.className} text-left leading-[0.92] tracking-tight text-primary lg:text-[5vw] xl:text-[4.5rem]`}
            per="char"
            delay={0.5}
            variants={variantObj}
          >
            Anteneh
          </TextEffect>
        </div>
      </section>
    </>
  );
}

const variantObj = {
  container: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      rotateX: 90,
      y: 10,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
};
