"use client";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`w-16 h-8 flex items-center rounded-full cursor-pointer p-1 transition ${
        isDark ? "justify-end bg-[var(--xws-accent)]" : "justify-start bg-zinc-600"
      }`}
    >
      <motion.div
        layout
        className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center"
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        {isDark ? <Moon size={16} className="text-[var(--xws-accent-contrast)]" /> : <Sun size={16} className="text-amber-500" />}
      </motion.div>
    </div>
  );
}
