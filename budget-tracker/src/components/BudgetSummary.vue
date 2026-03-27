<script setup>
defineProps({
  totalBalance: Number,
  isFormOpen: Boolean,
})
defineEmits(['form-button-pressed'])
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
    <button
      @click="$emit('form-button-pressed')"
      id="formToggleButton"
      class="py-1 px-4 text-white font-bold bg-[rgb(0,0,255)] border border-[rgb(0,0,255)] cursor-pointer hover:bg-white hover:text-[rgb(0,0,255)]"
    >
      {{ isFormOpen ? 'Cancel' : 'Add' }}
    </button>
  </section>
</template>
