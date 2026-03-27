<script setup>
import { ref, reactive, onMounted } from 'vue'

const isLoading = ref(false)
const quote = reactive({ quoteText: 'text', quoteAuthor: 'author' })

onMounted(async () => {
  isLoading.value = true

  try {
    let res = await fetch('https://dummyjson.com/quotes/random')
    let data = await res.json()

    quote.quoteText = data.quote
    quote.quoteAuthor = data.author
  } catch (error) {
    console.error('Error fetching quote', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <aside aria-label="quote" class="bg-[#e8f4fd] p-3 mb-5 text-sm">
    <blockquote class="font-bold" v-if="isLoading">
      <p class="mb-1 text-[rgb(0,100,0)]">Loading...</p>
      <cite class="text-[rgb(3,177,3)]"> Loading... </cite>
    </blockquote>

    <blockquote class="font-bold" v-else>
      <p class="mb-1 text-[rgb(0,0,139)]">
        {{ quote.quoteText }}
      </p>
      <cite class="text-[rgb(0,0,255)]">{{ quote.quoteAuthor }} </cite>
    </blockquote>
  </aside>
</template>
