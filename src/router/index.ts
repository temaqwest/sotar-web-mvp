import { createRouter, createWebHistory } from 'vue-router'
import { AppLayoutsEnum } from '@/layouts/layouts.types'
import { RoutePaths } from '@/router/router.types'
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RoutePaths.home,
      meta: {
        requiresAuth: true,
        layout: AppLayoutsEnum.dashboard,
      },
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: RoutePaths.about,
      meta: {
        requiresAuth: true,
        layout: AppLayoutsEnum.default,
      },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/auth',
      name: RoutePaths.auth,
      meta: {
        requiresAuth: false,
        layout: AppLayoutsEnum.auth,
      },
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/profile',
      name: RoutePaths.profile,
      meta: {
        requiresAuth: true,
        layout: AppLayoutsEnum.dashboard,
      },
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/teams',
      name: RoutePaths.teams,
      meta: {
        requiresAuth: true,
        layout: AppLayoutsEnum.dashboard,
      },
      component: () => import('../views/TeamsView.vue'),
    },
    {
      path: '/events',
      name: RoutePaths.events,
      meta: {
        requiresAuth: true,
        layout: AppLayoutsEnum.dashboard,
      },
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/search',
      name: RoutePaths.search,
      meta: {
        requiresAuth: true,
        layout: AppLayoutsEnum.dashboard,
      },
      component: () => import('../views/HomeView.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  if (!localStorage.getItem('isLogged') && to.meta.requiresAuth) {
    return { name: 'auth' }
  }
})

router.beforeEach(loadLayoutMiddleware)

export default router
