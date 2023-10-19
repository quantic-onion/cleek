// @ts-ignore // FIXME
import type { Align, AlignVertical } from './cleek-options';

export type ColumnItem = {
  // column
  name: string;
  title: string;
  unchangeable: boolean;
  isDisplayed: boolean;
  // td
  nowrap?: boolean;
  block?: boolean;
  overflowAuto?: boolean;
  align?: Align;
  verticalAlign?: AlignVertical;
  fixedWidth?: string; // min and max width
  autoWidth?: boolean;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
};
