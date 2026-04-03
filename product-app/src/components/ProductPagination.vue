<script setup>
import { computed } from 'vue'

const paginationProps = defineProps({
  paginationData: {
    type: Object,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})
defineEmits(['page-changed'])

const paginationArray = computed(() => {
  const total = paginationProps.totalPages
  const current = paginationProps.paginationData.currentPage

  if (total <= 10) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages = []

  // first page
  pages.push(1)

  // claculate left and right values
  let left = current - 2
  let right = current + 2

  // left edge
  if (left <= 2) {
    left = 2
    right = 6
  }

  // right edge
  if (right >= total - 1) {
    right = total - 1
    left = total - 5
  }

  // left dots
  if (left > 2) {
    pages.push('...')
  }

  // middle pages (5)
  for (let i = left; i <= right; i++) {
    pages.push(i)
  }

  // right dots
  if (right < total - 1) {
    pages.push('...')
  }

  // last page
  pages.push(total)

  return pages
})
</script>
<template>
  <nav aria-label="Pagination navigation">
    <ul class="flex gap-1">
      <li v-if="paginationData.currentPage > 1">
        <button
          class="cursor-pointer px-2 py-1 transition hover:text-blue-800 hover:scale-120"
          @click="$emit('page-changed', paginationData.currentPage - 1)"
          aria-label="Go to previous page"
        >
          <i class="pi pi-chevron-left"></i>
        </button>
      </li>
      <li v-else class="text-gray-400 px-2 py-1">
        <button disabled aria-label="Go to previous page">
          <i class="pi pi-chevron-left"></i>
        </button>
      </li>
      <li v-for="(value, index) in paginationArray" :key="index">
        <span v-if="value === '...'">. . .</span>
        <button
          v-else
          class="cursor-pointer px-2 py-1 hover:text-blue-800 hover:scale-120"
          :class="{ 'font-bold': paginationData.currentPage === value }"
          :aria-current="paginationData.currentPage === value ? 'page' : undefined"
          @click="$emit('page-changed', value)"
        >
          {{ value }}
        </button>
      </li>
      <li v-if="paginationData.currentPage < totalPages">
        <button
          class="cursor-pointer px-2 py-1 hover:text-blue-800 hover:scale-120"
          @click="$emit('page-changed', paginationData.currentPage + 1)"
          aria-label="Go to next page"
        >
          <i class="pi pi-chevron-right"></i>
        </button>
      </li>
      <li v-else class="text-gray-400 px-2 py-1">
        <button disabled aria-label="Go to next page">
          <i class="pi pi-chevron-right"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>
