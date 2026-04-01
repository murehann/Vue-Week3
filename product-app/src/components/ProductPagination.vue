<script setup>
defineProps({
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
</script>
<template>
  <nav aria-label="Pagination navigation">
    <ul class="flex gap-1">
      <li v-if="paginationData.currentPage > 1">
        <button
          class="cursor-pointer"
          @click="$emit('page-changed', paginationData.currentPage - 1)"
          aria-label="Go to previous page"
        >
          <i class="pi pi-chevron-left"></i>
        </button>
      </li>
      <li v-else class="text-gray-400">
        <button disabled aria-label="Go to previous page">
          <i class="pi pi-chevron-left"></i>
        </button>
      </li>
      <li v-for="value in totalPages" :key="value">
        <button
          class="cursor-pointer"
          :class="{ 'font-bold': paginationData.currentPage === value }"
          :aria-current="paginationData.currentPage === value ? 'page' : undefined"
          @click="$emit('page-changed', value)"
        >
          {{ value }}
        </button>
      </li>
      <li v-if="paginationData.currentPage < totalPages">
        <button
          class="cursor-pointer"
          @click="$emit('page-changed', paginationData.currentPage + 1)"
          aria-label="Go to next page"
        >
          <i class="pi pi-chevron-right"></i>
        </button>
      </li>
      <li v-else class="text-gray-400">
        <button disabled aria-label="Go to next page">
          <i class="pi pi-chevron-right"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>
