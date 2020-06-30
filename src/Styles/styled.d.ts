import 'styled-componets';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      title: string;

      background_color: string;
      text_color: string;
      form_background: string;
    }
  }
}