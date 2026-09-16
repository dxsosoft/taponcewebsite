"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "theme-toggle-btn h-10 w-10 rounded-full p-0 flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      <span className="relative z-10 w-full h-full rounded-full bg-surface border border-border flex items-center justify-center text-foreground overflow-hidden">
        {mounted ? (
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center justify-center text-indigo-300"
              >
                <Moon className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center justify-center text-amber-500"
              >
                <Sun className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        ) : (
          <span className="h-5 w-5 rounded-full" />
        )}
      </span>
    </button>
  );
}
