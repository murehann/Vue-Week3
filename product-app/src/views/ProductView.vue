<script setup>
import { fetchProductById } from '@/api/products'
import ProductDetail from '@/components/ProductDetail.vue'
import ProductImageList from '@/components/ProductImageList.vue'
import ProductReview from '@/components/ProductReview.vue'
import { useFetch } from '@/composables/useFetch'
import { useWishlistStore } from '@/stores/wishlists'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data, error, isLoading, execute } = useFetch(() => {
  return fetchProductById(route.params.id)
})
execute()

const wishlistStore = useWishlistStore()
const isWishlisted = computed(() => {
  return wishlistStore.isWishListed(Number(route.params.id))
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
    <ProductImages :images="data.images" :title="data.title" />

    <ProductDetail :data="data" :is-wishlisted="isWishlisted" @wishlist-click="handleWishlist" />

    <ProductReview :reviews="data.reviews" />
  </div>
</template>
