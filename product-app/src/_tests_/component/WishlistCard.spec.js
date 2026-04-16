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

let wrapper

beforeEach(() => {
  wrapper = createWrapper({
    props: {
      product: productProps,
    },
  })
})

describe('WishlistCard - render', () => {
  test('renders product title in heading', () => {
    const headingElement = wrapper.find('[data-testid="card-heading"]')

    expect(headingElement.text()).toBe(productProps.title)
  })

  test('renders product thumbnail', () => {
    const imageElement = wrapper.find('[data-testid="card-image"]')

    expect(imageElement.exists()).toBe(true)
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
  test('emits remove-clicked event once on button click', async () => {
    const buttonElement = wrapper.find('[data-testid="card-button"]')
    await buttonElement.trigger('click')
    expect(wrapper.emitted('remove-clicked')).toHaveLength(1)
  })

  test('emits remove-clicked with the product id on button click', async () => {
    const buttonElement = wrapper.find('[data-testid="card-button"]')
    await buttonElement.trigger('click')
    expect(wrapper.emitted('remove-clicked')[0]).toEqual([productProps.id])
  })
})
