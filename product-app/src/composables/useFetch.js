import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref('')
  const isLoading = ref(true)

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      return res.json()
    })
    .then((resData) => {
      data.value = resData
    })
    .catch((err) => {
      error.value = err.message
    })
    .finally(() => {
      isLoading.value = false
    })

  return { data, error, isLoading }
}
