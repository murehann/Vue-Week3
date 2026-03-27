<script setup>
defineProps({
  incomeAmount: Number,
  expenseAmount: Number,
})
</script>

<template>
  <ul aria-label="transaction cards" class="flex gap-2 list-none mb-5">
    <li class="flex-1 bg-white p-4 rounded-md">
      <p class="flex justify-between font-bold">
        <span>Income</span><span class="text-[rgb(0,128,0)]">$ {{ incomeAmount }}</span>
      </p>
    </li>
    <li class="flex-1 bg-white p-4 rounded-md">
      <p class="flex justify-between font-bold">
        <span>Expense</span><span class="text-[rgb(255,0,0)]">$ {{ expenseAmount }}</span>
      </p>
    </li>
  </ul>
</template>
