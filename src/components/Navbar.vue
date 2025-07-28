<script setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const isActiveLink = (routePath) => {
  return route.path === routePath;
};
</script>

<template>
  <nav class="bg-slate-800 border-b border-black">
    <div class="mx-auto max-w-7xl">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-between">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
              >jobleenked</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
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
    </div>
  </nav>
</template>
