<script setup>
import { useFetch } from '@/composables/useFetch'
import { useWishlistStore } from '@/stores/wishlists'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data, error, isLoading } = useFetch(`https://dummyjson.com/product/${route.params.id}`)
const wishlistStore = useWishlistStore()
const isWishlisted = computed(() => {
  return wishlistStore.wishListStatus[route.params.id] || false
})

const handleWishlist = () => {
  if (!isWishlisted.value) {
    wishlistStore.addToWishList(data.value.id, data.value.title, data.value.thumbnail)
  } else {
    wishlistStore.removeFromWishList(data.value.id)
  }
}
</script>
<template>
  <div v-if="isLoading" class="text-blue-500 font-bold m-4">Loading...</div>
  <div v-else-if="error" class="text-red-500 font-bold m-4">{{ error }}</div>
  <div
    v-else
    class="m-4 border-b-3 border-r-3 border-l-3 border-gray-700 bg-gray-100 max-w-4xl mx-auto"
  >
    <!-- Images -->
    <div class="flex gap-2 overflow-x-auto border-b-2 border-gray-700 bg-gray-300 p-2">
      <img
        v-for="(img, i) in data.images"
        :key="i"
        :src="img"
        :alt="`${data.title} image ${i + 1}`"
        class="h-48 w-48 object-cover border bg-white border-gray-400 shrink-0"
      />
    </div>

    <div class="flex gap-4 p-2">
      <!-- Left: main info -->
      <div class="flex flex-col gap-2 flex-1 border-r-2 border-gray-700">
        <h1 class="font-bold text-2xl">{{ data.title }}</h1>
        <p class="text-gray-600 text-sm border-b pb-2">{{ data.description }}</p>
        <p class="border-b"><span class="font-bold">Brand:</span> {{ data.brand }}</p>
        <p class="border-b"><span class="font-bold">Category:</span> {{ data.category }}</p>
        <p class="border-b"><span class="font-bold">SKU:</span> {{ data.sku }}</p>
        <p class="border-b"><span class="font-bold">Tags:</span> {{ data.tags.join(', ') }}</p>
      </div>

      <!-- Right: pricing & details -->
      <div class="flex flex-col justify-between flex-1">
        <div class="flex flex-col gap-2">
          <p class="border-b">
            Price: <span class="font-bold">${{ data.price }}</span>
          </p>
          <p class="border-b">
            Discount: <span class="font-bold">{{ data.discountPercentage }}%</span>
          </p>
          <p class="border-b">
            Rating: <span class="font-bold">{{ data.rating }}</span>
          </p>
          <p class="border-b">
            Stock: <span class="font-bold">{{ data.stock }}</span>
          </p>
          <p class="border-b">
            Min Order: <span class="font-bold">{{ data.minimumOrderQuantity }}</span>
          </p>
          <p class="border-b">
            Availability: <span class="font-bold">{{ data.availabilityStatus }}</span>
          </p>
          <p class="border-b">
            Shipping: <span class="font-bold">{{ data.shippingInformation }}</span>
          </p>
          <p class="border-b">
            Return Policy: <span class="font-bold">{{ data.returnPolicy }}</span>
          </p>
          <p class="border-b">
            Warranty: <span class="font-bold">{{ data.warrantyInformation }}</span>
          </p>
        </div>

        <button
          class="p-1 border border-black cursor-pointer bg-amber-500 hover:bg-amber-600 mt-2 flex items-center gap-1 justify-center"
          @click="handleWishlist"
        >
          <i class="pi pi-heart"></i>
          {{ isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist' }}
        </button>
      </div>
    </div>

    <!-- Reviews -->
    <div class="border-t-2 border-gray-700 p-2">
      <h2 class="font-bold text-lg border-b mb-2">Reviews</h2>
      <div v-for="(review, i) in data.reviews" :key="i" class="border-b border-gray-400 py-2">
        <p class="font-bold">
          {{ review.reviewerName }}
          <span class="font-normal text-gray-500 text-sm"
            >— {{ new Date(review.date).toLocaleDateString() }}</span
          >
        </p>
        <p class="text-sm">
          Rating: <span class="font-bold">{{ review.rating }}</span>
        </p>
        <p class="text-sm">{{ review.comment }}</p>
      </div>
    </div>
  </div>
</template>
