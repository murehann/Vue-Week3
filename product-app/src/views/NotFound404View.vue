<template>
  <div
    class="m-4 border-b-3 border-r-3 border-gray-700 bg-gray-100 max-w-md mx-auto mt-20 p-8 text-center"
  >
    <h1 class="font-bold text-6xl border-b-2 border-gray-700 pb-4">404</h1>
    <p class="font-bold text-xl mt-4">Page Not Found</p>
    <p class="text-gray-600 text-sm mt-2 border-b border-gray-400 pb-4">
      The page you are looking for does not exist.
    </p>
    <RouterLink
      to="/"
      class="inline-block mt-4 p-1 border border-black bg-amber-500 hover:bg-amber-600 font-bold"
    >
      Go Home
    </RouterLink>
  </div>
</template>
