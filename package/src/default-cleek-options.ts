import { CleekOptions } from './types/cleek-options';

const cleekOptions: CleekOptions = {
  lang: 'en',
  darkMode: false,
  darkModeColorText: '#ccc',
  darkModeColorBackground: '#23282E',
  darkModeColorItems: '#1E2126',
  colors: {
    primary: '#559933',
    secondary: '#559933',
    // success: '#559933',
    // warning: '#559933',
    // danger: '#559933',
    // dark: '#559933',
    // light: '#559933',
  },
  styles: {
    layout: 'base',
    borderColor: '#dae1e7',
  },
  button: {
    type: 'outlined',
    layout: 'base',
  },
  div: {
    gap: 0,
  },
  img: {
    basePath: '',
    basePathStatic: '',
    basePathDynamic: '',
  },
  popup: {
    textColor: '',
    headerAlign: '',
    backgroundColor: '',
    headerColor: '',
    acceptBtnType: '',
    cancelBtnType: '',
    maxWidth: '',
    fontSize: '',
  },
  select: {
    clearValue: 'auto',
    backgroundColor: '',
  },
  table: {
    striped: false,
    version: 'default',
    headerTextColor: '',
    headerBackgroundColor: '',
  },
};

export default cleekOptions;
