import type { Theme } from './theme';

export const darkTheme: Theme = {
  colors: {
    background: '#09090b',
    surface: '#18181b',
    surfaceHighlight: '#27272a',
    text: {
      primary: '#fafafa',
      secondary: '#a1a1aa',
      muted: '#52525b',
    },
    primary: '#3b82f6',
    accent: '#8b5cf6',
    border: '#27272a',
    glass: 'rgba(24, 24, 27, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
  },
  blur: 'backdrop-blur-xl bg-opacity-70',
};

export const lightTheme: Theme = {
  colors: {
    background: '#fafafa',
    surface: '#ffffff',
    surfaceHighlight: '#f4f4f5',
    text: {
      primary: '#18181b',
      secondary: '#52525b',
      muted: '#a1a1aa',
    },
    primary: '#2563eb',
    accent: '#7c3aed',
    border: '#e4e4e7',
    glass: 'rgba(255, 255, 255, 0.75)',
    glassBorder: 'rgba(0, 0, 0, 0.05)',
  },
  blur: 'backdrop-blur-xl bg-opacity-80',
};
