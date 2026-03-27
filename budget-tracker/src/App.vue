<script setup>
import '@/assets/main.css'
import BudgetHeader from './components/BudgetHeader.vue'
import BudgetAside from './components/BudgetAside.vue'
import BudgetSummary from './components/BudgetSummary.vue'
import { computed, onMounted, ref, watch } from 'vue'
import BudgetForm from './components/BudgetForm.vue'
import TransactionCards from './components/TransactionCards.vue'
import TransactionList from './components/TransactionList.vue'

const transactions = ref([])

const isFormOpen = ref(false)
const balances = computed(() => {
  return transactions.value.reduce(
    (acc, t) => {
      if (t.transactionType === 'income') {
        acc.income += t.amount
        acc.total += t.amount
      } else if (t.transactionType === 'expense') {
        acc.expense += t.amount
        acc.total -= t.amount
      }
      return acc
    },
    {
      income: 0,
      expense: 0,
      total: 0,
    },
  )
})

const handleForm = (formData) => {
  transactions.value.push(formData)
  isFormOpen.value = !isFormOpen.value
}

const handleDelete = (id) => {
  const index = transactions.value.findIndex((t) => t.id === id)

  if (index !== -1) {
    transactions.value.splice(index, 1)
  }
}

onMounted(() => {
  const saved = localStorage.getItem('transactions')
  if (saved) {
    try {
      transactions.value = JSON.parse(saved)
    } catch (error) {
      console.error('Error parsing transactions', error)
      transactions.value = []
    }
  }
})

watch(
  transactions,
  (newVal) => {
    localStorage.setItem('transactions', JSON.stringify(newVal))
  },
  { deep: true },
)
</script>

<template>
  <BudgetHeader />
  <BudgetAside />
  <BudgetSummary
    :total-balance="balances.total"
    :is-form-open="isFormOpen"
    @form-toggle-button-pressed="isFormOpen = !isFormOpen"
  />

  <BudgetForm v-if="isFormOpen" @form-submit-button-pressed="handleForm($event)" />

  <TransactionCards :income-amount="balances.income" :expense-amount="balances.expense" />

  <TransactionList :transactions="transactions" @delete-button-pressed="handleDelete($event)" />
</template>

<style scoped></style>
