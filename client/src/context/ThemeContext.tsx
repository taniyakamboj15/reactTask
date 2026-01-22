import { createContext, useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../themes';
import type { Theme } from '../theme';
import type { ReactNode } from 'react';

interface ThemeContextType {
  theme: Theme;
  mode: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme-mode') as 'dark' | 'light') || 'dark';
  });

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme-mode', next);
      return next;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-surface-highlight', theme.colors.surfaceHighlight);
    root.style.setProperty('--color-text-primary', theme.colors.text.primary);
    root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);
    root.style.setProperty('--color-text-muted', theme.colors.text.muted);
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--glass-bg', theme.colors.glass);
    root.style.setProperty('--glass-border', theme.colors.glassBorder);
  }, [theme]);

  // Force dark mode class on body for Tailwind generic styles if needed, or remove if standardizing on vars
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
