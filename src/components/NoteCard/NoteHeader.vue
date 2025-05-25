<template>
  <div>
    <textarea
      name="title"
      id="title"
      v-model="title"
      @input="updateTitle"
      placeholder="Título da nota..."
      class="w-full font-bold text-2xl resize-none"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

const props = defineProps({
  noteId: {
    type: String,
    required: true,
  },
})

const notesStore = useNotesStore()

// Computed to get the current note
const currentNote = computed(() => notesStore.getNoteById(props.noteId))

// Reactive title that syncs with the store
const title = ref(currentNote.value?.title || '')

// Watch for changes in the note and update the local title
watch(
  currentNote,
  (newNote) => {
    if (newNote) {
      title.value = newNote.title || ''
    }
  },
  { immediate: true },
)

// Function to update the title in the store
function updateTitle() {
  notesStore.updateNote(props.noteId, { title: title.value })
}
</script>
