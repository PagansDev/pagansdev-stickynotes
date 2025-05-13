<template>
  <div class="flex flex-row gap-2 justify-center items-center min-h-4/5">
    <slot name="noteArea"></slot>
    <div v-if="notesStore.getNotesLength() > 1" class="flex flex-col gap-4 justify-center items-center">
        <DividerVertical :size=15 />
        <button class="cursor-grabbing"><img src="@/assets/Icons/arrow-split.svg" alt="arrow-split" class="w-4 h-4" /></button>
        <DividerVertical :size=15 />
    </div>
    <slot v-if="notesStore.getNotesLength() > 1" name="noteArea"></slot>
  </div>
</template>

<script setup>
import DividerVertical from '@/components/DividerVertical.vue'
import { useNotesStore } from '@/stores/notesStore'

const notesStore = useNotesStore()
</script>
