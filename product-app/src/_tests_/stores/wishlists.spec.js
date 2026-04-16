import { useWishlistStore } from '@/stores/wishlists'
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'

describe('Wishlists Store', () => {
  const testData = {
    id: 1,
    title: 'Title',
    imageLink: 'link',
  }

  const testData2 = {
    id: 2,
    title: 'Title2',
    imageLink: 'link2',
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('isWishlisted', () => {
    test('returns true if product is in wishlist', () => {
      const store = useWishlistStore()
      store.$patch({ products: [testData] })

      expect(store.isWishListed(testData.id)).toBe(true)
    })

    test('returns false if product is not in wishlist', () => {
      const store = useWishlistStore()
      store.$patch({ products: [testData2] })

      expect(store.isWishListed(testData.id)).toBe(false)
    })
  })

  describe('addToWishlist', () => {
    test('adds product to wishlist', () => {
      const store = useWishlistStore()

      store.addToWishList(testData.id, testData.title, testData.imageLink)

      expect(store.products.length).toBe(1)
      expect(store.products[0]).toEqual(testData)
    })

    test('adds multiple products to wishlist', () => {
      const store = useWishlistStore()

      store.addToWishList(testData.id, testData.title, testData.imageLink)
      store.addToWishList(testData2.id, testData2.title, testData2.imageLink)

      expect(store.products.length).toBe(2)
      expect(store.products[0]).toEqual(testData)
      expect(store.products[1]).toEqual(testData2)
    })

    test('doesnt add product to wishlist if already in wishlist', () => {
      const store = useWishlistStore()

      store.addToWishList(testData.id, testData.title, testData.imageLink)
      store.addToWishList(testData.id, testData.title, testData.imageLink)

      expect(store.products.length).toBe(1)
      expect(store.products[0]).toEqual(testData)
    })
  })

  describe('removeFromWishlist', () => {
    test('removes correct product if exists in wishlist', () => {
      const store = useWishlistStore()
      store.$patch({ products: [testData, testData2] })

      store.removeFromWishList(testData.id)

      expect(store.products.length).toBe(1)
      expect(store.isWishListed(testData.id)).toBe(false)
      expect(store.isWishListed(testData2.id)).toBe(true)
    })

    test('does nothing if product not in wishlist', () => {
      const store = useWishlistStore()
      store.$patch({ products: [testData, testData2] })

      store.removeFromWishList(testData.id + testData2.id)

      expect(store.isWishListed(testData.id)).toBe(true)
      expect(store.isWishListed(testData2.id)).toBe(true)
    })
  })
})
