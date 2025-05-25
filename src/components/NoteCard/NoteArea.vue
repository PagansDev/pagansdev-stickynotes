<template>
  <div class="relative">
    <button
      v-if="!notesStore.isNoteEditing(noteId)"
      class="cursor-pointer absolute top-1 left-65"
      @click="notesStore.toggleEditor(noteId)"
    >
      <img src="@/assets/Icons/edit.svg" alt="edit" class="w-6 h-6" />
    </button>
    <button
      v-else
      class="cursor-pointer absolute top-1 left-65"
      @click="notesStore.toggleEditor(noteId)"
    >
      <img src="@/assets/Icons/check.svg" alt="confirm" class="w-6 h-6" />
    </button>
    <div :class="{ 'pointer-events-none': !notesStore.isNoteEditing(noteId) }">
      <NoteHeader :noteId="noteId" />
      <NoteContent :noteId="noteId" />
    </div>
  </div>
</template>

<script setup>
import NoteHeader from '@/components/NoteCard/NoteHeader.vue'
import NoteContent from '@/components/NoteCard/NoteContent.vue'
import { useNotesStore } from '@/stores/notesStore'

// Receives the note ID via props
const props = defineProps({
  noteId: {
    type: String,
    required: true,
  },
})

const notesStore = useNotesStore()
</script>
