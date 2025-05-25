<template>
  <div class="w-full !p-8 flex flex-col gap-4">
    <!-- Layout for all notes: always side by side -->
    <div v-if="openNotes.length > 0" class="flex flex-row items-start gap-6 w-full">
      <!-- Template to render notes with dividers -->
      <template v-for="(note, index) in openNotes" :key="note.id">
        <!-- Note -->
        <div class="flex-1">
          <NoteArea :noteId="note.id" />
        </div>

        <!-- Vertical divider between notes (except for the last one) -->
        <div
          v-if="index < openNotes.length - 1"
          class="flex flex-col gap-4 justify-center items-center"
        >
          <DividerVertical :size="12" />
          <button class="cursor-grabbing">
            <img src="@/assets/Icons/arrow-split.svg" alt="arrow-split" class="w-4 h-4" />
          </button>
          <DividerVertical :size="12" />
        </div>
      </template>
    </div>

    <!-- Message when there are no open notes -->
    <div v-else class="flex flex-col items-center justify-center h-full text-gray-500">
      <p class="text-lg mb-4">Nenhuma nota aberta</p>
      <button
        @click="createAndOpenNote"
        class="!px-4 !py-2 rounded-lg bg-white text-[var(--text-color)] hover:bg-gray-100 transition-colors cursor-pointer"
      >
        Criar Nova Nota
      </button>
    </div>

    <!-- Notes status -->
    <div class="mt-4 text-sm text-gray-600 text-center fixed bottom-4 left-0 right-0">
      • {{ openNotes.length }} de {{ notesStore.maxOpenNotes }} notas abertas •
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import DividerVertical from '@/components/DividerVertical.vue'
import NoteArea from '@/components/NoteCard/NoteArea.vue'
import { useNotesStore } from '@/stores/notesStore'

const notesStore = useNotesStore()

// Computed to get only open notes
const openNotes = computed(() => notesStore.getOpenNotes())

// Function to create and open a new note
function createAndOpenNote() {
  const noteId = notesStore.addNote('', '')
  notesStore.openNote(noteId)
}

// Initialization: create example notes if necessary
onMounted(() => {
  if (notesStore.notes.length === 0) {
    // Create some example notes
    const note1Id = notesStore.addNote('Conteúdo da primeira nota...', 'Primeira Nota')
    const note2Id = notesStore.addNote('Conteúdo da segunda nota...', 'Segunda Nota')

    // Automatically open the first 2 notes
    notesStore.openNote(note1Id)
    notesStore.openNote(note2Id)
  } else if (notesStore.getOpenNotesCount() === 0) {
    // If notes exist but none are open, open automatically
    notesStore.autoOpenNotes(2)
  }
})
</script>
