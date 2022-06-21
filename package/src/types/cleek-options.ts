export type Align = 'left' | 'center' | 'right';
export type AlignVertical = 'top' | 'bottom' | 'center';
export type Color = string;
export type Icon = string | [string, string];
export type IconPack = 'font-awesome' | 'feather';
export type Lang = 'es' | 'en';
export type Layout = 'base' | 'rounded' | 'square'; 
export type ButtonType = 'bordered' | 'filled' | 'outlined' | 'flat';
export type WidthBreaks = [number, string][];
export type InputType = 'text' | 'number' | 'date' | 'time' | 'password';
export type Size = 'xs' | 's' | 'm' | 'l' | 'xl';
export type SizeInCSS = string;

export type CleekOptions = {
  lang: Lang;
  colors: {
    primary: Color;
    secondary: Color;
  };
  img: {
    basePath: string;
  };
  button: {
    type: ButtonType;
    layout: Layout;
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
  styles: {
    layout: Layout;
    borderColor: Color;
  };
};
