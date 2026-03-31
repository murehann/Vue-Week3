import HomeView from '@/views/HomeView.vue'
import NotFound404View from '@/views/NotFound404View.vue'
import ProductView from '@/views/ProductView.vue'
import WishlistView from '@/views/WishlistView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/wishlist', component: WishlistView },
  {
    path: '/product/:id',
    component: ProductView,
    beforeEnter: async (to) => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${to.params.id}`)
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
