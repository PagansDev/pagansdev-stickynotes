import { ref } from 'vue'
import { defineStore } from 'pinia'
// Import the optimized function for Electron
import { generateOptimalId } from '@/utils/Id-Generator'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])
  const isEditing = ref(null) // ID of the note being edited
  const maxOpenNotes = ref(4) // Maximum open notes per window

  function addNote(noteContent = '', noteTitle = '') {
    const newNote = {
      id: generateOptimalId(), // Generates unique ID automatically
      title: noteTitle,
      content: noteContent,
      isOpen: false, // New note starts closed
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    notes.value.push(newNote)
    return newNote.id // Returns the new note's ID
  }

  function removeNote(noteId) {
    notes.value = notes.value.filter((note) => note.id !== noteId)
  }

  function updateNote(noteId, updates) {
    const noteIndex = notes.value.findIndex((note) => note.id === noteId)
    if (noteIndex !== -1) {
      notes.value[noteIndex] = {
        ...notes.value[noteIndex],
        ...updates,
        updatedAt: new Date(),
      }
    }
  }

  function getNoteById(noteId) {
    return notes.value.find((note) => note.id === noteId)
  }

  // Functions to manage open notes
  function getOpenNotes() {
    return notes.value.filter((note) => note.isOpen)
  }

  function getOpenNotesCount() {
    return getOpenNotes().length
  }

  function getClosedNotes() {
    return notes.value.filter((note) => !note.isOpen)
  }

  function openNote(noteId) {
    const openCount = getOpenNotesCount()
    if (openCount >= maxOpenNotes.value) {
      console.warn(`Maximum of ${maxOpenNotes.value} open notes per window`)
      return false
    }

    updateNote(noteId, { isOpen: true })
    return true
  }

  function closeNote(noteId) {
    updateNote(noteId, { isOpen: false })
    // If closing the note being edited, stop editing
    if (isEditing.value === noteId) {
      isEditing.value = null
    }
  }

  function toggleNoteOpen(noteId) {
    const note = getNoteById(noteId)
    if (!note) return false

    if (note.isOpen) {
      closeNote(noteId)
      return true
    } else {
      return openNote(noteId)
    }
  }

  // Function to automatically open the first available notes
  function autoOpenNotes(count = maxOpenNotes.value) {
    const closedNotes = getClosedNotes()
    const availableSlots = maxOpenNotes.value - getOpenNotesCount()
    const notesToOpen = Math.min(count, availableSlots, closedNotes.length)

    for (let i = 0; i < notesToOpen; i++) {
      openNote(closedNotes[i].id)
    }
  }

  // Compatibility functions (maintains previous functionality)
  function getNotesLength() {
    return notes.value.length
  }

  function openEditor(noteId) {
    isEditing.value = noteId
  }

  function closeEditor() {
    isEditing.value = null
  }

  function toggleEditor(noteId) {
    if (isEditing.value === noteId) {
      // If the note is already being edited, stop editing
      isEditing.value = null
    } else {
      // Otherwise, edit this note
      isEditing.value = noteId
    }
  }

  // Helper function to check if a specific note is being edited
  function isNoteEditing(noteId) {
    return isEditing.value === noteId
  }

  return {
    notes,
    maxOpenNotes,
    addNote,
    removeNote,
    updateNote,
    getNoteById,
    getOpenNotes,
    getOpenNotesCount,
    getClosedNotes,
    openNote,
    closeNote,
    toggleNoteOpen,
    autoOpenNotes,
    getNotesLength,
    openEditor,
    closeEditor,
    toggleEditor,
    isNoteEditing,
    isEditing,
  }
})
