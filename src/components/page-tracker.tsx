"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPath = useRef<string>("");
  const isFirstVisit = useRef<boolean>(true);

  useEffect(() => {
    // Don't track on first visit (handled by server)
    if (isFirstVisit.current) {
      isFirstVisit.current = false;
      return;
    }

    // Get the full path with query params
    const fullPath =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Don't track if path hasn't changed
    if (previousPath.current === fullPath) {
      return;
    }

    previousPath.current = fullPath;

    // Track the visit
    trackVisit(fullPath);
  }, [pathname, searchParams]);

  // Also track on initial load
  useEffect(() => {
    // Track initial visit
    const fullPath =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Check if this is the first visit and track it
    if (typeof window !== "undefined") {
      trackVisit(fullPath);
    }
  }, []); // Empty dependency array = run once on mount

  return null; // This component doesn't render anything
}

async function trackVisit(path: string) {
  try {
    const payload = {
      path,
      userAgent: navigator.userAgent,
      referrer: document.referrer || undefined,
      language: navigator.language || undefined,
      screenSize: `${window.screen.width}x${window.screen.height}`,
    };

    const response = await fetch("/api/track-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to track visit:", error);
    }
  } catch (error) {
    console.error("Error tracking visit:", error);
  }
}

export default function MainPageTracker() {
  return (
    <Suspense fallback={null}>
      <PageTracker />
    </Suspense>
  );
}
