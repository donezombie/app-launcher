import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { useGetPlatformSettings } from 'hooks/platform/usePlatformHooks';
import { Theme } from '@mui/material';
import { Platform } from 'services/platformService';
import { isEmpty, isEqual, isObject } from 'lodash';

export enum ModeThemeEnum {
  light = 'light',
  dark = 'dark',
}

interface ToggleThemeContextI {
  themeOfApp: Theme;
  mode: ModeThemeEnum;
  toggleTheme: () => void;
  loadingTheme: boolean;
  settings?: Platform;
}

const ToggleThemeContext = createContext<ToggleThemeContextI>({
  themeOfApp: {} as any,
  mode: ModeThemeEnum.light,
  toggleTheme: () => {},
  loadingTheme: true,
  settings: {} as any,
});

export const useSettingsTheme = () => useContext(ToggleThemeContext);

const KEY_THEME = 'theme';
const KEY_SETTINGS = 'settings';
const SettingsThemeProvider = ({ children }: { children: any }) => {
  //! State
  const { data: resPlatform, isLoading: loadingTheme } = useGetPlatformSettings();
  const theme = (localStorage.getItem(KEY_THEME) as ModeThemeEnum) || ModeThemeEnum.light;
  const [mode, setMode] = useState(theme);

  const settingsCached =
    localStorage.getItem(KEY_SETTINGS) !== 'undefined' &&
    localStorage.getItem(KEY_SETTINGS) !== null
      ? JSON.parse(localStorage.getItem(KEY_SETTINGS) || '')
      : null;

  const settings = useMemo(() => {
    if (isObject(resPlatform?.data) && isObject(settingsCached)) {
      if (!isEqual(settingsCached, resPlatform?.data)) {
        localStorage.setItem(KEY_SETTINGS, JSON.stringify(resPlatform?.data));
        return resPlatform?.data;
      }
    }

    if (!isEmpty(settingsCached)) {
      return settingsCached;
    }

    return resPlatform?.data;
  }, [settingsCached, resPlatform?.data]) as Platform;

  const mainColour = settings?.mainColour || '#000000';

  //! Funtion
  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      if (prevMode === ModeThemeEnum.light) {
        localStorage.setItem(KEY_THEME, ModeThemeEnum.dark);
        return ModeThemeEnum.dark;
      }

      localStorage.setItem(KEY_THEME, ModeThemeEnum.light);
      return ModeThemeEnum.light;
    });
  }, []);

  const themeOfApp = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: `"Lato", sans-serif`,
          allVariants: {
            color: '#171919',
          },
          h6Bold: {
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '32px',
            letterSpacing: '-0.336px',
          },
          h6Medium: {},
          captionMedium: {
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '-0.07px',
          },
          captionLRegular: {
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '-0.07px',
          },
          captionLBold: {
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '20px',
            letterSpacing: '-0.07px',
          },
          captionMRegular: {
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '16px',
          },
          bodyMBold: {
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '26px',
            letterSpacing: '-0.216px',
          },
        },
        palette: {
          mode: mode,
          primary: {
            main: '#147b77',
          },
        },
        components: {
          MuiButton: {
            variants: [
              {
                props: { variant: 'secondary' },
                style: {
                  backgroundColor: '#F2F2F2',
                },
              },
            ],
          },
        },
        sizes: {
          heightNavbar: 76,
          widthSidebar: 280,
        },
        colors: {
          purple: '#611f69',
          green: '#2eb67d',
          red: 'red',
          yellow: '#ecb22e',
          blue: '#36c5f0',
          white: '#fff',
          black: 'rgb(18, 18, 18)',
          gray: '#fafafb',
          gray2: '#ECEEEF',
          grayLight: '#F2F2F2',
          grayText: '#17191999',
          grayActiveMenu: '#f1f1f2',
          border: '#dde0e2',
          borderInput: '#e8ebeb',
          borderInputLight: '#ebeeef',
          borderIcon: '#f4f4f6',
          textGray: '#666c6e',
          borderLine: '#dfe2e7',
          borderBaseAlpha: 'rgba(23, 25, 25, 0.08)',
          text1: '#171919',
          text2: '#17191999',
        },
      }),
    [mainColour]
  );

  //! Render
  const value = useMemo(() => {
    return { settings, themeOfApp, loadingTheme, mode, toggleTheme };
  }, [themeOfApp, mode, toggleTheme, loadingTheme, settings]);

  return <ToggleThemeContext.Provider value={value}>{children}</ToggleThemeContext.Provider>;
};

export default SettingsThemeProvider;
