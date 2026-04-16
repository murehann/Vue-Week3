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

const testData = [{ id: 1 }, { id: 2 }, { id: 3 }]

describe('WislistList - render', () => {
  test('renders no data text when wishlist is empty', () => {
    const wrapper = createWrapper({}, { products: [] })

    const messageElement = wrapper.find('[data-testid="empty-msg"]')
    const wishlistListElement = wrapper.find('[data-testid="wishlist-list"]')

    expect(messageElement.exists()).toBe(true)
    expect(wishlistListElement.exists()).toBe(false)
  })

  test('renders wishlist list when data in wishlist', () => {
    const wrapper = createWrapper({}, { products: testData })

    const messageElement = wrapper.find('[data-testid="empty-msg"]')
    expect(messageElement.exists()).toBe(false)

    const wishlistListElement = wrapper.find('[data-testid="wishlist-list"]')
    expect(wishlistListElement.exists()).toBe(true)
  })

  test('renders correct number of product cards', () => {
    const wrapper = createWrapper({}, { products: testData })
    expect(wrapper.findAll('[data-testid="wishlist-item"]').length).toBe(testData.length)
  })

  test('renders product cards with correct props', () => {
    const wrapper = createWrapper({}, { products: testData })
    wrapper.findAllComponents(WishlistCard).forEach((card, index) => {
      expect(card.props('product')).toEqual(testData[index])
    })
  })
})

describe('WishlistList - behavior', () => {
  test('calls removeFromWishList with correct id when WishlistCard emits remove-clicked', () => {
    const wrapper = createWrapper({}, { products: testData })
    const store = useWishlistStore()

    const cardList = wrapper.findAllComponents(WishlistCard)

    cardList[0].vm.$emit('remove-clicked', testData[0].id)
    cardList[2].vm.$emit('remove-clicked', testData[2].id)

    expect(store.removeFromWishList).toHaveBeenCalledTimes(2)
    expect(store.removeFromWishList).toHaveBeenNthCalledWith(1, testData[0].id)
    expect(store.removeFromWishList).toHaveBeenNthCalledWith(2, testData[2].id)
  })
})
