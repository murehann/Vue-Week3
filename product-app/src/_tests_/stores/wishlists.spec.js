import { useWishlistStore } from '@/stores/wishlists'
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'

test('sample', () => {
  expect(2).toBe(2)
})

describe('Wishlists Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const testData = {
    id: 1,
    title: 'Title',
    imageLink: 'link',
  }

  test('adds product to wishlist', () => {
    const store = useWishlistStore()
    expect(store.products.length).toBe(0)

    store.addToWishList(testData.id, testData.title, testData.imageLink)

    expect(store.products.length).toBe(1)
    expect(store.products[0]).toEqual(testData)
  })

  test('doesnt add product to wihslist if already in wishlist', () => {
    const store = useWishlistStore()

    store.addToWishList(testData.id, testData.title, testData.imageLink)
    store.addToWishList(testData.id, testData.title, testData.imageLink)
    expect(store.products.length).toBe(1)
  })
})
