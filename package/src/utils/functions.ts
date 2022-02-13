export default {
  // getGroupClass
  // isColorTemplateVariable
  // isColumnDisplayed
  // getCleekOptions

  getGroupClass({ group = '', groupVertical = '', groupBreak = '' } = {}) {
    const _screenSize = '';
    if (groupBreak && groupBreak === _screenSize) return [];
    const classList: string[] = [];
    // group
    if (group) classList.push(`ck-component__group--${group}`);
    // groupVertical
    if (groupVertical) classList.push(`ck-component__group-vertical--${groupVertical}`);
    return classList;
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
    return true;
  },
  getCleekOptions(getCurrentInstance) {
    return getCurrentInstance().appContext.app.config.globalProperties.$cleekOptions;
  },
}; // export default