"use client";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { momoSignatureFont } from "@/fonts/font";
import {
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { DiaTextReveal } from "@/components/vendor/dia-text-reveal";

const CONTACTS = [
  {
    label: "Telegram",
    handle: "@Aman_a_dev",
    href: "https://t.me/Aman_a_dev",
    icon: IconBrandTelegram,
  },
  {
    label: "WhatsApp",
    handle: "+251 902 99 1919",
    href: "https://wa.me/251902991919",
    icon: IconBrandWhatsapp,
  },
  {
    label: "GitHub",
    handle: "aman-a-dev",
    href: "https://github.com/aman-a-dev",
    icon: IconBrandGithub,
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden mt-5">
      {/* ambient background — matches hero / projects sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-red-400/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-24 sm:px-10 lg:px-16">
        {/* status */}
        <div className="mb-8 flex items-center gap-2 font-mono text-xs text-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
          </span>
          available for freelance and remote work
        </div>

        {/* headline / CTA */}
        <h2 className="max-w-2xl font-display text-[clamp(32px,6vw,56px)] font-bold leading-[1.05] tracking-tight">
          <DiaTextReveal text="Got a project in mind?" />
          <br />
          <DiaTextReveal
            text="Let&rsquo;s build it."
            textColor="var(--primary)"
            className={`${momoSignatureFont.className}`}
          />
        </h2>

        <Link
          href="mailto:amanuelantenha@gmail.com"
          className="group mt-6 inline-flex items-center gap-2 font-mono text-sm text-[#B7BCC5] transition hover:text-[#EDEEF0]"
        >
          <Mail size={15} />
          amanuelantenha@gmail.com
          <ArrowUpRight
            size={14}
            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>

        {/* contact channels */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CONTACTS.map(({ label, handle, href, icon: Icon }, i) => (
            <motion.a
              whileInView={{ y: 0 }}
              initial={{ y: 50 }}
              transition={{ duration: 0.1 + Number(`0.${i}`) }}
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group backdrop-blur-md relative flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 transition hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <span className="text-primary flex h-9 w-9 items-center justify-center rounded-full">
                  <Icon size={18} stroke={1.75} />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{label}</span>
                  <span
                    className={`font-mono text-[11px] text-muted-foreground ${momoSignatureFont.className}`}
                  >
                    {handle}
                  </span>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#EDEEF0]"
              />
            </motion.a>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-6 font-mono text-[11px] text-[#7A8290] sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Amanuel Anteneh</span>
        </div>
      </div>
    </footer>
  );
}
