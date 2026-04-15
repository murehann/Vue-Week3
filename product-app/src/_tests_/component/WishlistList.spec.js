import WishlistList from '@/components/WishlistList.vue'
import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

import { useWishlistStore } from '@/stores/wishlists'
import WishlistCard from '@/components/WishlistCard.vue'

function createWrapper(options = {}, initialState = {}) {
  return shallowMount(WishlistList, {
    ...options,
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            wishlists: { products: [], ...initialState },
          },
        }),
      ],
    },
  })
}

describe('WislistList - render', () => {
  test('renders no data text when wislist is empty', () => {
    const wrapper = createWrapper({}, { products: [] })

    const messageElement = wrapper.find('[data-testid="empty-msg"]')
    expect(messageElement.text()).toBe('Your wishlist is empty.')

    const wishlistListElement = wrapper.find('[data-testid="wishlist-list"]')
    expect(wishlistListElement.exists()).toBe(false)
  })

  test("renders Wishlist Card for each item in wishlists store's product state with correct props", () => {
    const testData = [{ id: 1 }, { id: 2 }]
    const wrapper = createWrapper({}, { products: testData })

    const messageElement = wrapper.find('[data-testid="empty-msg"]')
    expect(messageElement.exists()).toBe(false)

    const wishlistListElement = wrapper.find('[data-testid="wishlist-list"]')
    expect(wishlistListElement.exists()).toBe(true)
    const wishlistCardComponents = wrapper.findAllComponents(WishlistCard)

    expect(wishlistCardComponents.length).toBe(testData.length)
    wishlistCardComponents.forEach((cardComponent, index) => {
      expect(cardComponent.props('product')).toEqual(testData[index])
    })
  })
})

describe('WishlistList - behavior', () => {
  test('calls removeFromWishList with correct id when WishlistCard emits remove-clicked', () => {
    const testData = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const wrapper = createWrapper({}, { products: testData })
    const store = useWishlistStore()

    const cardList = wrapper.findAllComponents(WishlistCard)
    // cardList.forEach((cardComponent) => {
    //   cardComponent.vm.$emit('remove-clicked', cardComponent.props('product').id)
    // })

    // expect(store.removeFromWishList).toHaveBeenCalledTimes(testData.length)
    // testData.forEach((product, index) => {
    //   expect(store.removeFromWishList).toHaveBeenNthCalledWith(index + 1, product.id)
    // })

    cardList[0].vm.$emit('remove-clicked', testData[0].id)
    cardList[2].vm.$emit('remove-clicked', testData[2].id)

    expect(store.removeFromWishList).toHaveBeenCalledTimes(2)
    expect(store.removeFromWishList).toHaveBeenNthCalledWith(1, testData[0].id)
    expect(store.removeFromWishList).toHaveBeenNthCalledWith(2, testData[2].id)
  })
})
