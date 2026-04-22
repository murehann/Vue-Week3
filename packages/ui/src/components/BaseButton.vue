<script setup>
defineProps({
  variant: {
    type: String,
    default: "default",
  },
});
// const variants = {
//   default: "bg-amber-500 text-black hover:bg-amber-600",
//   danger: "bg-red-500 hover:bg-red-600 text-white",
// };
const variants = {
  default: "btn-default",
  danger: "btn-danger",
};
</script>

<template>
  <button
  :class="variants[variant] ?? variants.default"
  data-testid="base-button"
  class="base-btn"
  >
  <!-- :style="variants[variant] ?? variants.default" -->
    <!-- class="p-1 border border-black cursor-pointer flex items-center gap-1 justify-center" -->
    <slot>Button</slot>
  </button>
</template>

<style scoped>
.base-btn {
  padding: 4px;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.btn-default {
  background-color: #f59e0b; /* amber-500 */
  color: black;
}

.btn-default:hover {
  background-color: #d97706; /* amber-600 */
}

.btn-danger {
  background-color: #ef4444; /* red-500 */
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626; /* red-600 */
}
</style>
