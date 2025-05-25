# Sistema de Notas Abertas/Fechadas

## 📋 **Visão Geral**

O sistema implementa um gerenciamento avançado de notas onde cada nota possui um atributo `isOpen` que controla sua exibição. Máximo de **4 notas abertas por janela** com layout sempre lado a lado.

## 🏗️ **Estrutura de Dados**

### Objeto Note

```javascript
{
  id: "uuid-único",           // ID único gerado automaticamente
  title: "Título da nota",    // Título editável
  content: "Conteúdo...",     // Conteúdo editável
  isOpen: false,              // ✨ NOVO: Controla se está aberta
  createdAt: Date,            // Data de criação
  updatedAt: Date             // Data da última modificação
}
```

## 🎛️ **Funções da Store**

### Gerenciamento de Estado

- `getOpenNotes()` - Retorna apenas notas abertas
- `getOpenNotesCount()` - Conta notas abertas
- `getClosedNotes()` - Retorna apenas notas fechadas
- `maxOpenNotes` - Limite por janela (4)

### Controle de Abertura/Fechamento

- `openNote(noteId)` - Abre uma nota (respeitando limite)
- `closeNote(noteId)` - Fecha uma nota
- `toggleNoteOpen(noteId)` - Alterna estado da nota
- `autoOpenNotes(count)` - Abre automaticamente N notas disponíveis

## 🎨 **Layout Lado a Lado**

**TODAS as notas ficam sempre lado a lado em linha horizontal:**

### 1 Nota Aberta

```
┌─────────────────────┐
│      Nota 1         │
└─────────────────────┘
```

### 2 Notas Abertas

```
┌─────────┐ │ ┌─────────┐
│ Nota 1  │ │ │ Nota 2  │
└─────────┘ │ └─────────┘
```

### 3 Notas Abertas

```
┌─────┐ │ ┌─────┐ │ ┌─────┐
│ N1  │ │ │ N2  │ │ │ N3  │
└─────┘ │ └─────┘ │ └─────┘
```

### 4 Notas Abertas (máximo)

```
┌───┐ │ ┌───┐ │ ┌───┐ │ ┌───┐
│N1 │ │ │N2 │ │ │N3 │ │ │N4 │
└───┘ │ └───┘ │ └───┘ │ └───┘
```

## 🎮 **Interface de Gerenciamento**

### Menu de Notas (NavBar)

- **Contador**: "Notas (2/4)" - mostra abertas/limite
- **Lista de todas as notas** com status visual
- **Botões**: Abrir/Fechar/Excluir para cada nota
- **Ações rápidas**: Fechar Todas, Auto Abrir, Criar Nova

### Indicadores Visuais

- 🟢 **Verde**: Nota aberta
- ⚪ **Cinza**: Nota fechada
- 🟡 **Badge**: "Editando" quando em modo de edição

## 🔧 **Implementação**

### Store (notesStore.js)

```javascript
// Criar nota
const noteId = notesStore.addNote('Conteúdo', 'Título')

// Abrir nota (máximo 4)
notesStore.openNote(noteId) // retorna true/false

// Fechar nota
notesStore.closeNote(noteId)

// Alternar estado
notesStore.toggleNoteOpen(noteId)

// Auto abrir primeiras disponíveis
notesStore.autoOpenNotes(2)
```

### Componente NotesGrid

```vue
<template>
  <!-- Layout sempre lado a lado -->
  <div class="flex flex-row items-start gap-6 w-full">
    <template v-for="(note, index) in openNotes" :key="note.id">
      <!-- Nota -->
      <div class="flex-1">
        <NoteArea :noteId="note.id" />
      </div>

      <!-- Divisória entre notas -->
      <div v-if="index < openNotes.length - 1">
        <DividerVertical />
      </div>
    </template>
  </div>
</template>

<script>
const openNotes = computed(() => notesStore.getOpenNotes())
</script>
```

### Menu de Gerenciamento

```vue
<NotesMenu />
<!-- Mostra todas as notas com controles para abrir/fechar -->
```

## 🚀 **Funcionalidades Avançadas**

### Limitação Inteligente

- ✅ Máximo 4 notas abertas por janela
- ✅ Botão "Abrir" desabilitado quando limite atingido
- ✅ Aviso no console quando tentar exceder limite

### Gestão Automática

- ✅ Auto-abertura de notas na inicialização
- ✅ Fechamento automático de edição ao fechar nota
- ✅ Layout responsivo baseado na quantidade

### Experiência do Usuário

- ✅ Status visual claro (verde/cinza)
- ✅ Contador sempre visível na NavBar
- ✅ Confirmação antes de excluir notas
- ✅ Preview de conteúdo no menu
- ✅ **Layout sempre horizontal** - notas lado a lado

## 🔮 **Roadmap Futuro**

### Múltiplas Janelas

```javascript
// Futura implementação
window.electronAPI.openNewWindow()
// Cada janela terá seu próprio limite de 4 notas lado a lado
```

### Persistência

- Salvar estado `isOpen` no localStorage/arquivo
- Restaurar notas abertas ao reabrir aplicação

### Organização

- Grupos/categorias de notas
- Favoritos/pinned notes
- Busca e filtros

## 💡 **Exemplo de Uso Completo**

```javascript
// 1. Criar algumas notas
const note1 = notesStore.addNote('Conteúdo 1', 'Nota 1')
const note2 = notesStore.addNote('Conteúdo 2', 'Nota 2')
const note3 = notesStore.addNote('Conteúdo 3', 'Nota 3')

// 2. Abrir notas (máximo 4, sempre lado a lado)
notesStore.openNote(note1) // ✅ Sucesso
notesStore.openNote(note2) // ✅ Sucesso
notesStore.openNote(note3) // ✅ Sucesso

// 3. Verificar estado
console.log(notesStore.getOpenNotesCount()) // 3

// 4. Layout automaticamente organiza 3 notas lado a lado
// NotesGrid renderiza: [Nota1] | [Nota2] | [Nota3]

// 5. Gerenciar via menu
// Menu mostra: "Notas (3/4)" com lista completa
```

Este sistema oferece máxima flexibilidade mantendo sempre o layout lado a lado! 🎉
