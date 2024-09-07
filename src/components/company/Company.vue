<script setup>
import { computed, defineProps } from 'vue'
import { RouterLink } from 'vue-router';

const props = defineProps({
  count: Number,
  job: Array
})

const initialCompany = computed(() => {
  const initJob = props.job.substring(0, 1)
  return initJob
})

</script>

<template>
  <RouterLink :to="'company/' + props.job" class="bg-white rounded-xl border border-slate-200 relative hover:border-blue-500 hover:shadow-lg">
    <div class="p-4">
      <div class="mb-6">
        <div class="bg-pink-500 w-10 h-10 text-center text-white p-2 rounded-full font-bold text-xl mb-2">{{ initialCompany }}</div>
        <div class="text-xl font-semibold mb-4">{{ job }}</div>
        <div class="bg-slate-200 rounded-full px-2 py-1 text-sm text-gray-500">{{ count }} Job Vacancy</div>
      </div>
    </div>
  </RouterLink>
</template>