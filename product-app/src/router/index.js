import HomeView from '@/views/HomeView.vue'
import NotFound404View from '@/views/NotFound404View.vue'
import ProductView from '@/views/ProductView.vue'
import WishlistView from '@/views/WishlistView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { API_BASE_URL } from '@/config/api'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/wishlist', name: 'wishlist', component: WishlistView },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductView,
    beforeEnter: async (to) => {
      try {
        const res = await fetch(`${API_BASE_URL}/${to.params.id}`, {
          method: 'HEAD',
        })
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
    component: NotFound404View,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
