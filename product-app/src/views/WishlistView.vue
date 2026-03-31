<script setup>
import { useWishlistStore } from '@/stores/wishlists'

const wishlistStore = useWishlistStore()
const handleRemoveClick = (id) => {
  wishlistStore.removeFromWishList(id)
}
</script>
<template>
  <div class="m-4">
    <h1 class="font-bold text-2xl border-b-2 border-gray-700 pb-2 mb-4">Wishlist</h1>

    <div
      v-if="wishlistStore.products.length === 0"
      class="border-b-3 border-r-3 border-gray-700 bg-gray-100 p-4 text-gray-600"
    >
      Your wishlist is empty.
    </div>

    <ul v-else class="flex flex-col gap-2">
      <li
        v-for="product in wishlistStore.products"
        :key="product.id"
        class="border-b-3 border-r-3 border-gray-700 bg-gray-100 flex gap-2 p-1"
      >
        <img
          :src="product.imageLink"
          :alt="product.title"
          class="w-20 h-20 object-cover border border-gray-400 bg-gray-300"
        />

        <div class="flex justify-between items-center flex-1">
          <h3 class="font-bold truncate">{{ product.title }}</h3>
          <button
            class="p-1 border border-black cursor-pointer bg-red-500 hover:bg-red-600 text-white shrink-0"
            @click="handleRemoveClick(product.id)"
          >
            <i class="pi pi-times"></i>
            Remove
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
