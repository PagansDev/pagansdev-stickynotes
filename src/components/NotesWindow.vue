<template>
  <!-- Modal window overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-[var(--overlay-dark)]/75 flex items-center justify-center z-50"
    @click="closeWindow"
  >
    <!-- Notes window -->
    <div
      class="bg-[var(--bg-light)] border-1 border-[var(--text-light)] text-white rounded-lg w-96 h-96 shadow-2xl flex flex-col gap-[1px]"
      @click.stop
    >
      <!-- Window header -->
      <div class="flex items-center justify-between !p-2 border-b border-[var(--text-light)]">
        <div class="flex items-center gap-2">
          <button
            @click="createNote"
            class="w-6 h-6 flex items-center justify-center text-[var(--text-light)] hover:text-white transition-colors cursor-pointer"
          >
            <img src="@/assets/Icons/add.svg" alt="Notas" class="w-6 h-6" />
          </button>
          <DividerVertical :size="1.5" />
          <span class="text-lg font-medium text-[var(--text-light)]">Notas</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="closeWindow"
            class="w-6 h-6 flex items-center justify-center cursor-pointer"
          >
            <img src="@/assets/Icons/close.svg" alt="Close" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Search field -->
      <div class="p-4 border-b border-gray-700">
        <div class="relative">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Pesquisar..."
            class="w-full text-[var(--text-light)] placeholder-[var(--text-light-secondary)] !px-3 !py-2 text-sm focus:outline-none focus:ring-2 focus:outline-[var(--text-light)] cursor-pointer"
          />
          <img
            src="@/assets/Icons/search.svg"
            alt="Search"
            class="w-6 h-6 absolute right-3 top-2"
          />
        </div>
      </div>

      <!-- Notes list -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="filteredNotes.length === 0" class="p-4 text-center text-gray-400">
          <p v-if="notesStore.notes.length === 0">Nenhuma nota criada</p>
          <p v-else>Nenhuma nota encontrada</p>
        </div>

        <div v-else class="space-y-1">
          <div v-for="note in filteredNotes" :key="note.id" class="group relative">
            <!-- Note -->
            <div
              class="!p-2 hover:!bg-[var(--bg-light-secondary)] transition-colors cursor-pointer border-l-8 border-b-1 border-b-[var(--border-light)]"
              :class="{
                'border-l-lime-200': note.isOpen,
                'border-l-transparent': !note.isOpen,
              }"
              @click="toggleNote(note.id)"
            >
              <!-- Note header -->
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <span class="text-sm font-medium !text-[var(--text-light)] truncate">
                    {{ note.title || 'Sem título' }}
                  </span>
                  <p class="text-xs !text-[var(--text-light-secondary)] mt-1 line-clamp-2">
                    {{ note.content || 'Nota vazia' }}
                  </p>
                </div>

                <!-- Status and actions -->
                <div class="flex items-center gap-2 ml-3">
                  <!-- Editing indicator -->
                  <span
                    v-if="notesStore.isNoteEditing(note.id)"
                    class="w-2 h-2 bg-yellow-400 rounded-full"
                    title="Editando"
                  ></span>

                  <!-- Actions menu -->
                  <button
                    @click.stop="deleteNote(note.id)"
                    class="opacity-0 group-hover:opacity-100 transition-all duration-300 w-6 h-6 flex items-center justify-center cursor-pointer"
                  >
                    <img src="@/assets/Icons/delete.svg" alt="Delete" class="w-6 h-6" />
                  </button>
                </div>
              </div>

              <!-- Date -->
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs text-blue-400">
                  {{ formatDate(note.createdAt) }}
                </span>

                <!-- Status badge -->
                <div class="flex items-center justify-center gap-1">
                  <div
                    v-if="note.isOpen"
                    class="flex items-center justify-center gap-1 bg-white rounded-md !p-1 w-20 border-1 border-[var(--border-light)]"
                  >
                    <span class="text-xs !text-[var(--confirmation-text)]">Aberta •</span>
                  </div>
                  <div
                    v-else
                    class="flex items-center justify-center gap-1 bg-white rounded-md !p-1 w-20 border-1 border-[var(--border-light)]"
                  >
                    <span class="text-xs !text-[var(--alert-text)]">Fechada •</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with statistics -->
      <div class="!p-3 border-t border-gray-700 bg-gray-750">
        <div class="flex items-center justify-between text-xs text-gray-400">
          <span>{{ notesStore.getOpenNotesCount() }}/{{ notesStore.maxOpenNotes }} • Abertas</span>
          <span>Total: {{ notesStore.notes.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import DividerVertical from './DividerVertical.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const notesStore = useNotesStore()
const searchTerm = ref('')

// Computed for filtered notes
const filteredNotes = computed(() => {
  if (!searchTerm.value) return notesStore.notes

  const term = searchTerm.value.toLowerCase()
  return notesStore.notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(term) || note.content?.toLowerCase().includes(term),
  )
})

// Functions
function closeWindow() {
  emit('close')
}

function createNote() {
  const noteId = notesStore.addNote('', 'Nova Nota')
  if (notesStore.getOpenNotesCount() < notesStore.maxOpenNotes) {
    notesStore.openNote(noteId)
  }
}

function toggleNote(noteId) {
  notesStore.toggleNoteOpen(noteId)
}

function deleteNote(noteId) {
  if (confirm('Tem certeza que deseja excluir esta nota?')) {
    notesStore.removeNote(noteId)
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
