import { createRouter, createWebHistory } from 'vue-router'
import { API_BASE_URL } from '@/config/api'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('@/views/WishlistView.vue'),
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('@/views/ProductView.vue'),
    beforeEnter: async (to) => {
      try {
        const res = await fetch(`${API_BASE_URL}/${to.params.id}`)
        if (res.status === 404) {
          return { name: 'not-found' }
        }
      } catch (error) {
        return { name: 'not-found' }
      }
    },
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound404View.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
