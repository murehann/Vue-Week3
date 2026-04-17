<script setup>
import { onMounted, onUnmounted } from 'vue'

defineEmits(['modal-close'])
defineProps({
  title: {
    type: String,
    default: 'Overlay',
  },
})

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center bg-[rgba(100,100,100,0.5)]"
    @click="$emit('modal-close')"
    data-testid="modal-backdrop"
  >
    <div
      class="relative m-5 border-2 border-black w-full max-w-lg bg-[rgba(55,55,55,0.9)] cursor-default overflow-y-auto max-h-[90vh]"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @click.stop
      data-testid="modal-card"
    >
      <button
        class="absolute top-0 right-0 px-3 py-1 text-red-500 transition hover:bg-red-500 hover:text-white cursor-pointer z-10"
        @click="$emit('modal-close')"
        aria-label="Close modal"
        data-testid="close-button"
      >
        <i class="pi pi-times"></i>
      </button>
      <slot name="header"></slot>
      <slot name="body"></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
