<template>
  <div class="grid grid-cols-3 !px-8 !py-2">
    <div class="flex items-center justify-start gap-2">
      <button
        class="group relative w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/bold.svg" alt="bold" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Negrito</span
        >
      </button>
      <button
        class="group relative w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/italic.svg" alt="italic" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Itálico</span
        >
      </button>
      <button
        class="group relative w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/underscore.svg" alt="underline" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Sublinhado</span
        >
      </button>
      <button
        class="group relative w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/strike.svg" alt="strikethrough" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Tachado</span
        >
      </button>
      <button
        class="group relative w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/code.svg" alt="code" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Código</span
        >
      </button>
      <button
        class="group relative w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/highlight.svg" alt="highlight" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Destacar</span
        >
      </button>
      <button
        class="group relative w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/checklist.svg" alt="checklist" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Checklist</span
        >
      </button>
      <button
        class="group relative w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/list.svg" alt="list" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Lista</span
        >
      </button>
      <button
        class="group relative w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/attachment.svg" alt="attachment" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Anexar</span
        >
      </button>
    </div>

    <DividerVertical :size=1.5 />

    <div class="flex items-center justify-end gap-2">
      <div class="flex items-center justify-center gap-2 cursor-pointer">
        <span class="text-xs">Cloud</span>
        <button
          class="group relative cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
        >
          <img src="@/assets/Icons/sync.svg" alt="sync" class="w-6 h-6" />
          <span
            class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
            >Sincronizar</span
          >
        </button>
      </div>
      <button
        class="group relative cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1"
      >
        <img src="@/assets/Icons/save.svg" alt="save" class="w-6 h-6" />
        <span
          class="absolute top-9 left-1/2 -translate-x-1/2 bg-gray-200 text-xs !p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
          >Salvar</span
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import DividerVertical from '@/components/DividerVertical.vue'
</script>
