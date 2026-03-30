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
  <h2 class="text-2xl font-bold">Product List</h2>
  <div v-if="productStore.error">Error: {{ productStore.error }}</div>
  <div v-else-if="productStore.isLoading">Loading...</div>
  <div v-else>
    <ProductPagination
      :paginationData="paginationData"
      :totalPages="totalPages"
      @page-changed="handleChangePage"
    />
    <ul aria-label="product list">
      <ProductCard v-for="product in productStore.products" :key="product.id" :product="product" />
    </ul>
    <ProductPagination
      :paginationData="paginationData"
      :totalPages="totalPages"
      @page-changed="handleChangePage"
    />
  </div>
</template>
