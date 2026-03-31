<script setup>
import BaseModal from './BaseModal.vue'
defineEmits(['modal-close', 'navigate-details', 'add-wishlist'])
defineProps({
  product: Object,
})
</script>

<template>
  <BaseModal @click="$emit('modal-close')">
    <template #default>
      <button
        class="absolute top-0 right-0 px-3 py-1 text-red-500 transition hover:bg-red-500 hover:text-white cursor-pointer z-10"
        @click="$emit('modal-close')"
        aria-label="Close modal"
      >
        <i class="pi pi-times"></i>
      </button>
    </template>

    <template #header>
      <div class="w-full p-4 border-b border-gray-500">
        <h2 class="text-white font-bold text-2xl" id="product-title">{{ product.title }}</h2>
        <span class="text-gray-300 text-sm">{{ product.brand }}</span>
      </div>
    </template>

    <template #body>
      <div class="w-full p-4 flex flex-col gap-4">
        <!-- Images -->
        <div class="flex gap-2 overflow-x-auto">
          <img
            v-for="(img, i) in product.images"
            :key="i"
            :src="img"
            :alt="`${product.title} image ${i + 1}`"
            class="h-32 w-32 object-cover border border-gray-500 shrink-0"
          />
        </div>

        <!-- Details -->
        <div class="flex flex-col gap-2 text-white text-sm">
          <p class="border-b border-gray-500 pb-1">
            Price: <span class="font-bold text-amber-400">${{ product.price }}</span>
          </p>
          <p class="border-b border-gray-500 pb-1">
            Rating: <span class="font-bold">{{ product.rating }} / 5</span>
          </p>
          <p class="border-b border-gray-500 pb-1">
            Return Policy: <span class="font-bold">{{ product.returnPolicy }}</span>
          </p>
          <p class="border-b border-gray-500 pb-1">
            Warranty: <span class="font-bold">{{ product.warrantyInformation }}</span>
          </p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="w-full p-4 border-t border-gray-500 flex justify-end gap-1">
        <button
          class="px-4 py-1 bg-amber-500 hover:bg-amber-600 cursor-pointer text-black font-bold"
          @click="$emit('navigate-details')"
        >
          Go to Details
        </button>
        <button
          class="px-4 py-1 bg-amber-500 hover:bg-amber-600 cursor-pointer text-black font-bold flex items-center gap-1"
          @click="$emit('add-wishlist')"
        >
          <i class="pi pi-heart"></i>
          Add to wishlist
        </button>
      </div>
    </template>
  </BaseModal>
</template>
