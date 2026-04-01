<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

defineEmits(['remove-clicked'])
</script>

<template>
  <div>
    <img
      :src="product.imageLink"
      :alt="product.title"
      class="w-20 h-20 object-cover border border-gray-400 bg-gray-300"
    />

    <div class="flex justify-between items-center flex-1">
      <h3 class="font-bold truncate">{{ product.title }}</h3>
      <BaseButton variant="danger" @click="$emit('remove-clicked', product.id)">
        <i class="pi pi-times"></i>
        Remove
      </BaseButton>
    </div>
  </div>
</template>
