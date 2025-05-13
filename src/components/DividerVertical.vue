<template>
  <div class="flex justify-center items-center" :style="{ height: `${size}em` }">
    <div class="w-[1px] h-full bg-[var(--separator-light)]"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 4,
  },
})
</script>
