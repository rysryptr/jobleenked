<script setup>
import { defineProps, computed, ref } from "vue";
import { formatDate } from "../../helpers/formatDate";

const props = defineProps({
  job: Object,
});

const showFullDescription = ref(false);

const truncatedDescription = computed(() => {
  let description = props.job.description;
  if (!showFullDescription.value) {
    description = description.substring(0, 120) + "...";
  }

  return description;
});

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};
</script>

<template>
  <RouterLink
    :to="'jobs/' + job.id"
    class="bg-white rounded-xl border border-slate-200 relative hover:border-blue-500 hover:shadow-lg"
  >
    <div class="p-4">
      <div class="mb-6">
        <div class="text-md text-gray-600 mb-4">
          {{ job.company.name }} - {{ job.location }}
        </div>
        <div class="text-3xl font-bold mb-4">{{ job.title }}</div>
        <h3 class="text-gray-500 mb-4 mt-4">{{ job.type }}</h3>
      </div>

      <div class="mb-5">
        <div>
          {{ truncatedDescription }}
        </div>
      </div>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-2">
        <div class="text-gray-700 mb-2">
          <i class="fa-solid fa-location-dot text-lg"></i>
          <p class="text-gray-400">{{ formatDate(job.date) }}</p>
        </div>
        <h3 class="text-lime-500">{{ job.salary }} / Year</h3>
      </div>
    </div>
  </RouterLink>
</template>
