<template>
  <div class="!px-4">
    <textarea
      name="content"
      id="content"
      v-model="content"
      @input="updateContent"
      placeholder="Conteúdo da nota..."
      class="w-full"
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

// Reactive content that syncs with the store
const content = ref(currentNote.value?.content || '')

// Watch for changes in the note and update the local content
watch(
  currentNote,
  (newNote) => {
    if (newNote) {
      content.value = newNote.content || ''
    }
  },
  { immediate: true },
)

// Function to update the content in the store
function updateContent() {
  notesStore.updateNote(props.noteId, { content: content.value })
}
</script>
