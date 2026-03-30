<script setup>
import { computed } from 'vue';
import BaseButton from './BaseButton.vue'

const props = defineProps({
  transaction: Object,
})
const isExpense = computed(() => props.transaction.transactionType === 'expense')
defineEmits(['delete-button-pressed'])
</script>
<template>
  <li
    class="border-l-4 border-r-4 mb-3 bg-white"
    :class="
      isExpense ? 'border-[rgb(255,0,0)]' : 'border-[rgb(0,128,0)]'
    "
  >
    <p class="flex justify-between p-3 font-bold">
      <span>{{ transaction.title }}</span>
      <span
        :class="
          isExpense ? 'text-[rgb(255,0,0)]' : 'text-[rgb(0,128,0)]'
        "
      >
        $ {{ transaction.amount }}
      </span>
    </p>
    <div class="flex p-3 justify-between">
      <p>{{ transaction.description }}</p>
      <BaseButton
        variant="danger"
        @click="$emit('delete-button-pressed')"
      >Delete</BaseButton>
    </div>
  </li>
</template>
