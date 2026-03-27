<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  transaction: Object,
})

defineEmits(['delete-button-pressed'])
</script>
<template>
  <li
    class="border-l-4 border-r-4 mb-3 bg-white"
    :class="
      transaction.transactionType === 'expense' ? 'border-[rgb(255,0,0)]' : 'border-[rgb(0,128,0)]'
    "
  >
    <p class="flex justify-between p-3 font-bold">
      <span>{{ transaction.title }}</span>
      <span
        :class="
          transaction.transactionType === 'expense' ? 'text-[rgb(255,0,0)]' : 'text-[rgb(0,128,0)]'
        "
      >
        $ {{ transaction.amount }}
      </span>
    </p>
    <div class="flex p-3 justify-between">
      <p>{{ transaction.description }}</p>
      <BaseButton
        button-text="Delete"
        variant="danger"
        @base-button-pressed="$emit('delete-button-pressed')"
      />
    </div>
  </li>
</template>
