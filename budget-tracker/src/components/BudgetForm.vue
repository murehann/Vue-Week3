<script setup>
import { reactive, ref } from 'vue'
import BaseButton from './BaseButton.vue'

const emit = defineEmits(['form-submit-button-pressed'])

const formData = reactive({
  title: '',
  amount: null,
  description: '',
  transactionType: 'expense',
})

const errors = ref([])

function validateForm() {
  errors.value = []

  if (formData.title.length < 3) {
    errors.value.push('Title: must be atleast 3 characters')
  } else if (formData.title.length > 50) {
    errors.value.push('Title: must be at most 50 characters')
  }

  if (formData.amount < 0) {
    errors.value.push('Amount: Only positive value allowed')
  }

  if (formData.transactionType !== 'expense' && formData.transactionType !== 'income') {
    errors.value.push('Transaction type: must be either expense or income')
  }

  if (formData.description.length < 3) {
    errors.value.push('Description: must be at least 3 characters')
  } else if (formData.description.length > 200) {
    errors.value.push('Description: must be at most 200 characters')
  }

  if (errors.value.length === 0) {
    emit('form-submit-button-pressed', { ...formData, id: Date.now() })
  }
}
</script>

<template>
  <form class="grid gap-3 p-3 grid-cols-3 mb-5 border border-black" @submit.prevent="validateForm">
    <input
      placeholder="Title"
      type="text"
      id="title"
      name="title"
      required
      class="col-span-2 border p-1"
      v-model.trim="formData.title"
    />

    <input
      placeholder="Amount"
      type="number"
      id="amount"
      name="amount"
      required
      class="border p-1"
      v-model.number="formData.amount"
    />

    <textarea
      placeholder="Description"
      required
      name="description"
      id="description"
      class="border col-span-2 p-1 row-span-2 resize-none text-sm"
      v-model.trim="formData.description"
    ></textarea>

    <div class="row-span-2 flex flex-wrap items-center justify-start">
      <div class="flex gap-1">
        <input
          type="radio"
          id="expense"
          value="expense"
          name="transactionType"
          required
          v-model="formData.transactionType"
        />
        <label for="expense">Expense</label>
      </div>

      <div class="flex gap-1">
        <input
          type="radio"
          id="income"
          value="income"
          name="transactionType"
          v-model="formData.transactionType"
        />
        <label for="income">Income</label>
      </div>
    </div>

    <BaseButton
      class="col-span-full"
      type="submit"
    >Add Transaction</BaseButton>
    <ul
      id="formErrorsList"
      class="text-sm text-[rgb(255,0,0)] font-bold col-span-full list-none pl-0"
    >
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </form>
</template>
