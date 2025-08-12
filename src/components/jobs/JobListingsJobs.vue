<script setup>
import JobsMain from "./JobsMain.vue";
import JobsAside from "./JobsAside.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import axios from "axios";
import { reactive, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const state = reactive({
  jobs: [],
  job: {},
  isLoading: true,
  jobLoading: false,
  resultData: false,
  resultNull: false,
  mobileContent: false,
});

const query = ref(route.query.q || "");

const fetchData = async () => {
  try {
    if (query.value) {
      const response = await axios.get(
        `http://localhost:3000/jobs?q=${query.value}`
      );
      const result = response.data;

      state.resultNull = false;
      state.jobs = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query.value) ||
          job.company.name.toLowerCase().includes(query.value) ||
          job.location.toLowerCase().includes(query.value)
      );

      if (state.jobs.length < 1) {
        state.resultNull = true;

        console.log(state.resultNull);
      }
    } else {
      const response = await axios.get("http://localhost:3000/jobs");
      state.jobs = response.data;
    }
  } catch (error) {
    console.error("Error Fetching data...", error);
  } finally {
    state.isLoading = false;
  }
};

onMounted(() => {
  fetchData();
});

watch(
  () => route.query.q,
  (newVal) => {
    query.value = newVal;
    fetchData();
  }
);

const handleJobDetail = async (id) => {
  state.jobLoading = true;
  try {
    if (window.innerWidth > 768) {
      const response = await axios.get(`http://localhost:3000/jobs/${id}`);
      state.job = response.data;
    } else {
      router.push({ name: "job", params: { id: id } });
    }
  } catch (error) {
    console.error("Error Fetching Data...", error);
  } finally {
    state.jobLoading = false;
  }
};
</script>

<template>
  <section v-if="!state.isLoading && !state.resultNull" class="bg-white">
    <div class="container mx-auto max-w-7xl py-10 px-6">
      <div
        v-if="!state.resultData"
        class="grid grid-cols-1 md:grid-cols-40/60 w-full gap-6"
      >
        <main>
          <JobsMain
            v-for="job in state.jobs"
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

  <div
    v-else-if="state.resultNull"
    class="bg-white text-slate-500 max-w-[1280px] md:mx-auto w-full text-center p-6 rounded-lg border border-slate-200 mt-8"
  >
    Data Not Found! Please Search Again
  </div>

  <div v-else class="text-center m-6">
    <PulseLoader />
  </div>
</template>
