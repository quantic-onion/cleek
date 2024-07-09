import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/home-view/HomeView.vue'),
        },
      ],
    },
    {
      path: '/playground',
      name: 'Playground',
      component: () => import('@/views/playground-view/PlaygroundView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: () => {
        return '/';
      },
    },
  ],
});

export default router;
