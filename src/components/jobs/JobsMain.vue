<script setup>
import { defineProps } from "vue";

const props = defineProps({
  job: Object,
});

import { formatDate } from "@/helpers/formatDate";

const emit = defineEmits(["jobDetail"]);

const jobDetail = (jobid) => {
  emit("jobDetail", jobid);
};
</script>

<template>
  <!-- <RouterLink :to="'jobs/' + job.id"> -->
  <div @click="jobDetail(job.id)">
    <div
      class="bg-white p-6 rounded-lg border border-slate-200 hover:border-blue-500 hover:cursor-pointer text-center mb-6 md:text-left hover:shadow-lg"
    >
      <div class="text-lg text-gray-600 mb-4">
        {{ job.company.name }} - {{ job.location }}
      </div>
      <h1 class="text-3xl font-bold mb-4">{{ job.title }}</h1>
      <h3 class="text-gray-500 mb-4">{{ job.type }}</h3>
      <!-- 
      <p class="mb-4">
        {{ truncatedDescription }}
      </p> -->

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-gray-700 mb-3">
          <i class="fa-solid fa-location-dot text-lg"></i>
          {{ formatDate(job.date) }}
        </div>
        <h3 class="text-lime-500 mb-2">{{ job.salary }} / Year</h3>
      </div>
    </div>
  </div>
  <!-- </RouterLink> -->
</template>
