/**
 * This can be used as an example
 * https://github.com/vuejs/vitepress/blob/master/docs/.vitepress/config.js
*/

const path = require('path')

module.exports = {
  lang: 'en-US',
  title: 'Cleek',
  description: 'A lightweight Vue 3 component library',
  plugins: [
    {
      name: 'root-component-setup',
      clientAppRootComponentFiles: path.resolve(__dirname, './RootComponent.vue'),
    },
  ],
  themeConfig: {
    docsDir: 'docs',
    nav: [
      {
        text: 'Github',
        link: '',
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        link: '/',
      },
      {
        text: 'Testing',
        children: [
          { text: 'Altura', link: '/testing/TestSameHeight/TestSameHeight' },
        ],
      },
      {
        text: 'Components',
        children: getComponents(),
      },
    ],
  },
}

function getComponents() {
  return [
    { text: 'Button', link: '/guide/ck-button/ck-button' },
    { text: 'Checkbox', link: '/guide/ck-checkbox/ck-checkbox' },
    { text: 'Chip', link: '/guide/ck-chip/ck-chip' },
    { text: 'Dropdown', link: '/guide/ck-dropdown/ck-dropdown' },
    { text: 'Icon', link: '/guide/ck-icon/ck-icon' },
    { text: 'Img', link: '/guide/ck-img/ck-img' },
    { text: 'Input', link: '/guide/ck-input/ck-input' },
    { text: 'Label', link: '/guide/ck-label/ck-label' },
    // { text: 'Link', link: '/guide/link/link' },
    // { text: 'Modal', link: '/guide/modal/modal' },
    // { text: 'ModalManager', link: '/guide/modal-manager/modal-manager' },
    // { text: 'Progress', link: '/guide/progress/progress' },
    { text: 'Popup', link: '/guide/ck-popup/ck-popup' },
    { text: 'Radio', link: '/guide/ck-radio/ck-radio' },
    // { text: 'Router Link', link: '/guide/ck-router-link/ck-router-link' },
    { text: 'Select', link: '/guide/ck-select/ck-select' },
    // { text: 'Sidebar', link: '/guide/sidebar/sidebar' },
    // { text: 'SidebarManager', link: '/guide/sidebar-manager/sidebar-manager' },
    { text: 'Switch', link: '/guide/ck-switch/ck-switch' },
    { text: 'Switch Options', link: '/guide/ck-switch-options/ck-switch-options' },
    { text: 'Table', link: '/guide/ck-table/ck-table' },
    { text: 'Textarea', link: '/guide/ck-textarea/ck-textarea' },
    { text: 'Tooltip', link: '/guide/ck-tooltip/ck-tooltip' },
  ]
}
