import { fetchProductById } from '@/api/products'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductDetailsStore = defineStore('product-details', () => {
  const currentProduct = ref(null)
  const loading = ref(false)
  const error = ref('')

  let controller = null

  async function fetchProduct(id) {
    controller?.abort()

    controller = new AbortController()
    const signal = controller.signal

    loading.value = true
    error.value = ''

    try {
      const data = await fetchProductById(id, signal)
      currentProduct.value = data
    } catch (err) {
      if (err.name === 'AbortError') return
      error.value = err?.message || 'something went wrong'
    } finally {
      if (!signal.aborted) loading.value = false
      if (controller?.signal === signal) controller = null
    }
  }

  function clearProduct() {
    if (controller) controller.abort()

    currentProduct.value = null
    error.value = ''
    loading.value = false
  }

  function fetchRelatedProducts() {
    // TODO: for later
  }

  return {
    currentProduct,
    loading,
    error,
    fetchProduct,
    clearProduct,
    fetchRelatedProducts,
  }
})
