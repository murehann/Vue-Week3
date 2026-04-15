import BaseButton from '@/components/BaseButton.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

function createWrapper(options = {}) {
  return mount(BaseButton, {
    ...options,
  })
}

function getButton(wrapper) {
  return wrapper.find('[data-testid="base-button"]')
}

function expectClasses(element, classesString) {
  const expected = classesString.split(' ')
  expected.forEach((cls) => {
    expect(element.classes()).toContain(cls)
  })
}

describe('BaseButton', () => {
  const variants = {
    default: 'bg-amber-500 text-black hover:bg-amber-600',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  }

  test('Renders default button when no props and no slot passed', () => {
    const wrapper = createWrapper()
    const buttonElement = getButton(wrapper)

    expect(buttonElement.text()).toBe('Button')
    expectClasses(buttonElement, variants.default)
  })

  test('applies danger variant classes when variant="danger"', () => {
    const wrapper = createWrapper({
      props: {
        variant: 'danger',
      },
    })
    const buttonElement = getButton(wrapper)

    expectClasses(buttonElement, variants.danger)
  })

  test('Renders correct text when slot content provided', () => {
    const wrapper = createWrapper({
      slots: {
        default: 'ButtonText',
      },
    })
    const buttonElement = getButton(wrapper)

    expect(buttonElement.text()).toBe('ButtonText')
  })

  test('Renders default style when wrong props passed', () => {
    const wrapper = createWrapper({
      props: {
        variant: 'invalid',
      },
    })
    const buttonElement = getButton(wrapper)

    expectClasses(buttonElement, variants.default)
  })
})
