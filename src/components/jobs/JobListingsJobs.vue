<script setup>
import JobsMain from "./JobsMain.vue";
import JobsAside from "./JobsAside.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import axios from "axios";
import { reactive, onMounted, ref } from "vue";

const state = reactive({
  jobs: [],
  job: {},
  isLoading: true,
  jobLoading: false,
  resultData: false,
});

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/jobs");
    state.jobs = response.data;
  } catch (error) {
    console.error("Error Fetching data...", error);
  } finally {
    state.isLoading = false;
  }
};

onMounted(() => {
  fetchData();
});

const query = ref("");
const results = ref([]);

const searchData = async () => {
  if (query.value.length === 0) {
    results.value = [];
    state.resultData = false;
    return;
  }

  state.isLoading = true;

  try {
    const response = await axios.get("http://localhost:3000/jobs/");
    const searchQuery = query.value.toLowerCase();
    results.value = response.data.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery) ||
        job.company.name.toLowerCase().includes(searchQuery) ||
        job.location.toLowerCase().includes(searchQuery)
    );

    state.resultData = results.value.length === 0;
  } catch (error) {
    console.error("Error fetching data...", error);
  } finally {
    state.isLoading = false;
  }
};

const clearFilter = () => {
  query.value = "";
  searchData();
};

const handleJobDetail = async (id) => {
  state.jobLoading = true;
  try {
    const response = await axios.get(`http://localhost:3000/jobs/${id}`);
    state.job = response.data;
  } catch (error) {
    console.error("Error Fetching Data...", error);
  } finally {
    state.jobLoading = false;
  }
};
</script>

<template>
  <section v-if="!state.isLoading" class="bg-white">
    <div class="container mx-auto max-w-7xl py-10 px-6">
      <div class="min-w-7xl border border-slate-200 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-bold mb-2">Search</h3>
        <div class="mb-2">
          <input
            type="text"
            v-model="query"
            @keyup.enter="searchData"
            placeholder="Find your job by job name, city, or company..."
            class="p-3 w-full mx-auto border border-slate-200 rounded-md outline-none mr-4"
          />
        </div>
        <span
          v-if="results.length || state.resultData"
          @click="clearFilter"
          class="hover:cursor-pointer text-blue-700 hover:text-blue-900 font-semibold"
        >
          Clear Filter
        </span>
      </div>

      <div
        v-if="!state.resultData"
        class="grid grid-cols-1 md:grid-cols-40/60 w-full gap-6"
      >
        <main>
          <JobsMain
            v-for="job in results.length ? results : state.jobs"
            @jobDetail="handleJobDetail"
            :key="job.id"
            :job="job"
          />
        </main>

        <aside>
          <JobsAside
            :jobLoading="state.jobLoading"
            :job="state.job"
            @deleteJob="fetchData"
          />
        </aside>
      </div>
      <div v-else-if="state.resultData">
        <div
          class="min-w-7xl text-center text-gray-500 mx-auto border border-slate-200 p-6 rounded-lg mb-6"
        >
          No data found...
        </div>
      </div>
    </div>
  </section>

  <div v-else class="text-center m-6">
    <PulseLoader />
  </div>
</template>
