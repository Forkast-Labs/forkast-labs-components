import { useContext } from 'react';
import { ThemeContext } from 'context/theme';

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  return themeContext;
};
