import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import WishlistView from '@/views/WishlistView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/wishlist', component: WishlistView },
  { path: '/product/:id', component: ProductView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
