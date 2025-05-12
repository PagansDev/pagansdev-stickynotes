<template>
  <div class="grid grid-cols-3 !px-8 !py-2">
    <div class="flex items-center justify-start gap-2">
      <button>
        <img src="@/assets/Icons/bold.svg" alt="bold" class="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1" />
      </button>
      <button>
        <img src="@/assets/Icons/italic.svg" alt="italic" class="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1" />
      </button>
      <button>
        <img src="@/assets/Icons/underscore.svg" alt="underline" class="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1" />
      </button>
      <button>
        <img src="@/assets/Icons/strike.svg" alt="strikethrough" class="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1" />
      </button>
      <button>
        <img src="@/assets/Icons/highlight.svg" alt="highlight" class="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1" />
      </button>
      <button>
        <img src="@/assets/Icons/list.svg" alt="list" class="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1" />
      </button>
      <button>
        <img src="@/assets/Icons/attachment.svg" alt="attachment" class="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1" />
      </button>
    </div>

    <div class="h-4 flex justify-center items-center">
      <div class="w-[1px] h-full bg-[var(--separator-light)]"></div>
    </div>

    <div class="flex items-center justify-end gap-2">
      <div class="flex items-center justify-center gap-2 cursor-pointer" >
          <span class="text-xs">Cloud</span>
          <button class="cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1">
            <img src="@/assets/Icons/sync.svg" alt="sync" class="w-6 h-6" />
          </button>
      </div>
      <button class="cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-gray-200 rounded-md p-1">
        <img src="@/assets/Icons/save.svg" alt="save" class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script setup></script>
