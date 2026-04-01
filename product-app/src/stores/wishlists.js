import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlists', {
  state: () => ({
    products: [],
  }),

  getters: {
    isWishListed: (state) => (id) => {
      return state.products.some((product) => product.id === id)
    },
  },

  actions: {
    addToWishList(id, title, imageLink) {
      if (!this.isWishListed(id)) {
        this.products.push({
          id,
          title,
          imageLink,
        })
      }
    },

    removeFromWishList(id) {
      const index = this.products.findIndex((product) => product.id === id)
      if (index !== -1) {
        this.products.splice(index, 1)
      }
    },
  },

  persist: true,
})
