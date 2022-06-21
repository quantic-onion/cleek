import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/MainPage.vue'),
      children: [
        {
          path: 'home', name: 'home', meta: { title: 'Home' },
          component: () => import('@/views/TheHome.vue'),
        },
        {
          path: 'button', name: 'button', meta: { title: 'Button' },
          component: () => import('@/views/ck-button/CkButtonExample.vue'),
        },
        {
          path: 'checkbox', name: 'checkbox', meta: { title: 'Checkbox' },
          component: () => import('@/views/ck-checkbox/CkCheckboxExample.vue'),
        },
        {
          path: 'chip', name: 'chip', meta: { title: 'Chip' },
          component: () => import('@/views/ck-chip/CkChipExample.vue'),
        },
        {
          path: 'div', name: 'div', meta: { title: 'div' },
          component: () => import('@/views/ck-div/CkDivExample.vue'),
        },
        {
          path: 'dropdown', name: 'dropdown', meta: { title: 'Dropdown' },
          component: () => import('@/views/ck-dropdown/CkDropdownExample.vue'),
        },
        {
          path: 'icon', name: 'icon', meta: { title: 'Icon' },
          component: () => import('@/views/ck-icon/CkIconExample.vue'),
        },
        {
          path: 'img', name: 'img', meta: { title: 'Img' },
          component: () => import('@/views/ck-img/CkImgExample.vue'),
        },
        {
          path: 'input', name: 'input', meta: { title: 'Input' },
          component: () => import('@/views/ck-input/CkInputExample.vue'),
        },
        {
          path: 'label', name: 'label', meta: { title: 'Label' },
          component: () => import('@/views/ck-label/CkLabelExample.vue'),
        },
        {
          path: 'navbar', name: 'navbar', meta: { title: 'Navbar' },
          component: () => import('@/views/ck-navbar/CkNavbarExample.vue'),
        },
        {
          path: 'notify', name: 'notify', meta: { title: 'Notify' },
          component: () => import('@/views/ck-notify/CkNotifyExample.vue'),
        },
        {
          path: 'popup', name: 'popup', meta: { title: 'Popup' },
          component: () => import('@/views/ck-popup/CkPopupExample.vue'),
        },
        {
          path: 'radio', name: 'radio', meta: { title: 'Radio' },
          component: () => import('@/views/ck-radio/CkRadioExample.vue'),
        },
        {
          path: 'select', name: 'select', meta: { title: 'Select' },
          component: () => import('@/views/ck-select/CkSelectExample.vue'),
        },
        {
          path: 'sidebar', name: 'sidebar', meta: { title: 'Sidebar' },
          component: () => import('@/views/ck-sidebar/CkSidebarExample.vue'),
        },
        {
          path: 'switch', name: 'switch', meta: { title: 'Switch' },
          component: () => import('@/views/ck-switch/CkSwitchExample.vue'),
        },
        {
          path: 'switch-options', name: 'switch-options', meta: { title: 'Switch Options' },
          component: () => import('@/views/ck-switch-options/CkSwitchOptionsExample.vue'),
        },
        {
          path: 'table', name: 'table', meta: { title: 'Table' },
          component: () => import('@/views/ck-table/CkTableExample.vue'),
        },
        {
          path: 'textarea', name: 'textarea', meta: { title: 'Textarea' },
          component: () => import('@/views/ck-textarea/CkTextareaExample.vue'),
        },
        {
          path: ':catchAll(.*)',
          redirect: '/table',
        },
      ],
    },
  ],
});

router.afterEach((to) => {
  const defaultTitle = 'Cleek';
  document.title = to.meta.title ? `${to.meta.title} | ${defaultTitle}` : defaultTitle;
});

export default router
