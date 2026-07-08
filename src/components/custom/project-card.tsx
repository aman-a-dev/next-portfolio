import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { type ProjectsType } from "@/data/projects";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

type ProjectCardProps = ProjectsType & { index: number };

export function ProjectCard({
  index,
  badge,
  img,
  title,
  subTitle,
  description,
  github,
  demo,
  teckStack,
  isPrivate,
}: ProjectCardProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always use the same src on the server and during the first client render
  let src = "d.png";
  if (mounted) {
    switch (resolvedTheme) {
      case "light":
        src = "l.png";
        break;
      case "dark":
        src = "d.png";
        break;
      default:
        src = "d.png";
        break;
    }
  }
  return (
    <article className="proj-card group relative flex h-[80dvh] w-screen flex-none flex-col overflow-hidden border-y border-white/8 bg-background lg:h-auto lg:w-[380px] lg:rounded lg:border">
      {/* ghost index number */}
      <span className="pointer-events-none absolute -top-1 right-4 z-0 select-none font-display text-[110px] font-bold leading-none text-white/[0.06] lg:-top-2 lg:right-3 lg:text-[96px]">
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* cover */}
      <div className="relative z-10 flex h-[38dvh] flex-none items-center justify-center overflow-hidden lg:aspect-[16/10] lg:h-auto">
        {badge && (
          <Badge className="absolute bottom-2 right-4 z-10">{badge}</Badge>
        )}
        <Image
          src={`/screenshots/${img + src}`}
          alt={title}
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover opacity-100 mix-blend-normal transition duration-500 lg:opacity-90 lg:mix-blend-luminosity lg:group-hover:opacity-100 lg:group-hover:mix-blend-normal"
        />
      </div>

      {/* body */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-6">
        <h3 className="font-display text-2xl font-bold lg:text-xl">{title}</h3>
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {subTitle}
        </p>

        {/* summary + accordion for the parsed description */}
        <div className="space-y-1 max-h-[100px]">
          <div
            className={`
            text-[14px] leading-relaxed text-muted-foreground lg:text-[13.5px]
    space-y-3 
    [&_h4]:font-semibold
    [&_h4]:text-foreground
    [&_h4]:mt-4
    [&_ul]:list-disc
    [&_ul]:pl-5
    [&_ul]:space-y-2
    [&_a]:text-primary
    [&_a]:underline
    [&_strong]:text-foreground
  `}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {/* tech stack */}
          <div className="mt-1 flex gap-1 flex-wrap">
            {teckStack.map((tech) => (
              <span
                key={tech}
                className="shrink-0 rounded border border-white/10 px-2.5 py-1 font-mono text-[10.5px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* actions row */}
      <div className="grid flex-none grid-cols-2 gap-3 p-5 lg:p-4">
        <Button
          size="sm"
          className="w-full gap-1.5"
          nativeButton={false}
          render={<a href={demo} target="_blank" rel="noopener noreferrer" />}
        >
          <ArrowUpRight size={14} />
          Live Demo
        </Button>

        {isPrivate ? (
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5 text-muted-foreground"
                />
              }
            >
              <Lock size={14} />
              Private
            </PopoverTrigger>
            <PopoverContent>This GitHub repository is private.</PopoverContent>
          </Popover>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1.5"
            nativeButton={false}
            render={
              <a href={github} target="_blank" rel="noopener noreferrer" />
            }
          >
            <IconBrandGithub size={14} />
            GitHub
          </Button>
        )}
      </div>
    </article>
  );
}
