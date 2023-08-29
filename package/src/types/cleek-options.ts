export type Align = 'left' | 'center' | 'right';
export type AlignVertical = 'top' | 'bottom' | 'center';
export type Color = string;
export type Icon = string | [string, string];
export type IconPack = 'font-awesome' | 'feather';
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
  img: {
    basePath: string;
  };
  popup: {
    textColor: string;
    headerAlign: Align;
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
  }
};
