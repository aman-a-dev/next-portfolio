"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function Me() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always use the same src on the server and during the first client render
  let src = "/images/me-dark.png";
  if (mounted) {
    switch (resolvedTheme) {
      case "light":
        src = "/images/me-light.png";
        break;
      case "dark":
        src = "/images/me-dark.png";
        break;
      default:
        src = "/images/me-light.png";
        break;
    }
  }
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={src}
        alt="Amanuel Antene"
        width={400}
        height={500}
        priority
        className="h-56 w-full object-contain sm:h-72 lg:h-full lg:w-auto"
      />
    </motion.div>
  );
}
export function Me2() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always use the same src on the server and during the first client render
  let src = "/images/me2-dark.png";
  if (mounted) {
    switch (resolvedTheme) {
      case "light":
        src = "/images/me2-light.png";
        break;
      case "dark":
        src = "/images/me2-dark.png";
        break;
      default:
        src = "/images/me2-light.png";
        break;
    }
  }
  return (
    <Image
      src={src}
      alt="Amanuel Antene"
      width={400}
      height={500}
      priority
      className="h-full w-full object-cover"
    />
  );
}
