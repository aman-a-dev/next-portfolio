"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { codingFacts } from "@/data/facts";

export function CodingFactsToast() {
  useEffect(() => {
    const showFact = () => {
      const fact = codingFacts[Math.floor(Math.random() * codingFacts.length)];

      toast(fact, {
        duration: 8000,
      });
    };

    showFact();

    const interval = setInterval(showFact, 30000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
