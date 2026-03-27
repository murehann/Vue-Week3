<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  totalBalance: Number,
  isFormOpen: Boolean,
})
defineEmits(['form-toggle-button-pressed'])
</script>

<template>
  <section aria-label="budget-summary" class="flex justify-between items-center mb-5">
    <p class="font-bold">
      Balance:
      <span
        :class="{
          'text-[rgb(255,0,0)]': totalBalance < 0,
          'text-[rgb(0,128,0)]': totalBalance >= 0,
        }"
        >$ {{ totalBalance }}</span
      >
    </p>
    <BaseButton
      :button-text="isFormOpen ? 'Cancel' : 'Add'"
      @base-button-pressed="$emit('form-toggle-button-pressed')"
    />
  </section>
</template>
