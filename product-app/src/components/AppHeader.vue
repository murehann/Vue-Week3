<script setup></script>
<template>
  <header aria-labelledby="app-header">
    <h1 class="font-bold text-3xl text-center text-gray-600" id="app-header">Product App</h1>
    <nav class="flex gap-2 text-blue-950 justify-center text-lg" aria-label="Main navigation">
      <RouterLink to="/" class="underline">Home</RouterLink>
      <RouterLink to="/wishlist" class="underline">Wish List</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.router-link-exact-active {
  font-weight: bold;
  text-decoration: none;
}
</style>
