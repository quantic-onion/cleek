export default {
  // getCleekOptions
  // getGroupClass
  // getWidthByWidthBreaks
  // isColorTemplateVariable
  // isColumnDisplayed
  // 

  getCleekOptions(getCurrentInstance) {
    return getCurrentInstance().appContext.app.config.globalProperties.$cleekOptions;
  },
  getGroupClass({ group = '', groupVertical = '', widthBreaks = [] } = {}, windowWidth) {
    const componentWidth = this.getWidthByWidthBreaks(widthBreaks, windowWidth);
    const classList: string[] = [];
    // group
    if (group && componentWidth !== '100%') classList.push(`ck-component__group--${group}`);
    // groupVertical
    if (groupVertical) classList.push(`ck-component__group-vertical--${groupVertical}`);
    return classList;
  },
  getWidthByWidthBreaks(widthBreaks, windowWidth) {
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
      let finalWidth = 0;
      realWidthBreaks.forEach((widthBreak) => {
        const [windowBreak, width] = widthBreak;
        if (windowWidth >= windowBreak) {
          finalWidth = width;
        }
      })
      return finalWidth;
    }
  },
  isColorTemplateVariable(color) {
    if (color === 'primary') return true;
    if (color === 'secondary') return true;
    if (color === 'success') return true;
    if (color === 'warning') return true;
    if (color === 'danger') return true;
    if (color === 'dark') return true;
    if (color === 'light') return true;
    return false;
  },
  isColumnDisplayed(column) {
    if (column.isDisplayed === false) return false;
    if (column.unchangeable) {
      if (column.isDisplayed === true) return true;
      return false;
    }
    return true;
  },
}; // export default