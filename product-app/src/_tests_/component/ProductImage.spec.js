import ImageSkeleton from '@/components/ImageSkeleton.vue'
import ProductImage from '@/components/ProductImage.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

function createWrapper(options = {}) {
  return shallowMount(ProductImage, {
    ...options,
  })
}

const testData = {
  srcVal: 'imagepath',
  altVal: 'alt value',
  loadingType: 'lazy',
}

describe('ProductImage - UI', () => {
  describe('Initial state of component when mounted and image is loading', () => {
    test('imageLoadStatus is set to "loading"', () => {
      const wrapper = createWrapper()
      const imageLoadStatus = wrapper.vm.imageLoadStatus

      expect(imageLoadStatus).toBe('loading')
    })

    test('loader is shown', () => {
      const wrapper = createWrapper()

      const loadSkeletonWrapper = wrapper.findComponent(ImageSkeleton)

      expect(loadSkeletonWrapper.exists()).toBe(true)
    })

    test('error icon is not shown', () => {
      const wrapper = createWrapper()

      const errorWrapper = wrapper.find('[data-testid="image-error"]')
      expect(errorWrapper.exists()).toBe(false)
    })

    test('image display set to invisible', () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      expect(imageWrapper.classes('invisible')).toBe(true)
      expect(imageWrapper.classes('visible')).toBe(false)
    })
  })

  describe('on image load', () => {
    test('imageLoadStatus is set to "success"', async () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      await imageWrapper.trigger('load')

      const imageLoadStatus = wrapper.vm.imageLoadStatus
      expect(imageLoadStatus).toBe('success')
    })

    test('loader is not shown', async () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      await imageWrapper.trigger('load')

      const loadSkeletonWrapper = wrapper.findComponent(ImageSkeleton)
      expect(loadSkeletonWrapper.exists()).toBe(false)
    })

    test('error icon is not shown', async () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      await imageWrapper.trigger('load')

      const errorWrapper = wrapper.find('[data-testid="image-error"]')
      expect(errorWrapper.exists()).toBe(false)
    })

    test('image display set to visible', async () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      await imageWrapper.trigger('load')

      expect(imageWrapper.classes('invisible')).toBe(false)
      expect(imageWrapper.classes('visible')).toBe(true)
    })
  })

  describe('on image loading error', () => {
    test('imageLoadStatus set to "error"', async () => {
      const wrapper = createWrapper()

      await wrapper.find('[data-testid="image"]').trigger('error')

      const imageLoadStatus = wrapper.vm.imageLoadStatus
      expect(imageLoadStatus).toBe('error')
    })

    test('loader is not shown', async () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      await imageWrapper.trigger('error')

      const loadSkeletonWrapper = wrapper.findComponent(ImageSkeleton)
      expect(loadSkeletonWrapper.exists()).toBe(false)
    })

    test('error icon is shown', async () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      await imageWrapper.trigger('error')

      const errorWrapper = wrapper.find('[data-testid="image-error"]')
      expect(errorWrapper.exists()).toBe(true)
    })

    test('image display set to invisible', async () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      await imageWrapper.trigger('error')

      expect(imageWrapper.classes('invisible')).toBe(true)
      expect(imageWrapper.classes('visible')).toBe(false)
    })
  })
})

describe('Product Image - Props', () => {
  describe('When no props passed', () => {
    test('src attribute of image is set to "" i.e. empty string', () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      expect(imageWrapper.attributes('src')).toBe('')
    })

    test('alt attribute of image is set to "" i.e. empty string', () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      expect(imageWrapper.attributes('alt')).toBe('')
    })

    test('loading attribute of image is set to "" i.e. empty string', () => {
      const wrapper = createWrapper()

      const imageWrapper = wrapper.find('[data-testid="image"]')
      expect(imageWrapper.attributes('loading')).toBe('')
    })
  })

  describe('When props passed', () => {
    test('src attribute of image is set to srcVal', () => {
      const wrapper = createWrapper({
        props: testData,
      })

      const imageWrapper = wrapper.find('[data-testid="image"]')
      expect(imageWrapper.attributes('src')).toBe(testData.srcVal)
    })

    test('alt attribute of image is set to altVal', () => {
      const wrapper = createWrapper({
        props: testData,
      })

      const imageWrapper = wrapper.find('[data-testid="image"]')
      expect(imageWrapper.attributes('alt')).toBe(testData.altVal)
    })

    test('loading attribute of image is set to props.loadingType', () => {
      const wrapper = createWrapper({
        props: testData,
      })

      const imageWrapper = wrapper.find('[data-testid="image"]')
      expect(imageWrapper.attributes('loading')).toBe(testData.loadingType)
    })
  })
})
