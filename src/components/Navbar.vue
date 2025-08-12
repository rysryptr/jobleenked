<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import SearchInput from "./parts/SearchInput.vue";

const route = useRoute();
const router = useRouter();
const isActiveLink = (routePath) => {
  return route.path === routePath;
};

const isMenuOpen = ref(false);
const isSearchOpen = ref(false);

const handleSearch = (search) => {
  // console.log(search);
  if (search.trim().toLowerCase()) {
    router.push({ name: "jobs", query: { q: search } });
  }

  isSearchOpen.value = false;
};
</script>

<template>
  <nav class="sticky top-0 z-50 bg-slate-800 border-b border-black">
    <div class="mx-auto max-w-7xl">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-between gap-4">
          <!-- Logo -->
          <RouterLink class="w-[20%] flex-shrink-0 items-center mr-4" to="/">
            <span class="block text-white text-2xl font-bold ml-2"
              >jobleenked</span
            >
          </RouterLink>
          <div class="w-[55%] hidden md:flex">
            <SearchInput @searchInput="handleSearch" />
          </div>
          <!-- Search Button -->
          <div class="md:hidden">
            <button
              @click="isSearchOpen = !isSearchOpen"
              class="p-2 rounded-full hover:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
          <!-- isSearchOpen true -->
          <div
            v-if="isSearchOpen"
            class="fixed top-0 left-0 right-0 w-full h-[15%] p-4 bg-slate-800 text-white z-50 transition-transform duration-300 ease-in-out"
          >
            <div class="flex items-center justify-between mb-4">
              <span class="text-lg">Search</span>
              <button @click="isSearchOpen = false" class="text-xl">x</button>
            </div>
            <SearchInput @searchInput="handleSearch" />
          </div>

          <div class="hidden md:flex md:w-[25%] items-center justify-end gap-2">
            <RouterLink
              to="/"
              :class="[
                isActiveLink('/') ? 'bg-gray-900' : 'bg-slate-800',
                'text-white hover:bg-gray-900',
                'hover:text-white',
                'rounded-md',
                'px-3',
                'py-2',
              ]"
              >Home</RouterLink
            >
            <RouterLink
              to="/jobs"
              :class="[
                isActiveLink('/jobs') ? 'bg-gray-900' : 'bg-slate-800',
                'text-white hover:bg-gray-900',
                'hover:text-white',
                'rounded-md',
                'px-3',
                'py-2',
              ]"
              >Browse Jobs</RouterLink
            >
            <RouterLink
              to="/jobs/add"
              :class="[
                isActiveLink('/jobs/add') ? 'bg-gray-900' : 'bg-slate-800',
                'text-white hover:bg-gray-900',
                'hover:text-white',
                'rounded-md',
                'px-3',
                'py-2',
              ]"
              >Add Job</RouterLink
            >
          </div>
          <button
            @click="isMenuOpen = true"
            class="md:hidden text-white text-3xl mr-4"
          >
            ☰
          </button>
        </div>
      </div>
    </div>
  </nav>

  <transition class="slide">
    <div
      v-if="isMenuOpen"
      class="fixed top-0 right-0 w-[80%] h-full bg-slate-900 text-white z-50 shadow-lg transition-transform duration-300 ease-in-out"
    >
      <div
        class="flex justify-between items-center p-4 border-b border-gray-700"
      >
        <span class="text-lg font-semibold">Menu</span>
        <button @click="isMenuOpen = false" class="text-xl">x</button>
      </div>
      <ul class="p-4 space-y-4">
        <li class="py-4">
          <RouterLink to="/" @click="isMenuOpen = false">Home</RouterLink>
        </li>
        <li class="py-4">
          <RouterLink to="/jobs" @click="isMenuOpen = false"
            >Browse Jobs</RouterLink
          >
        </li>
        <li class="py-4">
          <RouterLink to="/jobs/add" @click="isMenuOpen = false"
            >Add Job</RouterLink
          >
        </li>
      </ul>
    </div>
  </transition>

  <div
    v-if="isMenuOpen || isSearchOpen"
    @click="(isMenuOpen = false), (isSearchOpen = false)"
    class="fixed inset-0 bg-black opacity-80 z-40"
  ></div>
</template>
