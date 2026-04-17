import ProductImage from '@/components/ProductImage.vue'
import ProductImageList from '@/components/ProductImageList.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

function createWrapper(options = {}) {
  return shallowMount(ProductImageList, {
    ...options,
  })
}

const testData = {
  images: ['string1', 'string2'],
  title: 'title value',
  imageDimensions: {
    width: 10,
    height: 10,
  },
}

describe('ProductImageList', () => {
  test('displays correct number of images', () => {
    const wrapper = createWrapper({
      props: testData,
    })

    const imageListItems = wrapper.findAll('[data-testid="image-list-item"]')

    expect(imageListItems).toHaveLength(testData.images.length)
  })

  test('passes correct props to ProductImage components', () => {
    const wrapper = createWrapper({
      props: testData,
    })

    const imageComponentList = wrapper.findAllComponents(ProductImage)
    imageComponentList.forEach((imageComponentWrapper, index) => {
      expect(imageComponentWrapper.props()).toMatchObject({
        srcVal: testData.images[index],
        altVal: `${testData.title} image ${index + 1}`,
      })
    })
  })

  test('sets image width and height correctly', () => {
    const wrapper = createWrapper({
      props: testData,
    })

    const imageListItems = wrapper.findAll('[data-testid="image-list-item"]')
    imageListItems.forEach((imageListItem) => {
      const listItemEl = imageListItem.element

      expect(listItemEl.style.width).toBe(testData.imageDimensions.width * 4 + 'px')
      expect(listItemEl.style.height).toBe(testData.imageDimensions.height * 4 + 'px')
    })
  })
})
