<script setup>
import { computed, ref } from 'vue'
import TransactionItem from './TransactionItem.vue'
import { useDebounce } from '@/composables/useDebounce'
const props = defineProps({
  transactions: Array,
})

defineEmits(['delete-button-pressed'])
const search = ref('')
const searchDebounceDelay = 300;
const debouncedSearch = useDebounce(search, searchDebounceDelay);

const filteredTransactions = computed(() => {
  return props.transactions.filter((t) =>
    t.title.toLowerCase().includes(debouncedSearch.value.toLowerCase()),
  )
})
</script>

<template>
  <section aria-label="transaction-list" class="border p-1">
    <input
      name="search"
      type="text"
      placeholder="Search By Title"
      id="search"
      class="bg-white w-full border p-2 rounded-sm"
      v-model="search"
    />


    <ul v-if="filteredTransactions.length" class="list-none border-t mt-2 pt-2">
      <TransactionItem
        v-for="transaction in filteredTransactions"
        :key="transaction.id"
        :transaction="transaction"
        @delete-button-pressed="$emit('delete-button-pressed', transaction.id)"
      />
    </ul>
    <p v-else class="font-bold p-1">No transactions found</p>
  </section>
</template>
