<script setup>
import axios from "axios";
import JobsVacancyAside from "./JobsVacancyAside.vue";
import JobsVacancyMain from "./JobsVacancyMain.vue";

import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const companyName = route.params.name;

const state = reactive({
  companies: [],
  job: {},
});

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/jobs");
    state.companies = response.data;
  } catch (error) {
    console.error("Error fetching data...", error);
  }
};

onMounted(() => {
  fetchData();
});

const handleJobDetail = async (id) => {
  try {
    if (window.innerWidth > 768) {
      const response = await axios.get(`http://localhost:3000/jobs/${id}`);
      state.job = response.data;
    } else {
      router.push({ name: "job", params: { id: id } });
    }
  } catch (error) {
    console.error("Error fetching data...", error);
  }
};

const companyFilter = computed(() => {
  return state.companies.filter(
    (company) => company.company.name === companyName
  );
});
</script>

<template>
  <section class="bg-white">
    <div class="container mx-auto max-w-7xl py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-40/60 w-full gap-6">
        <main>
          <JobsVacancyMain
            v-for="job in companyFilter"
            @jobDetail="handleJobDetail"
            :key="job.id"
            :job="job"
          />
        </main>

        <aside>
          <JobsVacancyAside
            :jobLoading="state.jobLoading"
            :job="state.job"
            @deleteJob="fetchData"
          />
        </aside>
      </div>
    </div>
  </section>
</template>
