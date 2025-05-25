<template>
  <div>
    <!-- Simple button to open the window -->
    <button
      @click="openWindow"
      class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
    >
      <img src="@/assets/Icons/note-add.svg" alt="menu" class="w-5 h-5" />
      <span class="text-xs"
        >Notas ({{ notesStore.getOpenNotesCount() }}/{{ notesStore.maxOpenNotes }})</span
      >
    </button>

    <!-- Modal window -->
    <NotesWindow :isOpen="isWindowOpen" @close="closeWindow" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import NotesWindow from '@/components/NotesWindow.vue'

const notesStore = useNotesStore()
const isWindowOpen = ref(false)

function openWindow() {
  isWindowOpen.value = true
}

function closeWindow() {
  isWindowOpen.value = false
}
</script>
