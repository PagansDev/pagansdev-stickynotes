# Guia de Integração do TipTap com Vue.js

## Fase 1: Instalação e Configuração Inicial

1. Instale as dependências necessárias:

```bash
npm install @tiptap/vue-3 @tiptap/pm @tiptap/starter-kit @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-highlight @tiptap/extension-placeholder
```

2. Crie um componente base do TipTap (por exemplo, em `components/Editor/TipTapEditor.vue`):

```vue
<template>
  <editor-content :editor="editor" class="prose prose-sm max-w-none" />
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Digite algo...',
  },
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  extensions: [
    StarterKit,
    TextStyle,
    Color,
    Highlight,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
  ],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

// Atualiza o conteúdo quando o modelValue mudar externamente
watch(
  () => props.modelValue,
  (newContent) => {
    const isSame = newContent === editor.value?.getHTML()
    if (!isSame) {
      editor.value?.commands.setContent(newContent || '')
    }
  },
)

// Limpa o editor quando o componente for desmontado
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style>
/* Estilos específicos do TipTap que não podem ser feitos com Tailwind */
.ProseMirror p.is-editor-empty:first-child::before {
  color: #9ca3af;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
```

## Fase 2: Estrutura de Componentes

### 1. Editor Principal (Nota)

- Cada nota será um componente TipTapEditor independente
- O editor principal terá todas as funcionalidades de formatação
- Exemplo de uso:

```vue
<template>
  <div class="w-full">
    <TipTapEditor v-model="content" placeholder="Digite sua nota aqui..." />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TipTapEditor from './TipTapEditor.vue'

const content = ref('')
</script>
```

### 2. Editor de Título

- Crie um componente separado para o título com funcionalidades limitadas
- Exemplo:

```vue
<template>
  <editor-content :editor="editor" class="prose prose-lg max-w-none" />
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { onBeforeUnmount } from 'vue'

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2],
      },
    }),
    TextStyle,
    Color,
  ],
  content: '',
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
```

## Fase 3: Integração com AppToolbar

1. Crie um composable para gerenciar as ações do editor:

```javascript
// composables/useEditorActions.js
export function useEditorActions(editor) {
  const actions = {
    bold: () => editor?.chain().focus().toggleBold().run(),
    italic: () => editor?.chain().focus().toggleItalic().run(),
    underline: () => editor?.chain().focus().toggleUnderline().run(),
    highlight: () => editor?.chain().focus().toggleHighlight().run(),
    color: (color) => editor?.chain().focus().setColor(color).run(),
    // Adicione mais ações conforme necessário
  }

  return actions
}
```

2. Modifique o AppToolbar para usar as ações do editor:

```vue
<template>
  <div class="flex items-center space-x-2 p-2 border-b border-gray-200">
    <button
      @click="actions.bold"
      class="p-2 hover:bg-gray-100 rounded"
      :class="{ 'bg-gray-100': editor?.isActive('bold') }"
    >
      <BoldIcon class="w-5 h-5" />
    </button>
    <button
      @click="actions.italic"
      class="p-2 hover:bg-gray-100 rounded"
      :class="{ 'bg-gray-100': editor?.isActive('italic') }"
    >
      <ItalicIcon class="w-5 h-5" />
    </button>
    <!-- Adicione mais botões conforme necessário -->
  </div>
</template>

<script setup>
import { useEditorActions } from '@/composables/useEditorActions'

const props = defineProps({
  editor: {
    type: Object,
    default: null,
  },
})

const actions = useEditorActions(props.editor)
</script>
```

3. Integre o AppToolbar com o editor:

```vue
<template>
  <div class="flex flex-col w-full">
    <AppToolbar :editor="editor" />
    <TipTapEditor v-model="content" @editor-ready="setEditor" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppToolbar from './AppToolbar.vue'
import TipTapEditor from './TipTapEditor.vue'

const content = ref('')
const editor = ref(null)

const setEditor = (newEditor) => {
  editor.value = newEditor
}
</script>
```

## Fase 4: Funcionalidades Avançadas

### 1. Salvamento Automático

```vue
<template>
  <div class="w-full">
    <TipTapEditor v-model="content" @update:modelValue="handleContentChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from 'lodash-es'
import TipTapEditor from './TipTapEditor.vue'

const content = ref('')

const saveContent = async (newContent) => {
  // Implemente a lógica de salvamento aqui
  console.log('Salvando conteúdo:', newContent)
}

const handleContentChange = debounce(saveContent, 1000)
</script>
```

### 2. Histórico de Alterações

```javascript
import History from '@tiptap/extension-history'

const editor = useEditor({
  extensions: [
    StarterKit,
    History.configure({
      depth: 100,
    }),
    // ... outras extensões
  ],
})
```

## Dicas de Implementação

1. **Performance**:

   - Use `computed` para valores derivados
   - Implemente debounce para salvamento automático
   - Use `v-memo` para otimizar re-renderizações

2. **Acessibilidade**:

   - Adicione atributos ARIA apropriados
   - Implemente navegação por teclado
   - Forneça feedback visual para ações

3. **Mobile**:
   - Teste e otimize para diferentes tamanhos de tela
   - Considere usar gestos para ações comuns
   - Adapte a toolbar para dispositivos móveis

## Exemplos de Uso

### Formatação Básica

```javascript
// Negrito
editor.value?.chain().focus().toggleBold().run()

// Itálico
editor.value?.chain().focus().toggleItalic().run()

// Cor do texto
editor.value?.chain().focus().setColor('#ff0000').run()
```

### Formatação Avançada

```javascript
// Destaque
editor.value?.chain().focus().toggleHighlight().run()

// Lista ordenada
editor.value?.chain().focus().toggleOrderedList().run()

// Citação
editor.value?.chain().focus().toggleBlockquote().run()
```
