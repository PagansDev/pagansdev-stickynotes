<template>
  <div
    class="flex flex-row gap-2 justify-center items-center min-h-4/5 w-full h-full select-none"
    ref="containerRef"
  >
    <div :style="{ width: leftWidth + '%' }" class="h-full">
      <slot name="noteArea"></slot>
    </div>
    <div
      v-if="notesStore.getNotesLength() > 1"
      class="flex flex-col gap-4 justify-center items-center cursor-col-resize h-full"
      @mousedown="startResize"
    >
      <DividerVertical :size="10" />
      <button class="cursor-col-resize" tabindex="-1">
        <img src="@/assets/Icons/arrow-split.svg" alt="arrow-split" class="w-4 h-4" />
      </button>
      <DividerVertical :size="10" />
    </div>
    <div v-if="notesStore.getNotesLength() > 1" :style="{ width: rightWidth + '%' }" class="h-full">
      <slot name="noteArea"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DividerVertical from '@/components/DividerVertical.vue'
import { useNotesStore } from '@/stores/notesStore'

const notesStore = useNotesStore()
const leftWidth = ref(50)
const rightWidth = ref(50)
const isResizing = ref(false)
const containerRef = ref(null)

function startResize(e) {
  isResizing.value = true
  document.body.style.cursor = 'col-resize'
  window.addEventListener('mousemove', onResize)
  window.addEventListener('mouseup', stopResize)
}

function stopResize() {
  isResizing.value = false
  document.body.style.cursor = ''
  window.removeEventListener('mousemove', onResize)
  window.removeEventListener('mouseup', stopResize)
}

function onResize(e) {
  if (!isResizing.value) return
  const container = containerRef.value
  if (!container) return
  const rect = container.getBoundingClientRect()
  let percent = ((e.clientX - rect.left) / rect.width) * 100
  percent = Math.max(10, Math.min(90, percent))
  leftWidth.value = percent
  rightWidth.value = 100 - percent
}

onBeforeUnmount(() => {
  stopResize()
})
</script>

<style scoped>
.flex-row > div {
  min-width: 20%;
  transition: width 0.1s;
  overflow: auto;
}
</style>
