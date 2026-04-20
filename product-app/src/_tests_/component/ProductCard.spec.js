import BaseButton from '@/components/BaseButton.vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductImage from '@/components/ProductImage.vue'
import ProductModal from '@/components/ProductModal.vue'
import { routes } from '@/router'
import { useWishlistStore } from '@/stores/wishlists'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { createRouter, createWebHistory, RouterLink } from 'vue-router'

const productTestData = {
  id: 2,
  title: 'Eyeshadow Palette with Mirror',
  price: 19.99,
  discountPercentage: 18.19,
  rating: 2.86,
  brand: 'Glamour Beauty',
  warrantyInformation: '1 year warranty',
  returnPolicy: '7 days return policy',
  minimumOrderQuantity: 20,
  thumbnail: '/backend_data/images/2/thumbnail.webp',
  images: ['/backend_data/images/2/images/1.webp'],
}

let router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

function createWrapper(options = {}, initialState = {}) {
  return mount(ProductCard, {
    ...options,
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            wishlists: { products: [], ...initialState },
          },
        }),
        router,
      ],
    },
  })
}

beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  })

  router.push('/')
  await router.isReady()
})

describe('Product Card - render', () => {
  test('product card title is passed product title', () => {
    const wrapper = createWrapper({
      props: {
        product: productTestData,
      },
    })

    expect(wrapper.get('[data-testid="product-card-title"]').attributes('title')).toContain(
      productTestData.title,
    )
  })

  describe('RouterLink', () => {
    test('RouterLink is passed correct props', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })

      const routerLinkWrapper = wrapper.findComponent(RouterLink)

      expect(routerLinkWrapper.props('to')).toBe(`/product/${productTestData.id}`)
      expect(routerLinkWrapper.attributes('title')).toContain(productTestData.title)
    })

    test('Product Image is passed correct props', () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })

      const productImageWrapper = wrapper.findComponent(ProductImage)

      expect(productImageWrapper.props('altVal')).toContain(productTestData.title)
      expect(productImageWrapper.props('srcVal')).toBe(productTestData.thumbnail)
    })

    test('link heading is passed product title', () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })

      expect(wrapper.find('[data-testid="link-header"]').text()).toContain(productTestData.title)
    })
  })

  test('product rating is passed correct data', () => {
    const wrapper = createWrapper({
      props: {
        product: productTestData,
      },
    })

    expect(wrapper.get('[data-testid="product-rating"]').text()).toContain(productTestData.rating)
  })

  test('product price is passed correct data', () => {
    const wrapper = createWrapper({
      props: {
        product: productTestData,
      },
    })

    expect(wrapper.get('[data-testid="product-price"]').text()).toContain(productTestData.price)
  })

  test('product discount is passed correct data', () => {
    const wrapper = createWrapper({
      props: {
        product: productTestData,
      },
    })

    expect(wrapper.get('[data-testid="product-discount"]').text()).toContain(
      productTestData.discountPercentage,
    )
  })

  test('product minOrderQuantity is passed correct data', () => {
    const wrapper = createWrapper({
      props: {
        product: productTestData,
      },
    })

    expect(wrapper.get('[data-testid="product-minOrderQty"]').text()).toContain(
      productTestData.minimumOrderQuantity,
    )
  })

  describe('Wishlist button - render', () => {
    test('renders heart fill icon if isWishlisted', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })
      const store = useWishlistStore()
      store.$patch({
        products: [
          {
            id: 2,
          },
        ],
      })
      await nextTick()

      expect(wrapper.find('[data-testid="heart-fill"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="heart-hollow"]').exists()).toBe(false)
    })

    test('renders heart hollow icon if isWishlisted is false', () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })

      expect(wrapper.find('[data-testid="heart-fill"]').exists()).toBe(false)
      expect(wrapper.find('[data-testid="heart-hollow"]').exists()).toBe(true)
    })
  })

  describe('product modal', () => {
    test('correct product data is passed', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })
      wrapper.vm.isProductModalOpen = true
      await nextTick()

      const productModalWrapper = wrapper.findComponent(ProductModal)

      expect(productModalWrapper.props('product')).toMatchObject(productTestData)
    })

    test('isWislisted is passed correct', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })
      wrapper.vm.isProductModalOpen = true
      await nextTick()

      const productModalWrapper = wrapper.findComponent(ProductModal)

      expect(productModalWrapper.props('isWishlisted')).toBe(false)
    })

    test('initially product modal does not exist', () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })

      expect(wrapper.findComponent(ProductModal).exists()).toBe(false)
    })
  })
})

describe('Product Card - behavior', () => {
  describe('wishlist button click triggers correct wishlist store function', () => {
    test('if iswishlisted true - removeFromWishlist called with correct id', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })
      const store = useWishlistStore()
      store.$patch({
        products: [
          {
            id: 2,
          },
        ],
      })
      await nextTick()

      const wishListbuttonWrapper = wrapper.findComponent(BaseButton)
      await wishListbuttonWrapper.trigger('click')

      expect(store.removeFromWishList).toHaveBeenCalledTimes(1)
      expect(store.removeFromWishList).toHaveBeenCalledWith(productTestData.id)
    })

    test('if iswishlisted false - addToWishlist called with correct data', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })
      const store = useWishlistStore()

      const wishListbuttonWrapper = wrapper.findComponent(BaseButton)
      await wishListbuttonWrapper.trigger('click')

      expect(store.addToWishList).toHaveBeenCalledTimes(1)
      expect(store.addToWishList).toHaveBeenCalledWith(
        productTestData.id,
        productTestData.title,
        productTestData.thumbnail,
      )
    })
  })

  describe('product modal', () => {
    test('Product Modal opens when preview button clicked', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })

      await wrapper.find('[data-testid="preview-button"]').trigger('click')

      expect(wrapper.findComponent(ProductModal).exists()).toBe(true)
    })

    test('Product Modal closes when modal-close emitted', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })
      wrapper.vm.isProductModalOpen = true
      await nextTick()

      const productModalWrapper = wrapper.findComponent(ProductModal)
      productModalWrapper.vm.$emit('modal-close')
      await nextTick()

      expect(productModalWrapper.exists()).toBe(false)
    })

    test('navigates to /product/:id when navigate-details emitted', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })
      wrapper.vm.isProductModalOpen = true
      await nextTick()

      const productModalWrapper = wrapper.findComponent(ProductModal)
      const routerPushSpy = vi.spyOn(router, 'push')

      productModalWrapper.vm.$emit('navigate-details')
      expect(routerPushSpy).toHaveBeenCalledTimes(1)
      expect(routerPushSpy).toHaveBeenCalledWith(`/product/${productTestData.id}`)
    })

    test('handle wishlist is called when add-wishlist emitted', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })

      const handleWishlistSpy = vi.spyOn(wrapper.vm, 'handleWishlistClick')

      wrapper.vm.isProductModalOpen = true
      await nextTick()

      const productModalWrapper = wrapper.findComponent(ProductModal)

      productModalWrapper.vm.$emit('add-wishlist')

      await nextTick()

      expect(handleWishlistSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('handlewishlist click', () => {
    test('adds to wishlist when add-wishlist emitted from modal', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })
      const store = useWishlistStore()

      wrapper.vm.isProductModalOpen = true
      await nextTick()

      const productModalWrapper = wrapper.findComponent(ProductModal)
      productModalWrapper.vm.$emit('add-wishlist')
      await nextTick()

      expect(store.addToWishList).toHaveBeenCalledTimes(1)
      expect(store.addToWishList).toHaveBeenCalledWith(
        productTestData.id,
        productTestData.title,
        productTestData.thumbnail,
      )
    })

    test('removes from wishlist when add-wishlist emitted from modal and already wishlisted', async () => {
      const wrapper = createWrapper({
        props: {
          product: productTestData,
        },
      })
      const store = useWishlistStore()
      store.$patch({
        products: [{ id: 2 }],
      })
      await nextTick()

      wrapper.vm.isProductModalOpen = true
      await nextTick()

      const productModalWrapper = wrapper.findComponent(ProductModal)
      productModalWrapper.vm.$emit('add-wishlist')
      await nextTick()

      expect(store.removeFromWishList).toHaveBeenCalledTimes(1)
      expect(store.removeFromWishList).toHaveBeenCalledWith(productTestData.id)
    })
  })
})
