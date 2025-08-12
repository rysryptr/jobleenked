<script setup>
import { ref } from "vue";

const search = ref("");

const emit = defineEmits(["searchInput"]);

const searchInput = (search) => {
  emit("searchInput", search);
};
</script>

<template>
  <div class="flex max-w-[780px] w-full items-center justify-center">
    <div class="relative w-full flex items-center">
      <input
        type="text"
        v-model="search"
        @keyup.enter="searchInput(search)"
        placeholder="Find your job by Job Name, City, or Company"
        class="w-full rounded-tl-full rounded-bl-full py-3 px-4 bg-slate-900 border border-gray-700 text-white focus:outline-none focus:border-gray-600"
      />
      <button
        v-if="search"
        @click="search = ''"
        class="absolute right-2 text-white text-lg p-2 focus:outline-none"
      >
        x
      </button>
    </div>
    <button
      @click="searchInput(search)"
      class="px-4 py-3 bg-slate-900 text-white rounded-tr-full rounded-br-full border border-gray-700 hover:bg-gray-800"
    >
      Search
    </button>
  </div>
</template>
