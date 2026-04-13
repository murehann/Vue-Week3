<script setup>
import { onMounted, ref } from 'vue'
import ImageSkeleton from './ImageSkeleton.vue'

defineProps({
  srcVal: {
    type: String,
    default: '',
  },
  altVal: {
    type: String,
    default: '',
  },
  loadingType: {
    type: String,
    default: '',
  },
})

const imgRef = ref(null)
const imageLoadStatus = ref('loading')

onMounted(() => {
  if (imgRef.value?.complete) {
    imageLoadStatus.value = 'success'
    imageLoadStatus.value = 'loading'
  }
})

function handleLoad() {
  setTimeout(() => {
    imageLoadStatus.value = 'error'
  }, 1000)
  setTimeout(() => {
    imageLoadStatus.value = 'success'
  }, 2000)
}
</script>

<template>
  <div class="relative">
    <img
      :src="srcVal"
      :alt="altVal"
      :loading="loadingType"
      :class="imageLoadStatus === 'success' ? 'visible' : 'invisible'"
      class="h-full w-full"
      @load="handleLoad"
      @error="imageLoadStatus = 'error'"
      ref="imgRef"
    />
    <ImageSkeleton
      v-if="imageLoadStatus === 'loading'"
      class="w-full h-full absolute top-0 left-0"
    />
    <div
      v-else-if="imageLoadStatus === 'error'"
      class="flex justify-center items-center absolute top-0 left-0 w-full h-full"
      style="container-type: size"
    >
      <i class="pi pi-image text-[70cqi] text-gray-600"></i>
    </div>
  </div>
</template>
