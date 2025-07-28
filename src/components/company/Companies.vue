<script setup>
import axios from "axios";
import { computed, onMounted, reactive, ref } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Company from "../company/Company.vue";

defineProps({
  limit: Number,
});

const jobs = ref([]);

const state = reactive({
  isLoading: true,
});

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/jobs");
    jobs.value = response.data;
  } catch (error) {
    console.error("Error fetching data...", error);
  } finally {
    state.isLoading = false;
  }
};

const groupedJobs = computed(() => {
  const companyMap = new Map();

  jobs.value.forEach((job) => {
    if (!companyMap.has(job.company.name)) {
      companyMap.set(job.company.name, { job, count: 1 });
    } else {
      companyMap.get(job.company.name).count += 1;
    }
  });

  return Array.from(companyMap.values()).sort((a, b) => b.count - a.count);
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <section class="bg-white px-4 py-10">
    <div class="mx-auto max-w-7xl">
      <div class="container-xl lg:container m-auto">
        <h2 class="text-3xl font-bold text-slate-800 mb-6">
          Find Your Next Company
        </h2>

        <div v-if="state.isLoading" class="text-center text-slate-500 py-6">
          <PulseLoader />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Company
            v-for="({ job, count }, index) in groupedJobs.slice(
              0,
              limit || groupedJobs.length
            )"
            :key="index"
            :job="job"
            :count="count"
          />
        </div>
      </div>
    </div>
  </section>
</template>
