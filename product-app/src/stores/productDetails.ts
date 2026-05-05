import { type Product, fetchProductById } from '@/api/products'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductDetailsStore = defineStore('product-details', () => {
  const currentProduct = ref<null | Product>(null)
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  let controller: null | AbortController = null

  async function fetchProduct(id: string): Promise<void> {
    controller?.abort()

    controller = new AbortController()
    const signal: AbortSignal = controller.signal

    loading.value = true
    error.value = ''

    try {
      const data: Product = await fetchProductById(id, signal)
      currentProduct.value = data
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      error.value = err instanceof Error ? err.message : 'something went wrong'
    } finally {
      if (!signal.aborted) loading.value = false
      if (controller?.signal === signal) controller = null
    }
  }

  function clearProduct(): void {
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
