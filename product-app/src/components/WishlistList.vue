<script setup>
import { useWishlistStore } from '@/stores/wishlists'
import WishlistCard from './WishlistCard.vue'

const wishlistStore = useWishlistStore()
const handleRemoveClick = (id) => {
  wishlistStore.removeFromWishList(id)
}
</script>

<template>
  <div class="m-4">
    <h2 class="font-bold text-2xl border-b-2 border-gray-700 pb-2 mb-4">Wishlist</h2>

    <p
      v-if="wishlistStore.products.length === 0"
      class="border-b-3 border-r-3 border-gray-700 bg-gray-100 p-4 text-gray-600"
      data-testid="empty-msg"
    >
      Your wishlist is empty.
    </p>

    <ul
      v-else
      class="flex flex-col gap-2"
      aria-label="Wishlist Product List"
      data-testid="wishlist-list"
    >
      <li
        v-for="product in wishlistStore.products"
        :key="product.id"
        class="border-b-3 border-r-3 border-gray-700 bg-gray-100 flex gap-2 p-1"
        data-testid="wishlist-item"
      >
        <WishlistCard :product="product" @remove-clicked="handleRemoveClick" />
      </li>
    </ul>
  </div>
</template>
