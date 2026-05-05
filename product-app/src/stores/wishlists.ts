import { defineStore } from 'pinia'

export interface Wishlist {
  id: string
  title: string
  imageLink: string
}

export const useWishlistStore = defineStore('wishlists', {
  state: (): {
    products: Wishlist[]
  } => ({
    products: [],
  }),

  getters: {
    isWishListed:
      (state) =>
      (id: string): boolean => {
        return state.products.some((product) => product.id === id)
      },
  },

  actions: {
    addToWishList(id: string, title: string, imageLink: string): void {
      if (!this.isWishListed(id)) {
        this.products.push({
          id,
          title,
          imageLink,
        })
      }
    },

    removeFromWishList(id: string): void {
      const index = this.products.findIndex((product) => product.id === id)
      if (index !== -1) {
        this.products.splice(index, 1)
      }
    },
  },

  persist: true,
})
