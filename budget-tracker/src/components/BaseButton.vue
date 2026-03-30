<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
})

const variantStyles = {
  primary: 'bg-[rgb(0,0,255)] border-[rgb(0,0,255)] hover:text-[rgb(0,0,255)]',
  danger: 'bg-[rgb(255,0,0)] border-[rgb(255,0,0)] hover:text-[rgb(255,0,0)]',
}
</script>

<template>
  <button
    :class="[
      'py-1 px-4 text-white font-bold border cursor-pointer hover:bg-white',
      variantStyles[variant],
    ]"
  >
    <slot></slot>
  </button>
</template>
