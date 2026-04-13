<script setup>
import BaseButton from './BaseButton.vue'
import ProductImage from './ProductImage.vue'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

defineEmits(['remove-clicked'])
</script>

<template>
  <ProductImage
    :src-val="product.imageLink"
    :alt-val="product.title"
    class="w-20 h-20 border border-gray-400 bg-gray-300"
  />

  <div class="flex justify-between items-end flex-1">
    <h3 class="font-bold truncate">{{ product.title }}</h3>
    <BaseButton variant="danger" @click="$emit('remove-clicked', product.id)">
      <i class="pi pi-times"></i>
      Remove
    </BaseButton>
  </div>
</template>
