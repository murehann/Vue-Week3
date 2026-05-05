<script setup lang="ts">
const variants = {
  default: 'bg-amber-500 text-black hover:bg-amber-600',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
} as const

type Variant = keyof typeof variants

const props = withDefaults(
  defineProps<{
    variant?: Variant
  }>(),
  {
    variant: 'default',
  },
)
</script>

<template>
  <button
    class="p-1 border border-black cursor-pointer flex items-center gap-1 justify-center"
    :class="variants[props.variant]"
    data-testid="base-button"
  >
    <slot>Button</slot>
  </button>
</template>
