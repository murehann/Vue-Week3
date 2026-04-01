<script setup>
defineProps({
  reviews: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <h2 class="border-t-2 border-gray-700 font-bold text-lg border-b mt-2 pt-2">Reviews</h2>
  <ul class="p-2">
    <li v-for="(review, i) in reviews" :key="i" class="border-b border-gray-400 py-2">
      <p class="font-bold">
        {{ review.reviewerName }}
        <span class="font-normal text-gray-500 text-sm"
          >— {{ new Date(review.date).toLocaleDateString() }}</span
        >
      </p>
      <p class="text-sm">
        Rating: <span class="font-bold">{{ review.rating }}</span>
      </p>
      <p class="text-sm">{{ review.comment }}</p>
    </li>
  </ul>
</template>
