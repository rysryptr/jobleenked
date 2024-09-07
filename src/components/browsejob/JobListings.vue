<script setup>
import JobListing from '@/components/browsejob/JobListing.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { reactive, onMounted, defineProps } from 'vue'
import axios from 'axios'

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
})

const state = reactive(
  {
    jobs: [],
    isLoading: true
  }
)

onMounted( async () => {
  try {
    const response = await axios.get('/api/jobs')
    state.jobs = response.data
  } catch (error) {
    console.error('Error fetching data...', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="mx-auto max-w-7xl">
      <div class="container-xl lg:container m-auto">
        <h2 class="text-3xl font-bold text-slate-800 mb-6">
          Browse Jobs
        </h2>

        <div v-if="state.isLoading" class="text-center text-slate-500 py-6">
          <PulseLoader />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
        </div>
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block border border-black text-black text-center py-4 px-6 rounded-xl hover:bg-black hover:text-white"
      >View All Jobs</RouterLink
    >
  </section>
</template>