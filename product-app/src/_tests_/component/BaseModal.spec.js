import BaseModal from '@/components/BaseModal.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

function createWrapper(options = {}) {
  return mount(BaseModal, {
    ...options,
  })
}

describe('BaseModal - body overflow style', () => {
  test('onMount body style is set to overflow - hidden', () => {
    const wrapper = createWrapper()

    expect(document.body.style.overflow).toBe('hidden')
  })

  test('onUnmount body style is reset to "" i.e. empty string', async () => {
    const wrapper = createWrapper()

    wrapper.unmount()

    expect(document.body.style.overflow).toBe('')
  })
})

describe('BaseModal - click behavior', () => {
  test('modal backdrop click emits modal close', async () => {
    const wrapper = createWrapper()

    await wrapper.find('[data-testid="modal-backdrop"]').trigger('click')

    expect(wrapper.emitted('modal-close')).toBeTruthy()
    expect(wrapper.emitted('modal-close')).toHaveLength(1)
  })

  test('modal card click does not emit modal-close', async () => {
    const wrapper = createWrapper()

    await wrapper.find('[data-testid="modal-card"]').trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('modal-close')
  })

  test('close button emits modal close', async () => {
    const wrapper = createWrapper()

    await wrapper.find('[data-testid="close-button"]').trigger('click')

    expect(wrapper.emitted('modal-close')).toBeTruthy()
    expect(wrapper.emitted('modal-close').length).toBe(1)
  })
})

describe('BaseModal - render', () => {
  test('renders slots in correct places', () => {
    const wrapper = createWrapper({
      slots: {
        header: '<div data-testid="header-slot">Header</div>',
        body: '<div data-testid="default-slot">Content</div>',
        footer: '<div data-testid="footer-slot">Footer</div>',
      },
    })

    expect(wrapper.find('[data-testid="header-slot"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="default-slot"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="footer-slot"]').exists()).toBe(true)
  })

  test('sets aria-label correctly', () => {
    const wrapper = createWrapper({
      props: {
        title: 'test title',
      },
    })

    const modalCardWrapper = wrapper.find('[data-testid="modal-card"]')
    expect(modalCardWrapper.attributes('aria-label')).toBe('test title')
  })
})
