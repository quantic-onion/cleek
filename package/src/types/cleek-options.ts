export type Align = 'left' | 'center' | 'right';
export type AlignVertical = 'top' | 'bottom' | 'center';
export type Color = string;
export type Icon = string | [string, string];
export type IconPack = 'font-awesome' | 'feather' | 'cleek';
export type Lang = 'es' | 'en';
export type Layout = 'base' | 'rounded' | 'squared';
export type ButtonType = 'filled' | 'outlined' | 'flat';
export type WidthBreaks = [number, string][];
export type InputType = 'text' | 'number' | 'date' | 'time' | 'password';
export type Size = 'xs' | 's' | 'm' | 'l' | 'xl';
export type SizeInCSS = string;
export type TableVersion = 'default' | 'colored';

export type CleekOptions = {
  lang: Lang;
  darkMode: boolean;
  darkModeColorText: Color;
  darkModeColorBackground: Color;
  darkModeColorItems: Color;
  colors: {
    primary: Color;
    secondary: Color;
  };
  styles: {
    layout: Layout;
    borderColor: Color;
  };
  button: {
    type: ButtonType;
    layout: Layout;
  };
  div: {
    gap: 0;
  };
  img: {
    basePath: string;
    basePathStatic: string;
    basePathDynamic: string;
  };
  popup: {
    textColor: string;
    headerAlign: Align;
    backgroundColor: Color;
    headerColor: Color;
    acceptBtnType: ButtonType;
    cancelBtnType: ButtonType;
    maxWidth: string;
    fontSize: string;
  };
  select: {
    clearValue: any;
  };
  table: {
    striped: boolean;
    version: TableVersion;
    headerTextColor?: Color;
    headerBackgroundColor?: Color;
  }
};
