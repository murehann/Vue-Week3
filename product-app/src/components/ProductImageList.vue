<script setup>
import ProductImage from './ProductImage.vue'

defineProps({
  images: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageDimensions: Object,
})
</script>

<template>
  <ul class="flex gap-2 overflow-x-auto border-b-2 border-gray-700 bg-gray-300 p-2">
    <li
      class="bg-white border-r border-b border-gray-500 relative shrink-0"
      :style="{
        width: imageDimensions.width * 4 + 'px',
        height: imageDimensions.height * 4 + 'px',
      }"
      v-for="(img, i) in images"
      :key="i"
    >
      <ProductImage :src-val="img" :alt-val="`${title} image ${i + 1}`" />
    </li>
  </ul>
</template>
