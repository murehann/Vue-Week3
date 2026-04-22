<script setup>
import { computed, onMounted, ref } from 'vue'
import ProductImage from './ProductImage.vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageDimensions: {
    type: Object,
    required: true,
  },
})

const currentImgIndex = ref(0)

const slideWidth = props.imageDimensions.width * 4

const containerRef = ref(null)
const containerWidth = ref(0)

const centerOffset = computed(() => {
  return (containerWidth.value - (slideWidth + 32 * (currentImgIndex.value + 1))) / 2
}) // 32 = p-4 + gap-4, times i + 1 for each card.

const translateX = computed(() => {
  return centerOffset.value - currentImgIndex.value * slideWidth
})

function handleLeft() {
  if (currentImgIndex.value > 0) currentImgIndex.value--
}

function handleRight() {
  if (currentImgIndex.value < props.images.length - 1) currentImgIndex.value++
}

onMounted(() => {
  containerWidth.value = containerRef.value?.clientWidth || 0
})
</script>

<template>
  <div class="flex items-center gap-3 w-full p-3 bg-gray-100 border-b-2 border-gray-700">
    <button
      class="p-2 transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-default"
      :disabled="currentImgIndex === 0"
      @click="handleLeft"
    >
      <i class="pi pi-chevron-left text-gray-800"></i>
    </button>

    <div ref="containerRef" class="w-full overflow-hidden bg-gray-100 border-2 border-gray-400 p-1">
      <ul
        class="flex items-center gap-4 p-3 transition-transform duration-500 ease-out will-change-transform"
        :style="{ transform: `translate3d(${translateX}px, 0, 0)` }"
      >
        <li
          v-for="(img, i) in images"
          :key="i"
          class="shrink-0 bg-white border border-gray-700 overflow-hidden transition-transform duration-300"
          :class="{
            'scale-110 shadow-lg z-20': i === currentImgIndex,
            'scale-95 opacity-50': i !== currentImgIndex,
          }"
          :style="{
            width: imageDimensions.width * 4 + 'px',
            height: imageDimensions.height * 4 + 'px',
          }"
          data-testid="image-list-item"
        >
          <ProductImage :src-val="img" :alt-val="`${title} image ${i + 1}`" class="h-full w-full" />
        </li>
      </ul>
    </div>

    <button
      class="p-2 transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-default"
      :disabled="currentImgIndex === images.length - 1"
      @click="handleRight"
    >
      <i class="pi pi-chevron-right text-gray-800"></i>
    </button>
  </div>
</template>
