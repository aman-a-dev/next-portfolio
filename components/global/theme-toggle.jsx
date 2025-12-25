"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon, Tv } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export function ThemeToggle({ ...props }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Determine which icon to show
  const icon =
    theme === "system" ? (
      resolvedTheme === "dark" ? <Moon /> : <Sun />
    ) : theme === "dark" ? (
      <Moon />
    ) : (
      <Sun />
    );

  return (
    <div className="flex gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-0">
          {icon}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          <DropdownMenuItem>
            <button
              onClick={() => setTheme("light")}
              className="flex items-center gap-2 font-black"
            >
              <Sun />
              <span>Light</span>
            </button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2 font-black"
            >
              <Moon />
              <span>Dark</span>
            </button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <button
              onClick={() => setTheme("system")}
              className="flex items-center gap-2 font-black"
            >
              <Tv />
              <span>System</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}