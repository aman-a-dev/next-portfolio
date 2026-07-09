import type { Metadata } from "next";
import "./globals.css";

// components
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { CodingFactsToast } from "@/components/custom/coding-facts-toast";

// layout
import NavBar from "@/components/common/nav";
import Footer from "@/components/common/footer";

// font
import { nunitoFont } from "@/fonts/font";
import { PageTracker } from "@/components/page-tracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head />
      <body className={nunitoFont.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageTracker />
          <NavBar />
          {children}
          <Footer />
          <Toaster richColors closeButton position="bottom-left" />
          <CodingFactsToast />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://amanadev.vercel.app/"),

  title: {
    default: "Aman | Full Stack Web Developer",
    template: "%s | Aman",
  },

  description:
    "I'm Aman, a Full Stack Web Developer specializing in Next.js, React, TypeScript, Node.js, Prisma ORM, PostgreSQL, Tailwind CSS, and AI-powered web applications. Explore my portfolio, projects, skills, and experience.",

  keywords: [
    // Personal Branding
    "Amanuel",
    "Aman",
    "Aman portfolio",
    "Amanuel portfolio",
    "Aman developer",
    "Aman full stack developer",
    "Aman web developer",

    // Primary Keywords
    "Full Stack Developer",
    "Full Stack Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "JavaScript Developer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",

    // Technologies
    "Next.js",
    "React.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Prisma ORM",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "REST API",
    "WebSocket",
    "Socket.IO",
    "Firebase",
    "Git",
    "GitHub",
    "Vercel",

    // AI & Modern Development
    "AI Web Developer",
    "OpenAI API",
    "Gemini API",
    "AI Chatbot Developer",
    "Image Generation",
    "AI Integration",
    "Automation",
    "Modern Web Applications",

    // Portfolio Keywords
    "Developer Portfolio",
    "Web Developer Portfolio",
    "Next.js Portfolio",
    "React Portfolio",
    "Full Stack Portfolio",
    "Software Engineer Portfolio",
    "Frontend Portfolio",
    "Backend Portfolio",

    // Services
    "Responsive Website",
    "Modern UI",
    "Landing Page Development",
    "Dashboard Development",
    "E-commerce Development",
    "Portfolio Website",
    "SaaS Development",
    "Web Application Development",

    // Long-tail Keywords
    "hire full stack developer",
    "hire next.js developer",
    "hire react developer",
    "hire node.js developer",
    "hire typescript developer",
    "modern web developer portfolio",
    "professional web developer",
    "AI web application developer",
    "responsive website developer",
    "custom web application developer",

    // SEO
    "portfolio",
    "web design",
    "web development",
    "frontend",
    "backend",
    "full stack",
    "developer",
    "software development",
    "modern web technologies",
    "UI UX",
    "performance optimization",
    "SEO friendly websites",
  ].join(", "),

  authors: [
    {
      name: "Aman",
      url: "https://amanadev.vercel.app/",
    },
  ],

  creator: "Amanuel Antene",
  publisher: "Amanuel Antene",

  applicationName: "Amanuel Anteneh Portfolio",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://amanadev.vercel.app/",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    //apple: "/apple-touch-icon.png",
  },

  //manifest: "/site.webmanifest",

  category: [
    "Portfolio",
    "Web Development",
    "Software Engineering",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Prisma ORM",
    "PostgreSQL",
    "Tailwind CSS",
    "Artificial Intelligence",
    "Developer Portfolio",
    "Open Source",
  ].join(", "),

  classification: "Portfolio, Full Stack Web Development, Software Engineering",

  other: {
    // PWA
    "application-name": "Aman Portfolio",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Aman Portfolio",

    // Theme
    "theme-color": "#09090b",
    "msapplication-TileColor": "#09090b",

    // Verification (replace with yours)
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE",

    // Open Graph Extras
    "og:locale": "en_US",
    "og:type": "website",
    "og:updated_time": new Date().toISOString(),

    // Rich Metadata
    "article:author": "Aman",
    "article:section": "Software Engineering",
    "article:tag":
      "Next.js, React, TypeScript, Node.js, Prisma, PostgreSQL, Tailwind CSS, AI, Full Stack",

    // Search Engine
    "revisit-after": "7 days",
    distribution: "global",
    rating: "general",

    copyright: `© ${new Date().getFullYear()} Amanuel Anteneh. All rights reserved.`,
  },
};
