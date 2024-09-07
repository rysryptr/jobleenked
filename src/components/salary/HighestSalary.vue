<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import SalaryCards from './SalaryCards.vue'

import { reactive, onMounted, defineProps, computed } from 'vue'
import axios from 'axios'

defineProps({
  limit: Number
})

const state = reactive({
  jobs: [],
  isLoading: false
})

const sortedSalary = computed(() => {
  return state.jobs.slice().sort((a, b) => { // slice() membuat salinan dari array state.job
    const getSalaryMax = (salary) => {
      const match = salary.match(/\d+/g) // metode regex mencari semua urutan angka dalam string salary 
      return parseInt(match[1] * 1000) // ambil angka kedua dan konversi ke full value
    }

    return getSalaryMax(b.salary) - getSalaryMax(a.salary)
  })
})

onMounted( async () => {
  try {
    const response = await axios.get('/api/jobs')
    state.jobs = response.data
  } catch (error) {
    
  }
})
</script>

<template>
  <section class="px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-slate-800 mb-6">
        Highest Salary Job
      </h2>

      <div v-if="state.isLoading" class="text-center text-slate-500 py-6">
        <PulseLoader />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SalaryCards v-for="job in sortedSalary.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
      </div>
    </div>
  </section>
</template>