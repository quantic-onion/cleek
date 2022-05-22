// types
import type { ColumnItem } from '../types/table';

export default {
  // getCleekOptions
  // getGroupClass
  // getWidthByWidthBreaks
  // isColorTemplateVariable
  // isColumnDisplayed
  // preventUnusedError

  getCleekOptions(getCurrentInstance: ComponentInternalInstance ) {
    return getCurrentInstance().appContext.app.config.globalProperties.$cleekOptions;
  },
  getGroupClass(
    {
      group,
      groupVertical,
      widthBreaks = [],
    }: {
      group?: 'left' | 'right' | 'center';
      groupVertical?: 'top' | 'bottom' | 'center';
      widthBreaks?: [number, string][];
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
  getWidthByWidthBreaks(
    widthBreaks?: [number, string][],
    windowWidth?: number,
  ) {
    if (widthBreaks) {
      let realWidthBreaks = [...widthBreaks];
      if (
        realWidthBreaks.length === 2
        && typeof realWidthBreaks[0] === 'number'
        && typeof realWidthBreaks[1] === 'string'
      ) {
        realWidthBreaks = [realWidthBreaks];
      }
      // ordernarlos del más grande al más chico
      let finalWidth = '';
      realWidthBreaks.forEach((widthBreak) => {
        const [windowBreak, width] = widthBreak;
        if ((windowWidth || 0) >= windowBreak) {
          finalWidth = width;
        }
      })
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
    return false;
  },
  isColumnDisplayed(column: ColumnItem) {
    if (column.isDisplayed === false) return false;
    if (column.unchangeable) {
      if (column.isDisplayed === true) return true;
      return false;
    }
    return true;
  },
  preventUnusedError(functions: any[]) {
    // prevent typescript "unused" error
    if (Math.random() === 1) { 
      functions.forEach((func) => {
        console.log(func);
      });
    }
  }
  
}; // export default