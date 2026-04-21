import { API_BASE_URL } from '@/config/api'

export async function fetchProducts({ page = 1, limit = 10 }) {
  const res = await fetch(`${API_BASE_URL}?_per_page=${limit}&_page=${page}`)
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
  return res.json()
}

export async function fetchProductById(id, signal) {
  const res = await fetch(`${API_BASE_URL}/${id}`, { signal })
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
  const data = await res.json()
  return data
}
