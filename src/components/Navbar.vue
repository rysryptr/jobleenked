<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const isActiveLink = (routePath) => {
  return route.path === routePath;
};

const search = ref("");

const handleSearch = () => {
  if (search.value.trim().toLowerCase()) {
    router.push({ name: "jobs", query: { q: search.value } });
  }
};
</script>

<template>
  <nav class="bg-slate-800 border-b border-black">
    <div class="mx-auto max-w-7xl">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-between gap-4">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
              >jobleenked</span
            >
          </RouterLink>
          <div class="w-[768px]">
            <div class="flex items-center justify-center">
              <div class="relative w-full flex items-center">
                <input
                  type="text"
                  v-model="search"
                  @keyup.enter="handleSearch"
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
                @click="handleSearch"
                class="px-4 py-3 bg-slate-900 text-white rounded-tr-full rounded-br-full border border-gray-700 hover:bg-gray-800"
              >
                Search
              </button>
            </div>
          </div>
          <div class="flex items-center justify-center gap-2">
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
        </div>
      </div>
    </div>
  </nav>
</template>
