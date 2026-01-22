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
  },
  blur: 'backdrop-blur-xl bg-opacity-70',
};
