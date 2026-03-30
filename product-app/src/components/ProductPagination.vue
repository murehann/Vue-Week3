<script setup>
defineProps({
  paginationData: Object,
  totalPages: Number,
})
defineEmits(['page-changed'])
</script>
<template>
  <nav aria-label="pagination">
    <ul class="flex gap-1">
      <li v-if="paginationData.currentPage > 1">
        <button
          class="cursor-pointer"
          @click="$emit('page-changed', paginationData.currentPage - 1)"
        >
          &lt;
        </button>
      </li>
      <li v-else class="text-gray-400"><button disabled>&lt;</button></li>
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
        >
          &gt;
        </button>
      </li>
      <li v-else class="text-gray-400" disabled><button>&gt;</button></li>
    </ul>
  </nav>
</template>
