import { createRouter, createWebHashHistory } from 'vue-router';

const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
  ],
});

export default routes;
