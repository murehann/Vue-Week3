<script setup>
import BaseModal from './BaseModal.vue'
defineEmits(['modal-close', 'navigate-details', 'add-wishlist'])
defineProps({
  product: Object,
  isWishlisted: Boolean,
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
      <div class="w-full p-2 border-b-2 border-gray-700 bg-gray-300">
        <h2 class="font-bold text-2xl">{{ product.title }}</h2>
        <span class="text-gray-600 text-sm">{{ product.brand }}</span>
      </div>
    </template>

    <template #body>
      <div class="w-full p-2 flex flex-col gap-2 bg-gray-100">
        <!-- Images -->
        <div class="flex gap-2 overflow-x-auto border-b border-gray-700 pb-2">
          <img
            v-for="(img, i) in product.images"
            :key="i"
            :src="img"
            :alt="`${product.title} image ${i + 1}`"
            class="h-32 w-32 object-cover border border-gray-400 shrink-0"
          />
        </div>

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
        <button
          class="p-1 border border-black cursor-pointer bg-amber-500 hover:bg-amber-600"
          @click="$emit('navigate-details', product.id)"
        >
          Go to Details
        </button>
        <button
          class="p-1 border border-black cursor-pointer bg-amber-500 hover:bg-amber-600 flex items-center gap-1"
          @click="$emit('add-wishlist')"
        >
          <i class="pi pi-heart"></i>
          {{ isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist' }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>
