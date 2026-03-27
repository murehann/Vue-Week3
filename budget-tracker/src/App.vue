<script setup>
import '@/assets/main.css'
import BudgetHeader from './components/BudgetHeader.vue'
import BudgetAside from './components/BudgetAside.vue'
import BudgetSummary from './components/BudgetSummary.vue'
import { ref } from 'vue'
import BudgetForm from './components/BudgetForm.vue'

const isFormOpen = ref(false)
</script>

<template>
  <BudgetHeader />
  <BudgetAside />
  <BudgetSummary
    :total-balance="-1"
    :is-form-open="isFormOpen"
    @form-button-pressed="isFormOpen = !isFormOpen"
  />
  <BudgetForm v-if="isFormOpen" />
</template>

<style scoped></style>
