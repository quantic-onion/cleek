import { CleekOptions } from './types/cleek-options';

const cleekOptions: CleekOptions = {
  lang: 'en',
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
    borderColor: '#dae1e7'
  },
  button: {
    type: 'outlined',
    layout: 'base',
  },
  img: {
    basePath: '',
  },
  popup: {
    textColor: '',
    headerAlign: '',
    headerColor: '',
    acceptBtnType: '',
    cancelBtnType: '',
    maxWidth: '',
    fontSize: '',
  },
  select: {
    clearValue: 'auto',
  },
  table: {
    striped: false,
  },
};

export default cleekOptions;