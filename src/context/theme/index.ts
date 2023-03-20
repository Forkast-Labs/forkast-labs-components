import React from 'react';

export type Theme = {
  colors: Partial<ThemeColors>;
};

export const DEFAULT_COLORS = {
  background: '#fff',
  headline: '#6E71FC',
  text: 'rgba(0, 0, 0, 0.87)',
  paper: '#f6fafb',
};

export type ThemeColors = {
  background: string;
  headline: string;
  text: string;
  paper: string;
};

export const ThemeContext = React.createContext<Theme>({
  colors: DEFAULT_COLORS,
});
