<script setup>
import axios from 'axios'
import { computed, onMounted, reactive, ref } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Company from '../company/Company.vue';

defineProps({
  limit: Number
})

const jobs = ref([])

const state = reactive({
  isLoading: true
})

const fetchData = async () => {
  try {
    const response = await axios.get('/api/jobs')
    jobs.value = response.data
  } catch (error) {
    console.error('Error fetching data...', error)
  } finally {
    state.isLoading = false
  }
}

onMounted(() => {
  fetchData()
})

const jobCompanies = computed(() => {
  return jobs.value.reduce((acc, job) => {
    if(job.company.name) {
      if(!acc[job.company.name]) {
        acc[job.company.name] = 0
      } 
      acc[job.company.name]++
    }
    return acc
  }, {})
})

const jobCompaniesArray = computed(() => { 
  return Object.entries(jobCompanies.value).sort((a,b) => b[1] - a[1])
})
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
          <Company v-for="([job, count]) in jobCompaniesArray.slice(0, limit || jobCompaniesArray.length)" :key="job" :job="job" :count="count" />
        </div>
      </div>
    </div>
  </section>
</template>