<script setup>
import { onUnmounted, ref, watch } from 'vue'
import ProductModal from './ProductModal.vue'
import { useRouter } from 'vue-router'

defineProps({
  product: Object,
})
const isProductModalOpen = ref(false)
const router = useRouter()

const handleNavigate = (id) => {
  router.push(`/product/${id}`)
}

watch(isProductModalOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
<template>
  <li>
    <div
      class="p-1 m-2 border-b-3 border-r-3 border-gray-700 flex gap-2 bg-gray-100 relative transition hover:scale-105 hover:bg-gray-200"
      :title="`Product: ${product.title}`"
    >
      <button
        @click="isProductModalOpen = true"
        class="absolute ml-1 p-1 top-0 left-0 border bg-blue-600 transition hover:scale-110 cursor-pointer"
        aria-label="Open Modal"
        title="Button: Click to preview product"
      >
        <i class="pi pi-window-maximize"></i>
      </button>
      <RouterLink
        :to="`/product/${product.id}`"
        :title="`${product.title} - click to view details`"
        class="border-r-2 flex-1 overflow-hidden bg-gray-300"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-50 border-b border-t border-l"
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
        <button
          class="p-1 border border-black cursor-pointer bg-amber-500 hover:bg-amber-600"
          title=""
          @click.stop="console.log('wishlist clicked')"
        >
          <!-- TODO :implement wishlist button -->
          Add to Wishlist
        </button>
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
        @add-wishlist="console.log('wishlist clicked')"
      />
    </Transition>
  </li>
</template>
