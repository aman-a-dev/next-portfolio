"use client";

import { momoSignatureFont } from "@/fonts/font";
import { Badge } from "@/components/ui/badge";
import { TextEffect } from "@/components/vendor/text-effect";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { DiaTextReveal } from "@/components/vendor/dia-text-reveal";

type IntroProps = {
  icon: React.ReactNode;
  badge?: string;
  heading: string;
  highlight?: string;
  paragraph?: string;
};

export function Intro({
  icon,
  badge,
  heading,
  highlight,
  paragraph,
}: IntroProps) {
  return (
    <Card className="mt-24 mb-5 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-2 w-[90%]">
        <motion.div animate={{ y: 0, opacity: 1 }}>
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/5 mb-4 rounded-full px-4 py-1 text-sm font-medium"
          >
            {icon}
            {/*<Icon className="text-primary mr-1 h-3.5 w-3.5 animate-pulse" />{" "}*/}
            {badge}
          </Badge>
        </motion.div>
        <div className="flex">
          <TextEffect
            per="word"
            as="h1"
            preset="slide"
            className="max-w-[680px] font-display text-[clamp(28px,5vw,48px)] font-bold leading-[1.05] tracking-tight"
          >
            {heading}
          </TextEffect>
          <TextEffect
            per="word"
            as="h1"
            preset="slide"
            className={`${momoSignatureFont.className} text-primary max-w-[680px] font-display text-[clamp(28px,5vw,48px)] font-bold leading-[1.05] tracking-tight`}
          >
            {`${highlight}`}
          </TextEffect>
        </div>

        <TextEffect
          per="line"
          as="p"
          segmentWrapperClassName="overflow-hidden block"
          variants={variantObj}
          className="font-bold text-md text-muted-foreground"
        >
          {`${paragraph}`}
        </TextEffect>
      </div>
    </Card>
  );
}

const variantObj = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  },
};

export function Heading({
  text,
  highlight,
  className,
  paragraph,
}: {
  text: string;
  highlight?: string;
  className?: string;
  paragraph?: string;
}) {
  return (
    <div className={`${className} mb-4`}>
      <h1 className="max-w-[680px] font-display text-[clamp(28px,5vw,48px)] font-bold leading-[1.05] tracking-tight">
        <DiaTextReveal text={text} />
        {highlight && (
          <>
            {" "}
            <DiaTextReveal
              text={highlight}
              textColor="var(--primary)"
              className={`${momoSignatureFont.className}`}
            />
          </>
        )}
      </h1>
      {paragraph && (
        <DiaTextReveal
          text={paragraph}
          textColor="var(--muted-foreground)"
          className="text-center"
          duration={3}
        />
      )}
    </div>
  );
}
