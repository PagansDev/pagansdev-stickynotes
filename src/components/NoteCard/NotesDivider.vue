<template>
    <div
      v-if="notesStore.getNotesLength() > 1"
      class="flex flex-col gap-4 justify-center items-center"
    >
      <DividerVertical :size="12" />
      <button class="cursor-grabbing">
        <img src="@/assets/Icons/arrow-split.svg" alt="arrow-split" class="w-4 h-4" />
      </button>
      <DividerVertical :size="12" />
    </div>
</template>

<script setup>
import { useNotesStore } from '@/stores/notesStore'
import DividerVertical from '@/components/DividerVertical.vue'

const notesStore = useNotesStore()

</script>