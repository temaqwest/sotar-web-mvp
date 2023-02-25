import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresAuth: true,
      },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      meta: {
        requiresAuth: false,
      },
      component: () => import('../views/AuthView.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  if (!localStorage.getItem('isLogged') && to.meta.requiresAuth) {
    return { name: 'auth' }
  }
})

export default router
