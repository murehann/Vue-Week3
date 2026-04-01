<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex gap-2 overflow-x-auto border-b-2 border-gray-700 bg-gray-300 p-2">
    <img
      v-for="(img, i) in images"
      :key="i"
      :src="img"
      :alt="`${title} image ${i + 1}`"
      class="h-48 w-48 object-cover border bg-white border-gray-400 shrink-0"
    />
  </div>
</template>
