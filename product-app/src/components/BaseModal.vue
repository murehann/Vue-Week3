<script setup></script>
<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-center bg-[rgba(100,100,100,0.5)] cursor-pointer"
    role="dialog"
    aria-modal="true"
    aria-labelledby="product-title"
  >
    <div
      class="relative m-5 border-2 border-black w-full max-w-lg bg-[rgba(55,55,55,0.9)] cursor-default overflow-y-auto max-h-[90vh]"
      @click.stop
    >
      <slot></slot>
      <slot name="header"></slot>
      <slot name="body"></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
