import { API_BASE_URL } from '@/config/api'

interface ProductReview {
  rating: number
  comment: string
  date: string // "2025-04-30T09:41:02.053Z"
  reviewerName: string
  reviewerEmail: string // "eleanor.collins@x.dummyjson.com"
}

interface ProductMeta {
  createdAt: string // "2025-04-30T09:41:02.053Z"
  updatedAt: string // "2025-04-30T09:41:02.053Z"
  barcode: string // "5784719087687"
  qrCode: string // "https://cdn.dummyjson.com/public/qr-code.png"
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string // "BEA-ESS-ESS-001"
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: 'In Stock' | 'Out of Stock'
  reviews: ProductReview[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: ProductMeta
  images: string[]
  thumbnail: string
}

export interface FetchProductsResponse {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: Product[]
}

export async function fetchProducts({
  page = 1,
  limit = 10,
}: {
  page: number
  limit: number
}): Promise<FetchProductsResponse> {
  const res = await fetch(`${API_BASE_URL}?_per_page=${limit}&_page=${page}`)
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
  return res.json() as Promise<FetchProductsResponse>
}

export async function fetchProductById(id: number, signal: AbortSignal): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/${id}`, { signal })
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
  const data = await res.json()
  return data as Promise<Product>
}
