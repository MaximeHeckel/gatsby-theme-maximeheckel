import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import themeDark from '../theme_dark';
import themeLight from '../theme_light';

const defaultContextData = {
  dark: false,
  toggleDark: () => {},
};

const ThemeContext = React.createContext(defaultContextData);

const useTheme = () => React.useContext(ThemeContext);

const useDarkMode = (): [
  { dark: boolean; themeHasBeenSet: boolean },
  Dispatch<SetStateAction<{ dark: boolean; themeHasBeenSet: boolean }>>
] => {
  const supportsDarkMode = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches === true;

  const [themeState, setThemeState] = React.useState({
    dark: false,
    themeHasBeenSet: false,
  });
  React.useEffect(() => {
    const lsDark = localStorage.getItem('dark') === 'true';
    if (lsDark || supportsDarkMode()) {
      setThemeState({ dark: true, themeHasBeenSet: true });
    } else {
      setThemeState({ dark: false, themeHasBeenSet: true });
    }
  }, []);

  return [themeState, setThemeState];
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeState, setThemeState] = useDarkMode();

  const theme = themeState.dark ? themeDark : themeLight;

  const toggleDark = () => {
    const dark = !themeState.dark;
    localStorage.setItem('dark', JSON.stringify(dark));
    setThemeState({ ...themeState, dark });
  };

  return (
    <div style={{ display: themeState.themeHasBeenSet ? 'block' : 'none' }}>
      <EmotionThemeProvider theme={theme}>
        <ThemeContext.Provider
          value={{
            dark: themeState.dark,
            toggleDark,
          }}
        >
          {children}
        </ThemeContext.Provider>
      </EmotionThemeProvider>
    </div>
  );
};

export { ThemeProvider, useTheme };
