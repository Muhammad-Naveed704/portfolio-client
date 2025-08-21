import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === 'dark' || theme === 'system';
  return (
    <button
      aria-label="Toggle Theme"
      className="rounded-full border border-gray-300 dark:border-gray-700 px-3 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}


