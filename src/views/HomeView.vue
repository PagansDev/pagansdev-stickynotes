<script setup>
import AppContainer from '@/components/AppContainer.vue'
import NavBar from '@/components/NavBar.vue'
import Divider from '@/components/DividerHorizontal.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import NotesGrid from '@/components/NotesGrid.vue'
import NoteArea from '@/components/NoteCard/NoteArea.vue'
</script>

<template>
  <AppContainer>
    <NavBar />
    <Divider />
    <AppToolbar />
    <Divider />
    <NotesGrid>
      <template #noteArea>
        <NoteArea />
      </template>
    </NotesGrid>
  </AppContainer>
</template>
