<script setup>
import {BaseButton} from 'murehan-ui'
import BaseModal from './BaseModal.vue'
import ProductImageList from './ProductImageList.vue'
defineEmits(['modal-close', 'navigate-details', 'add-wishlist'])
defineProps({
  product: {
    type: Object,
    required: true,
  },
  isWishlisted: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <BaseModal @modal-close="$emit('modal-close')" :title="product.title">
    <template #header>
      <div class="w-full p-2 border-b-2 border-gray-700 bg-gray-300">
        <h2 class="font-bold text-2xl">{{ product.title }}</h2>
        <p class="text-gray-600 text-sm">{{ product.brand }}</p>
      </div>
    </template>

    <template #body>
      <div class="w-full p-2 flex flex-col gap-2 bg-gray-100">
        <!-- Images -->
        <ProductImageList
          :images="product.images"
          :title="product.title"
          :image-dimensions="{ width: 32, height: 32 }"
        />

        <!-- Details -->
        <div class="flex flex-col gap-2 text-sm">
          <p class="border-b border-gray-400">
            Price: <span class="font-bold">${{ product.price }}</span>
          </p>
          <p class="border-b border-gray-400">
            Rating: <span class="font-bold">{{ product.rating }} / 5</span>
          </p>
          <p class="border-b border-gray-400">
            Return Policy: <span class="font-bold">{{ product.returnPolicy }}</span>
          </p>
          <p class="border-b border-gray-400">
            Warranty: <span class="font-bold">{{ product.warrantyInformation }}</span>
          </p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="w-full p-2 border-t-2 border-gray-700 bg-gray-100 flex justify-end gap-1">
        <BaseButton @click="$emit('navigate-details', product.id)"> Go to Details</BaseButton>
        <BaseButton @click="$emit('add-wishlist')">
          <i v-if="isWishlisted" class="pi pi-heart-fill"></i>
          <i v-else class="pi pi-heart"></i>
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
