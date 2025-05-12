<template>
  <div class="grid grid-cols-3 !px-4 !py-1 drag-region">
    <div class="flex items-center justify-start text-xs">
      <h1>PagansDev - Sticky Notes</h1>
    </div>
    <div class="flex items-center justify-center">
      <img src="@/assets/Icons/drag-indicator.svg" alt="drag-indicator" class="w-8 h-8" />
    </div>
    <div class="flex items-center justify-end gap-4 ">
      <button type="button" class="cursor-pointer not-drag-region" @click.prevent="minimize">
        <img src="@/assets/Icons/minimize.svg" alt="minimize" class="w-4 h-4" />
      </button>
      <button type="button" class="cursor-pointer not-drag-region" @click.prevent="maximize">
        <img src="@/assets/Icons/maximize.svg" alt="maximize" class="w-4 h-4" />
      </button>
      <button type="button" class="cursor-pointer not-drag-region" @click.prevent="close">
        <img src="@/assets/Icons/close.svg" alt="close" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
function minimize() {
  console.log('minimize')
  window.electronAPI?.minimize()
}
function maximize() {
  console.log('maximize')
  window.electronAPI?.maximize()
}
function close() {
  console.log('close')
  window.electronAPI?.close()
}
</script>
