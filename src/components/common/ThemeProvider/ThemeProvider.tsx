import React from 'react';
import { DEFAULT_COLORS, Theme, ThemeContext } from '../../../context/theme';

type Props = {
  children: React.ReactNode;
};

export type ThemeProviderProps = Partial<Theme>;

export const ThemeProvider: React.FC<Props & ThemeProviderProps> = ({
  children,
  colors,
}) => {
  return (
    <ThemeContext.Provider
      value={{
        colors: {
          background: colors?.background ?? DEFAULT_COLORS.background,
          headline: colors?.headline ?? DEFAULT_COLORS.headline,
          text: colors?.text ?? DEFAULT_COLORS.text,
          paper: colors?.paper ?? DEFAULT_COLORS.paper,
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
