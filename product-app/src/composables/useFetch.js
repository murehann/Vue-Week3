import { ref } from 'vue'

export function useFetch(fetchFunction) {
  const data = ref(null)
  const error = ref('')
  const isLoading = ref(false)

  const execute = async () => {
    isLoading.value = true
    error.value = ''

    try {
      const res = await fetchFunction()
      data.value = res
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, execute }
}
