<script setup>
import { computed, ref } from 'vue'
import ProductModal from './ProductModal.vue'
import { useRouter } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlists'
import BaseButton from './BaseButton.vue'
import ProductImage from './ProductImage.vue'

const { product } = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const isProductModalOpen = ref(false)
const router = useRouter()
const wishlistStore = useWishlistStore()
const isWishlisted = computed(() => {
  return wishlistStore.isWishListed(product.id)
})

const handleNavigate = () => {
  router.push(`/product/${product.id}`)
}

const handleWishlistClick = () => {
  if (!isWishlisted.value) {
    wishlistStore.addToWishList(product.id, product.title, product.thumbnail)
  } else {
    wishlistStore.removeFromWishList(product.id)
  }
}
</script>
<template>
  <div
    class="p-1 m-2 border-b-3 border-r-3 border-gray-700 flex gap-2 bg-gray-100 relative transition hover:scale-105 hover:bg-gray-200"
    :title="`Product: ${product.title}`"
  >
    <RouterLink
      :to="`/product/${product.id}`"
      :title="`${product.title} - click to view details`"
      class="border-r-2 flex-1 overflow-hidden bg-gray-300"
    >
      <ProductImage
        :src-val="product.thumbnail"
        :alt-val="product.title"
        :loading-type="'lazy'"
        class="border-b border-t border-l mr-1"
      />

      <h3 class="font-bold truncate">{{ product.title }}</h3>
    </RouterLink>

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

      <BaseButton @click.stop="handleWishlistClick">
        <i v-if="isWishlisted" class="pi pi-heart-fill"></i>
        <i v-else class="pi pi-heart"></i>
      </BaseButton>
    </div>
  </div>

  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="scale-0 opacity-0"
    enter-to-class="scale-100 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="scale-100 opacity-100"
    leave-to-class="scale-0 opacity-0"
  >
    <ProductModal
      v-if="isProductModalOpen"
      @modal-close="isProductModalOpen = false"
      :product="product"
      @navigate-details="handleNavigate"
      @add-wishlist="handleWishlistClick"
      :isWishlisted="isWishlisted"
    />
  </Transition>
</template>
