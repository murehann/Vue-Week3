<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  product: Object,
})
</script>
<template>
  <li>
    <RouterLink :to="`/product/${product.id}`">
      <img :src="product.thumbnail" :alt="product.title" />
      <h3 class="font-bold">{{ product.title }}</h3>
    </RouterLink>
    <p>rating: {{ product.rating }}</p>
    <p>price: {{ product.price }}$</p>
    <p>discount: {{ product.discountPercentage }}%</p>
    <p>Min Order quantity: {{ product.minimumOrderQuantity }}</p>
    <button
      class="p-1 border border-black cursor-pointer hover:bg-amber-500"
      @click.stop="console.log('wishlist clicked')"
    >
      <!-- TODO :implement wishlist button -->
      Wishlist
    </button>
  </li>
</template>
