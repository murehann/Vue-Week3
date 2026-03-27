<script setup>
import '@/assets/main.css'
import BudgetHeader from './components/BudgetHeader.vue'
import BudgetAside from './components/BudgetAside.vue'
import BudgetSummary from './components/BudgetSummary.vue'
import { computed, ref } from 'vue'
import BudgetForm from './components/BudgetForm.vue'
import TransactionCards from './components/TransactionCards.vue'

const transactions = ref([])
const isFormOpen = ref(false)
const totalBalance = computed(() => {
  return transactions.value.reduce((sum, transaction) => {
    return transaction.transactionType === 'expense'
      ? sum - transaction.amount
      : sum + transaction.amount
  }, 0)
})
const incomeBalance = computed(() => {
  return transactions.value.reduce((sum, transaction) => {
    return transaction.transactionType === 'income' ? sum + transaction.amount : sum
  }, 0)
})
const expenseBalance = computed(() => {
  return transactions.value.reduce((sum, transaction) => {
    return transaction.transactionType === 'expense' ? sum + transaction.amount : sum
  }, 0)
})

const handleForm = (formData) => {
  transactions.value.push(formData)
  // isFormOpen.value = !isFormOpen.value
}
</script>

<template>
  <BudgetHeader />
  <BudgetAside />
  <BudgetSummary
    :total-balance="totalBalance"
    :is-form-open="isFormOpen"
    @form-toggle-button-pressed="isFormOpen = !isFormOpen"
  />
  <BudgetForm v-if="isFormOpen" @form-submit-button-pressed="handleForm($event)" />
  <TransactionCards :income-amount="incomeBalance" :expense-amount="expenseBalance" />
</template>

<style scoped></style>
