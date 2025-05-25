# ID Generation Utilities

This directory contains utility functions for generating unique and secure IDs for notes.

## Available Functions

### `generateUniqueId()`

Generates a UUID v4 using the browser's native API or a custom fallback.

```javascript
import { generateUniqueId } from '@/utils'

const noteId = generateUniqueId()
// Result: "550e8400-e29b-41d4-a716-446655440000"
```

### `generateSimpleId()`

Generates a simpler ID based on timestamp and counter.

```javascript
import { generateSimpleId } from '@/utils'

const noteId = generateSimpleId()
// Result: "note_1716422400000_1_abc123def"
```

### `generateShortId()`

Generates a short and readable ID.

```javascript
import { generateShortId } from '@/utils'

const noteId = generateShortId()
// Result: "nt_1a2b3c4d_xyz99"
```

### `generateIdWithPrefix(prefix)`

Generates an ID with a custom prefix.

```javascript
import { generateIdWithPrefix } from '@/utils'

const stickyNoteId = generateIdWithPrefix('sticky')
// Result: "sticky_550e8400-e29b-41d4-a716-446655440000"
```

### `isValidId(id)`

Validates if an ID is in a valid format.

```javascript
import { isValidId } from '@/utils'

console.log(isValidId('550e8400-e29b-41d4-a716-446655440000')) // true
console.log(isValidId('invalid-id')) // false
```

## 🚀 Optimized Functions for Electron

### `generateOptimalId()` (Recommended for Electron)

Automatically chooses the best available option.

```javascript
import { generateOptimalId } from '@/utils'

const noteId = generateOptimalId()
// Uses Node.js crypto in Electron, otherwise browser crypto, otherwise fallback
```

### `generateElectronId()`

Electron-specific version with priority for Node.js crypto.

```javascript
import { generateElectronId } from '@/utils'

const noteId = generateElectronId()
// Result: UUID v4 using Node.js crypto when possible
```

### `generateElectronSystemId()`

Includes system information (platform and architecture).

```javascript
import { generateElectronSystemId } from '@/utils'

const noteId = generateElectronSystemId()
// Result: "550e8400-e29b-41d4-a716-446655440000_win32_x64"
```

### `generateTimestampId()`

ID with high-precision timestamp using `performance.now()`.

```javascript
import { generateTimestampId } from '@/utils'

const noteId = generateTimestampId()
// Result: "note_1234567890123_1_ab12cd34"
```

## Usage Example in Vue Component

```javascript
// In Note.vue component
import { generateUniqueId } from '@/utils'

export default {
  props: {
    noteId: {
      type: String,
      default: () => generateUniqueId(),
    },
  },
  // ... rest of component
}
```

## Usage Example in Store

```javascript
// In notesStore.js
import { generateUniqueId } from '@/utils'

function addNote(noteContent) {
  const newNote = {
    id: generateUniqueId(),
    content: noteContent,
    createdAt: new Date(),
    // ... other properties
  }
  notes.value.push(newNote)
}
```

## 🔧 Electron Compatibility

### ✅ Fully compatible!

The functions work perfectly in Electron because:

- **Chromium base**: Electron uses Chromium, so all browser APIs are available
- **Node.js APIs**: Additional access to Node.js APIs for greater robustness
- **Multiple fallbacks**: Fallback system ensures functionality in any version

### 🎯 Recommendations for Electron:

```javascript
// Use the optimized function for better performance
import { generateOptimalId } from '@/utils'

// Or for maximum compatibility
import { generateUniqueId } from '@/utils'
```

### 📋 Priority order in Electron:

1. **Node.js crypto.randomUUID()** (most robust)
2. **Browser crypto.randomUUID()** (backup)
3. **Custom fallback** (total compatibility)

## Security Features

- **UUID v4**: Uses secure cryptography when available
- **Node.js crypto**: Leverages Node.js APIs in Electron
- **Robust fallback**: Custom implementation for compatibility
- **Incremental counter**: Prevents collisions in rapid generations
- **Timestamp**: Ensures temporal uniqueness
- **Validation**: Function to verify ID format
