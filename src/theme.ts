import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    secondary: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h6Bold: React.CSSProperties;
    h6Medium?: React.CSSProperties;
    captionLMedium?: React.CSSProperties;
    captionLRegular?: React.CSSProperties;
    captionLBold?: React.CSSProperties;
    captionMRegular?: React.CSSProperties;
    captionMBold?: React.CSSProperties;
    captionSRegular?: React.CSSProperties;
    bodyMBold?: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    h6Bold?: React.CSSProperties;
    h6Medium?: React.CSSProperties;
    captionLMedium?: React.CSSProperties;
    captionLRegular?: React.CSSProperties;
    captionLBold?: React.CSSProperties;
    captionMRegular?: React.CSSProperties;
    captionMBold?: React.CSSProperties;
    captionSRegular?: React.CSSProperties;
    bodyMBold?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h6Bold: true;
    h6Medium: true;
    captionLMedium: true;
    captionLRegular: true;
    captionLBold: true;
    captionMRegular: true;
    captionMBold: true;
    captionSRegular: true;
    bodyMBold: true;
  }
}

type Colors = {
  purple?: string;
  green?: string;
  red?: string;
  yellow?: string;
  blue?: string;
  white?: string;
  black?: string;
  gray?: string;
  gray2?: string;
  gray3?: string;
  grayLight?: string;
  grayText?: string;
  grayActiveMenu?: string;
  border?: string;
  borderBaseAlpha?: string;
  borderInput?: string;
  borderInputLight?: string;
  borderIcon?: string;
  textGray?: string;
  borderLine?: string;
  text1?: string;
  text2?: string;
  text3?: string;
};

type Sizes = {
  heightNavbar: number;
  widthSidebar: number;
};

declare module '@mui/material/styles' {
  interface Theme {
    colors?: Colors;
    sizes?: Sizes;
  }
  interface ThemeOptions {
    colors?: Colors;
    sizes?: Sizes;
  }
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
  },
  colors: {
    purple: '#611f69',
    green: '#2eb67d',
    red: '#e01e5a',
    yellow: '#ecb22e',
    blue: '#36c5f0',
    white: '#fff',
    black: 'rgb(18, 18, 18)',
    gray: '#fafafb',
    grayLight: '#F2F2F2',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  colors: {
    purple: '#611f69',
    green: '#2eb67d',
    red: '#e01e5a',
    yellow: '#ecb22e',
    blue: '#36c5f0',
    white: '#fff',
    black: 'rgb(18, 18, 18)',
    gray: '#fafafb',
    grayLight: '#F2F2F2',
  },
});

const theme = (mode?: 'dark' | 'light') => (mode === 'dark' ? darkTheme : lightTheme);

export { theme };
