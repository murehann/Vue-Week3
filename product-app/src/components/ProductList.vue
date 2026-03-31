<script setup>
import { useProductStore } from '@/stores/products'
import { computed, reactive, watch } from 'vue'
import ProductCard from './ProductCard.vue'
import ProductPagination from './ProductPagination.vue'

const productStore = useProductStore()
const paginationData = reactive({
  currentPage: 1,
  perPage: 10,
})
const totalPages = computed(() => {
  return Math.ceil(productStore.total / paginationData.perPage)
})

const handleChangePage = (pageNumber) => {
  paginationData.currentPage = pageNumber
}

watch(
  () => paginationData.currentPage,
  () => {
    productStore.fetchProducts(
      false,
      (paginationData.currentPage - 1) * paginationData.perPage,
      paginationData.perPage,
    )
  },
  { immediate: true },
)
</script>
<template>
  <h2 class="text-2xl font-bold mt-2 pl-2 text-center m-2 p-2 border-b border-t">Product List</h2>
  <div v-if="productStore.isLoading" class="text-[rgb(0,0,255)] font-bold m-2">Loading...</div>
  <div v-else-if="productStore.error" class="text-[rgb(255,0,0)] font-bold m-2">
    Error: {{ productStore.error }}
  </div>

  <div v-else class="m-2">
    <ProductPagination
      :paginationData="paginationData"
      :totalPages="totalPages"
      @page-changed="handleChangePage"
      class="flex justify-center"
    />
    <ul
      aria-label="product list"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black p-2"
    >
      <ProductCard v-for="product in productStore.products" :key="product.id" :product="product" />
    </ul>
    <ProductPagination
      :paginationData="paginationData"
      :totalPages="totalPages"
      @page-changed="handleChangePage"
      class="flex justify-center mb-2"
    />
  </div>
</template>
