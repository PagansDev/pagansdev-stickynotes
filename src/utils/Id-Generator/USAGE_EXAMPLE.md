# How to Use Unique IDs via Props - Practical Example

## ✅ **CORRECT WAY** (As implemented)

### 1. **In the Pinia Store** - Generate ID automatically

```javascript
// stores/notesStore.js
import { generateOptimalId } from '@/utils/Id-Generator'

function addNote(noteContent = '', noteTitle = '') {
  const newNote = {
    id: generateOptimalId(), // ✅ Generate ID here automatically
    title: noteTitle,
    content: noteContent,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  notes.value.push(newNote)
  return newNote.id
}
```

### 2. **In Parent Component** - Pass ID via props

```vue
<!-- NotesGrid.vue -->
<template>
  <NoteArea :noteId="firstNoteId" />
</template>

<script setup>
const firstNoteId = computed(() => {
  if (notesStore.notes.length === 0) {
    return notesStore.addNote('', 'New Note') // ✅ Returns the ID
  }
  return notesStore.notes[0].id // ✅ Uses existing ID
})
</script>
```

### 3. **In Child Component** - Receive ID via props

```vue
<!-- NoteArea.vue -->
<script setup>
const props = defineProps({
  noteId: {
    type: String,
    required: true, // ✅ Required ID
  },
})

// ✅ Use the ID in store functions
notesStore.toggleEditor(props.noteId)
notesStore.isNoteEditing(props.noteId)
</script>
```

---

## ❌ **INCORRECT WAYS** (Don't do this)

### ❌ Generate ID directly in component

```javascript
// WRONG - Don't do this!
const noteId = generateOptimalId() // Will generate new ID on every render
```

### ❌ Generate ID in template

```vue
<!-- WRONG - Don't do this! -->
<NoteArea :noteId="generateOptimalId()" />
```

### ❌ Generate ID in computed without verification

```javascript
// WRONG - Will generate different IDs on each call
const noteId = computed(() => generateOptimalId())
```

---

## 🎯 **Recommended Flow**

1. **Store creates note** → Generates ID automatically
2. **Parent component** → Gets ID from store
3. **Child component** → Receives ID via props
4. **Operations** → Use the ID to identify the note

---

## 🚀 **Recommended Functions for Electron**

```javascript
// For maximum compatibility and performance
import { generateOptimalId } from '@/utils/Id-Generator'

// Available alternatives:
import {
  generateElectronId, // Specific for Electron
  generateUniqueId, // Standard UUID v4
  generateTimestampId, // With precise timestamp
} from '@/utils/Id-Generator'
```

---

## 📋 **Complete Implementation Example**

```vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent :noteId="noteId" />
</template>

<script setup>
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

const notesStore = useNotesStore()

const noteId = computed(() => {
  // Check if note exists, otherwise create a new one
  if (notesStore.notes.length === 0) {
    return notesStore.addNote() // Returns the new note's ID
  }
  return notesStore.notes[0].id // Returns existing ID
})
</script>
```

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <h1>{{ note.title }}</h1>
    <p>{{ note.content }}</p>
    <button @click="edit">Edit</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

const props = defineProps({
  noteId: { type: String, required: true },
})

const notesStore = useNotesStore()

const note = computed(() => notesStore.getNoteById(props.noteId))

function edit() {
  notesStore.toggleEditor(props.noteId)
}
</script>
```

---

## 💡 **Summary**

- ✅ **Generate IDs in the store** when creating objects
- ✅ **Pass via props** to child components
- ✅ **Use `generateOptimalId()`** for Electron
- ❌ **Never generate IDs directly** in components
- ❌ **Never generate IDs** in template or computed without verification
