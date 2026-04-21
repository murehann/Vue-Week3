<script setup>
import ProductDetail from '@/components/ProductDetail.vue'
import ProductImageList from '@/components/ProductImageList.vue'
import ProductReview from '@/components/ProductReview.vue'
import { useProductDetailsStore } from '@/stores/productDetails'
import { useWishlistStore } from '@/stores/wishlists'
import { storeToRefs } from 'pinia'
import { computed, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productDetailStore = useProductDetailsStore()

const { currentProduct: data, error, loading: isLoading } = storeToRefs(productDetailStore)

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

watch(
  () => route.params.id,
  () => {
    productDetailStore.fetchProduct(Number(route.params.id))
  },
  { immediate: true },
)

onUnmounted(() => {
  productDetailStore.clearProduct()
})
</script>
<template>
  <div class="flex justify-center px-3">
    <RouterLink
      class="underline text-md text-gray-800 hover:text-gray-800 hover:font-bold transition-all"
      :to="`/product/${Number(route.params.id) + 1}`"
      >Next Product</RouterLink
    >
  </div>
  <div v-if="isLoading" class="text-blue-500 font-bold m-4">Loading...</div>
  <div v-else-if="error" class="text-red-500 font-bold m-4">{{ error }}</div>
  <div
    v-else
    class="m-4 border-b-3 border-r-3 border-l-3 border-gray-700 bg-gray-100 max-w-4xl mx-auto"
  >
    <ProductImageList
      :images="data.images"
      :title="data.title"
      :image-dimensions="{ width: 50, height: 50 }"
    />

    <ProductDetail :data="data" :is-wishlisted="isWishlisted" @wishlist-click="handleWishlist" />

    <ProductReview :reviews="data.reviews" />
  </div>
</template>
