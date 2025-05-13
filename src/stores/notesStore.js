import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])

  function addNote(note) {
    notes.value.push(note)
  }

  function removeNote(note) {
    notes.value = notes.value.filter((n) => n !== note)
  }

  function getNotesLength() {
    //return notes.value.length
    return 2
  }

  return { notes, addNote, removeNote, getNotesLength }
})
