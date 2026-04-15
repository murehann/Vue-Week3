import BaseButton from '@/components/BaseButton.vue'
import ProductImage from '@/components/ProductImage.vue'
import WishlistCard from '@/components/WishlistCard.vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, test } from 'vitest'

function createWrapper(options = {}) {
  return mount(WishlistCard, {
    ...options,
  })
}

const productProps = {
  title: 'Card Title',
  imageLink: 'randomLink',
  id: 23,
}

describe('WishlistCard - render', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper({
      props: {
        product: productProps,
      },
    })
  })

  test('renders product title in heading', () => {
    const wrapper = createWrapper({
      props: {
        product: productProps,
      },
    })
    const headingElement = wrapper.find('[data-testid="card-heading"]')

    expect(headingElement.text()).toBe(productProps.title)
  })

  test('sets image components src-val to imageLink and alt-val to title', () => {
    const imageComponent = wrapper.findComponent(ProductImage)

    expect(imageComponent.props('srcVal')).toBe(productProps.imageLink)
    expect(imageComponent.props('altVal')).toBe(productProps.title)
  })

  test('displays a basebutton component with variant danger', () => {
    const buttonComponent = wrapper.findComponent(BaseButton)

    expect(buttonComponent.props('variant')).toBe('danger')
  })
})

describe('WishlistCard - actions', () => {
  test("emits remove-clicked event with passed prop's id on single button press", async () => {
    const wrapper = createWrapper({
      props: {
        product: productProps,
      },
    })

    const buttonElement = wrapper.find('[data-testid="card-button"]')

    await buttonElement.trigger('click')

    const removeClickEvent = wrapper.emitted('remove-clicked')

    expect(removeClickEvent).toHaveLength(1)
    expect(removeClickEvent[0]).toEqual([productProps.id])
  })
})
