import { DefaultTheme } from '@react-navigation/native';

export const colors = {
  background: '#FFFFFF',
  surface: '#F2F2F2',
  surfaceMuted: '#E6E6E6',
  border: '#D0D0D0',
  text: '#111111',
  textMuted: '#666666',
  textOnDark: '#FFFFFF',
  accent: '#000000',
  errorSurface: '#E5E5E5',
  errorText: '#222222',
};

export const navigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.accent,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: colors.border,
    notification: colors.text,
  },
};
