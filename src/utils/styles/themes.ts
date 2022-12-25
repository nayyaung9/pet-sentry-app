import {DefaultTheme, DarkTheme} from '@react-navigation/native';

export type Theme = 'light' | 'dark';

export type ColorDefinitions =
  | 'primary'
  | 'background'
  | 'buttonDisable'
  | 'textDisable'
  | 'textWhite';

const themeColors: {
  [key in ColorDefinitions]: {
    light: string;
    dark: string;
  };
} = {
  primary: {
    light: '#ec417a',
    dark: '#282828',
  },
  background: {
    light: '#F9FCFF',
    dark: '#F9FCFF',
  },
  buttonDisable: {
    light: '#D3D3D3',
    dark: '#D3D3D3',
  },
  textDisable: {
    light: '#eee',
    dark: '#ddd',
  },
  textWhite: {
    light: '#fff',
    dark: '#282828',
  },
};

const getColors = (theme: Theme): {[key in ColorDefinitions]: string} => {
  let colors = {} as {
    [key in ColorDefinitions]: string;
  };
  const keys = Object.keys(themeColors) as ColorDefinitions[];
  keys.forEach(key => (colors[key] = themeColors[key][theme]));

  return colors;
};

const themes = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: themeColors.primary.light,
      background: themeColors.background.light,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: themeColors.primary.dark,
      background: themeColors.background.dark,
    },
  },
};

export {themeColors, getColors, themes};
