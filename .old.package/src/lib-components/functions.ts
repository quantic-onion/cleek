export default {
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
};