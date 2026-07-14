"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface MatrixRainProps {
  className?: string;
  variant?: "default" | "cyan" | "rainbow";
  width?: number;
  height?: number;
  fontSize?: number;
  speed?: number;
  fixedColor?: string;
}

export function MatrixRain({
  className,
  variant = "default",
  width,
  height,
  fontSize = 16,
  speed = 50,
  fixedColor,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize observer to adapt to parent size if no explicit dimensions
    const resizeObserver = new ResizeObserver(() => {
      if (!width && !height) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    });
    resizeObserver.observe(canvas);

    // Initial size setup
    if (width) canvas.width = width;
    if (height) canvas.height = height;
    if (!width && !height) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    const w = canvas.width;
    const h = canvas.height;

    // Columns and drops
    const columns = Math.floor(w / fontSize);
    const drops = new Array(columns).fill(1);

    // Character set: Katakana + numbers
    // const chars =
    //   "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890";
    const chars = "ሀሁሂሃሄህሆለሉሊላሌልሎሐሑሒሓሔሕሖመሙሚማሜምሞሠሡሢሣሤሥሦረሩሪራሬርሮሰሱሲሳሴስሶ፩፪፫፬፭፮፯፰፱";
    // Helper to get the computed background color from the canvas element
    const getBackgroundColor = () => {
      return getComputedStyle(canvas).backgroundColor; // e.g. "rgb(255,255,255)"
    };

    // Store the current background color
    let bgColor = getBackgroundColor();

    // Initial fill with the background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    const draw = () => {
      // Check if the background color has changed (e.g., theme toggle)
      const newBg = getBackgroundColor();
      if (newBg !== bgColor) {
        bgColor = newBg;
        // Reset entire canvas to new background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Reset drops to start fresh
        drops.fill(1);
      }

      // Semi-transparent overlay for the trail effect.
      // Use black for dark mode, white for light mode (this creates the fade effect)
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark
        ? "rgba(10, 10, 10, 0.05)"
        : "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)] || "";

        // Color selection
        if (variant === "rainbow" && !fixedColor) {
          const hue = (Date.now() / 20 + i * 10) % 360;
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        } else if (fixedColor) {
          ctx.fillStyle = fixedColor;
        } else {
          // Adaptive colors based on background (dark/light)
          if (variant === "cyan") {
            ctx.fillStyle = isDark ? "#0FF" : "#0e7490"; // Cyan-700
          } else {
            // Default green
            ctx.fillStyle = isDark ? "#0F0" : "#15803d"; // Green-700
          }
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, speed);

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, [variant, fontSize, speed, fixedColor, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "size-full bg-background block rounded-[inherit]",
        className,
      )}
      style={{ width, height }}
    />
  );
}
