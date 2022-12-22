import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from 'react';
import {Appearance} from 'react-native';
import {ColorDefinitions, getColors, Theme} from '~utils/styles/themes';
import { throttle } from 'lodash'

type ContextType = {
  mode: 'light' | 'dark';
  theme: Theme;
  colors: {[key in ColorDefinitions]: string};
};

export const useTheme = () => useContext(ManageThemeContext);

const ManageThemeContext = createContext<ContextType>({
  mode: 'light',
  theme: 'light',
  colors: getColors('light'),
});

const useColorSchemeDelay = (delay = 500) => {
  const [colorScheme, setColorScheme] = React.useState(
    Appearance.getColorScheme()
  )
  const onColorSchemeChange = React.useCallback(
    throttle(
      ({ colorScheme }) => {
        setColorScheme(colorScheme)
      },
      delay,
      {
        leading: false
      }
    ),
    []
  )
  React.useEffect(() => {
    const listener = Appearance.addChangeListener(onColorSchemeChange)
    return () => {
      onColorSchemeChange.cancel()
      listener.remove()
    }
  }, [])
  return colorScheme
}


const ThemeManager: React.FC<PropsWithChildren> = ({children}) => {
  const osTheme = useColorSchemeDelay()

  const [mode] = useState(osTheme || 'light');
  const [theme] = useState<Theme>('light');

  return (
    <ManageThemeContext.Provider
      value={{mode, theme, colors: getColors(theme)}}>
      {children}
    </ManageThemeContext.Provider>
  );
};

export default ThemeManager;
