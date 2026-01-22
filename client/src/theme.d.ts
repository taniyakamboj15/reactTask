export interface Theme {
  colors: {
    background: string;
    surface: string;
    surfaceHighlight: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    primary: string;
    accent: string;
    border: string;
  };
  blur: string;
}
