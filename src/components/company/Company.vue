<script setup>
import { computed, defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  count: Number,
  job: Object,
});

const initialCompany = computed(() => {
  const initJob = props.job.company.name.substring(0, 1);
  return initJob;
});
</script>

<template>
  <RouterLink
    :to="'company/' + props.job.company.name"
    class="bg-white rounded-xl border border-slate-200 relative hover:border-blue-500 hover:shadow-lg"
  >
    <div class="p-4">
      <div class="flex flex-col justify-center gap-4">
        <div class="flex items-center gap-4">
          <div
            class="bg-pink-500 w-10 h-10 text-center text-white p-2 rounded-full font-bold text-xl mb-2"
          >
            {{ initialCompany }}
          </div>
          <div class="flex flex-col justify-center">
            <div class="text-xl font-semibold">
              {{ props.job.company.name }}
            </div>
            <div>{{ props.job.location }}</div>
          </div>
        </div>
        <div class="bg-slate-200 rounded-full px-2 py-1 text-sm text-gray-500">
          {{ count }} Job Vacancy
        </div>
      </div>
    </div>
  </RouterLink>
</template>
