# Exemplos de Integração TipTap + Vue 3

## 1. Instalação dos pacotes necessários

```
npm install @tiptap/vue-3 @tiptap/starter-kit
```

---

## 2. Exemplo de inicialização do editor no HomeView.vue

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import AppContainer from '@/components/AppContainer.vue'
import NavBar from '@/components/NavBar.vue'
import Divider from '@/components/DividerHorizontal.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import NotesGrid from '@/components/NotesGrid.vue'
import NoteArea from '@/components/NoteCard/NoteArea.vue'

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: '<p>Digite sua nota aqui...</p>',
  })
})

onBeforeUnmount(() => {
  if (editor.value) editor.value.destroy()
})
</script>

<template>
  <AppContainer>
    <NavBar />
    <Divider />
    <AppToolbar :editor="editor.value" />
    <Divider />
    <NotesGrid>
      <template #noteArea>
        <NoteArea :editor="editor.value" />
      </template>
    </NotesGrid>
  </AppContainer>
</template>
```

---

## 3. Exemplo de NoteArea.vue usando o editor do TipTap

```vue
<script setup>
import { computed } from 'vue'
const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script>
import { EditorContent } from '@tiptap/vue-3'
export default {
  components: { EditorContent },
}
</script>
```

---

## 4. Exemplo de AppToolbar.vue recebendo e usando o editor

```vue
<script setup>
import { computed } from 'vue'
import { useEditorActions } from '@/composables/useEditorActions'
const props = defineProps({
  editor: {
    type: Object,
    default: null,
  },
})
const actions = useEditorActions(props.editor)
</script>

<template>
  <button @click="actions.bold">Negrito</button>
  <button @click="actions.italic">Itálico</button>
  <!-- ... outros botões ... -->
</template>
```

---

## 5. Exemplo de useEditorActions.js

```js
export function useEditorActions(editor) {
  return {
    bold: () => editor && editor.chain().focus().toggleBold().run(),
    italic: () => editor && editor.chain().focus().toggleItalic().run(),
    underline: () => editor && editor.chain().focus().toggleUnderline().run(),
    // ... outros comandos ...
  }
}
```

---

## Observações

- Sempre passe a instância do editor como prop para os componentes que precisam manipular ou exibir o conteúdo.
- Certifique-se de destruir o editor ao desmontar o componente para evitar vazamentos de memória.
- Adapte os exemplos conforme a estrutura do seu projeto.
