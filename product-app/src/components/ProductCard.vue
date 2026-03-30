<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  product: Object,
})
</script>
<template>
  <li>
    <RouterLink
      :to="`/product/${product.id}`"
      class="p-1 m-2 border-b-3 border-r-3 border-gray-700 flex gap-2 bg-gray-100"
    >
      <div class="border-r-2 flex-1">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-50 border-b border-t border-l b"
        />
        <h3 class="font-bold">{{ product.title }}</h3>
      </div>

      <div class="flex justify-between flex-col flex-1">
        <div class="flex flex-col gap-2">
          <p class="border-b">
            Rating: <span class="font-bold"> {{ product.rating }} </span>
          </p>
          <p class="border-b">
            Price: <span class="font-bold"> {{ product.price }}$ </span>
          </p>
          <p class="border-b">
            Discount: <span class="font-bold">{{ product.discountPercentage }}%</span>
          </p>
          <p class="border-b">
            Min Order Quantity:<span class="font-bold"> {{ product.minimumOrderQuantity }}</span>
          </p>
        </div>
        <button
          class="p-1 border border-black cursor-pointer bg-amber-500"
          @click.stop="console.log('wishlist clicked')"
        >
          <!-- TODO :implement wishlist button -->
          Add to Wishlist
        </button>
      </div>
    </RouterLink>
  </li>
</template>
