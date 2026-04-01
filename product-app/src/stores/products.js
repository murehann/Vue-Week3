import { API_BASE_URL } from '@/config/api'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    currentSkip: -1, // keeps track of current skip offset (pagination page num), so only fetch again if different skip offset
    total: 0,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProducts(force = false, skip = 0, limit = 20) {
      if (skip === this.currentSkip && !force) return

      this.isLoading = true
      this.error = null

      try {
        const response = await fetch(`${API_BASE_URL}?limit=${limit}&skip=${skip}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        this.products = data.products
        this.total = data.total
        this.currentSkip = skip
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
  },
})
