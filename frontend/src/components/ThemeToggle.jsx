import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-theme-card hover:bg-theme-hover border border-theme-border transition-colors group"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-yellow-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon size={20} className="text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
