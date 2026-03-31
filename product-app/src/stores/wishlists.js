import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlists', {
  state: () => ({
    wishListStatus: {},
    products: [],
  }),

  actions: {
    addToWishList(id, title, imageLink) {
      this.wishListStatus[id] = true
      this.products.push({
        id,
        title,
        imageLink,
      })
    },

    removeFromWishList(id) {
      if (this.wishListStatus[id]) {
        delete this.wishListStatus[id]
      }

      const index = this.products.findIndex((product) => product.id === id)
      if (index !== -1) {
        this.products.splice(index, 1)
      }
    },
  },

  persist: true, // ✅ plugin handles everything
})
