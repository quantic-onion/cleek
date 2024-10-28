// types
import type { ColumnItem } from '../types/table';
import type { Align, AlignVertical, Color, CleekOptions, Layout, WidthBreaks } from '../cleek-options/cleek-options.types';

export default {
  getGroupClass(
    {
      group,
      groupVertical,
      widthBreaks = [],
    }: {
      group?: Align;
      groupVertical?: AlignVertical;
      widthBreaks?: WidthBreaks;
    } = {},
    windowWidth: number,
  ) {
    const componentWidth = this.getWidthByWidthBreaks(widthBreaks, windowWidth);
    const classList: string[] = [];
    // group
    if (group && componentWidth !== '100%') classList.push(`ck-component__group--${group}`);
    // groupVertical
    if (groupVertical) classList.push(`ck-component__group-vertical--${groupVertical}`);
    return classList;
  },
  getWidthByWidthBreaks(widthBreaks?: [number, string][], windowWidth?: number) {
    if (widthBreaks) {
      let realWidthBreaks = [...widthBreaks];
      if (realWidthBreaks.length === 2 && typeof realWidthBreaks[0] === 'number' && typeof realWidthBreaks[1] === 'string') {
        // @ts-ignore
        realWidthBreaks = [realWidthBreaks];
      }
      // add [0, '100%']
      if (realWidthBreaks.length) {
        const first = realWidthBreaks[0];
        if (first[0] !== 0) {
          realWidthBreaks.unshift([0, '100%']);
        }
      }
      // ordernarlos del más grande al más chico
      let finalWidth = '';
      realWidthBreaks.forEach((widthBreak) => {
        const [windowBreak, width] = widthBreak;
        if ((windowWidth || 0) >= windowBreak) {
          finalWidth = width;
        }
      });
      return finalWidth;
    }
  },
  isColorTemplateVariable(color: string) {
    if (color === 'primary') return true;
    if (color === 'secondary') return true;
    if (color === 'success') return true;
    if (color === 'warning') return true;
    if (color === 'danger') return true;
    if (color === 'dark') return true;
    if (color === 'light') return true;
    if (color === 'primary-light') return true;
    if (color === 'secondary-light') return true;
    return false;
  },
  isColumnDisplayed(column: ColumnItem) {
    if (column.neverDisplay) return false;
    if (column.isDisplayed === false) return false;
    if (column.unchangeable) {
      if (column.isDisplayed === true) return true;
      return false;
    }
    return true;
  },
}; // export default
