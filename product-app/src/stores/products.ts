import { type Product, fetchProducts } from '@/api/products'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: (): {
    products: Product[]
    currentPage: number
    total: number
    isLoading: boolean
    error: null | string
  } => ({
    products: [],
    currentPage: -1, // keeps track of current currentPage offset (pagination page num), so only fetch again if different currentPage offset
    total: 0,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProducts(
      force: boolean = false,
      page: number = 1,
      limit: number = 10,
    ): Promise<void> {
      if (page === this.currentPage && !force) return

      this.isLoading = true
      this.error = null

      try {
        const data = await fetchProducts({ page, limit })
        this.products = data.data
        this.total = data.items
        this.currentPage = page
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch products'
      } finally {
        this.isLoading = false
      }
    },
  },
})
