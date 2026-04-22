<script setup>
import {BaseButton} from 'murehan-ui'

defineProps({
  data: {
    type: Object,
    required: true,
  },
  isWishlisted: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['wishlist-click'])
</script>

<template>
  <div class="flex gap-4 p-2">
    <!-- Left: main info -->
    <div class="flex flex-col gap-2 flex-1 border-r-2 border-gray-700">
      <h1 class="font-bold text-2xl">{{ data.title }}</h1>
      <p class="text-gray-600 text-sm border-b pb-2">{{ data.description }}</p>
      <p class="border-b"><span class="font-bold">Brand:</span> {{ data.brand }}</p>
      <p class="border-b"><span class="font-bold">Category:</span> {{ data.category }}</p>
      <p class="border-b"><span class="font-bold">SKU:</span> {{ data.sku }}</p>
      <p class="border-b"><span class="font-bold">Tags:</span> {{ data.tags.join(', ') }}</p>
    </div>

    <!-- Right: pricing & details -->
    <div class="flex flex-col gap-3 justify-between flex-1">
      <div class="flex flex-col gap-2">
        <p class="border-b">
          Price: <span class="font-bold">${{ data.price }}</span>
        </p>
        <p class="border-b">
          Discount: <span class="font-bold">{{ data.discountPercentage }}%</span>
        </p>
        <p class="border-b">
          Rating: <span class="font-bold">{{ data.rating }}</span>
        </p>
        <p class="border-b">
          Stock: <span class="font-bold">{{ data.stock }}</span>
        </p>
        <p class="border-b">
          Min Order: <span class="font-bold">{{ data.minimumOrderQuantity }}</span>
        </p>
        <p class="border-b">
          Availability: <span class="font-bold">{{ data.availabilityStatus }}</span>
        </p>
        <p class="border-b">
          Shipping: <span class="font-bold">{{ data.shippingInformation }}</span>
        </p>
        <p class="border-b">
          Return Policy: <span class="font-bold">{{ data.returnPolicy }}</span>
        </p>
        <p class="border-b">
          Warranty: <span class="font-bold">{{ data.warrantyInformation }}</span>
        </p>
      </div>

      <BaseButton @click="$emit('wishlist-click')">
        {{ isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist' }}
      </BaseButton>
    </div>
  </div>
</template>
