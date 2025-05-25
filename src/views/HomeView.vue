<script setup>
import AppContainer from '@/components/AppContainer.vue'
import NavBar from '@/components/NavBar.vue'
import Divider from '@/components/DividerHorizontal.vue'
import AppToolbar from '@/components/AppToolbar.vue'
import NotesGrid from '@/components/NotesGrid.vue'
</script>

<template>
  <AppContainer>
    <NavBar />
    <Divider />
    <AppToolbar />
    <Divider />
    <NotesGrid />
  </AppContainer>
</template>
