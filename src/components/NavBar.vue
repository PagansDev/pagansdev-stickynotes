<template>
  <div class="grid grid-cols-3 !px-4 !py-1 drag-region">
    <div class="flex items-center justify-start text-xs">
      <h1>PagansDev - Sticky Notes</h1>
      <div class="flex items-center justify-center not-drag-region">
        <button
        class="group relative w-5 h-5 cursor-pointer"
      >
        <img src="@/assets/Icons/more-vert.svg" alt="settings" class="w-5 h-5" />
        <span
          class="absolute top-0 left-16 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Configurações</span
        >
      </button>
      </div>
    </div>
    <div class="flex items-center justify-center pointer-events-none ">
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
