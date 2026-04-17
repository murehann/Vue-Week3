<script setup>
import { ref } from 'vue'
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
  // loadingType - used for lazy loading
  loadingType: {
    type: String,
    default: '',
  },
})

const imageLoadStatus = ref('loading')

function handleLoad() {
  imageLoadStatus.value = 'success'
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
      data-testid="image"
    />
    <ImageSkeleton
      v-if="imageLoadStatus === 'loading'"
      class="w-full h-full absolute top-0 left-0"
    />
    <div
      v-else-if="imageLoadStatus === 'error'"
      class="flex justify-center items-center absolute top-0 left-0 w-full h-full"
      style="container-type: size"
      data-testid="image-error"
    >
      <i class="pi pi-image text-[70cqi] text-gray-600"></i>
    </div>
  </div>
</template>
