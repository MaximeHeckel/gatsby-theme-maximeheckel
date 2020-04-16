import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import theme from '../theme';

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const KEY = 'mode';

const defaultContextData = {
  dark: false,
  toggleDark: () => {},
};

const ThemeContext = React.createContext(defaultContextData);

const useTheme = () => React.useContext(ThemeContext);

const storage = {
  get: (init?: Theme) => window.localStorage.getItem(KEY) || init,
  set: (value: Theme) => window.localStorage.setItem(KEY, value),
};

const supportsDarkMode = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches === true;

const useDarkMode = (): [Theme, Dispatch<SetStateAction<Theme>>] => {
  const [themeState, setThemeState] = React.useState(Theme.LIGHT);

  const setThemeStateEnhanced = () => {
    setThemeState((prevState) => {
      const nextState = prevState === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      document.body.classList.remove('maximeheckel-' + prevState);

      document.body.classList.add('maximeheckel-' + nextState);
      storage.set(nextState);

      return nextState;
    });
  };

  React.useEffect(() => {
    const storedMode = storage.get();
    if (!storedMode && supportsDarkMode()) {
      return setThemeStateEnhanced();
    }

    if (!storedMode || storedMode === themeState) {
      return;
    }
    setThemeStateEnhanced();
  }, [themeState]);

  return [themeState, setThemeStateEnhanced];
};

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeState, setThemeStateEnhanced] = useDarkMode();
  const themeLoaded = themeState === Theme.DARK ? theme.dark : theme.light;
  const toggleDark = () => {
    setThemeStateEnhanced(
      themeState === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <EmotionThemeProvider theme={themeLoaded}>
      <ThemeContext.Provider
        value={{
          dark: themeState === Theme.DARK,
          toggleDark,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  );
};

export { ThemeProvider, useTheme };
