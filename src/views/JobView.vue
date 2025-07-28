<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios';
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const jobId = route.params.id

const state = reactive({
  job: {},
  isLoading: true
})

const deleteJob = async () => {
  try {
    const confirm = window.confirm('Are you sure to delete this data?')

    if(confirm) {
      await axios.delete(`http://localhost:3000/jobs/${jobId}`)
      toast.success('Job Deleted successfully')
      router.push('/jobs')
    }
  } catch (error) {
    console.error('Error delete Job', error)
    toast.error('Error delete Job')
  }
  
}

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/jobs/${jobId}`)
    console.log(response.data)
    state.job = response.data
    console.log(state.job)
  } catch (error) {
    console.error('Error fetching data...', error)
  } finally {
    state.isLoading = false
  }
  
})

</script>
<template>
  <div class="mx-auto max-w-7xl">

    <section v-if="!state.isLoading" class="bg-white">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 max-w-7xl w-full gap-6">
          <main>
            <div
              class="bg-white p-6 rounded-lg border border-slate-200 text-center md:text-left"
            >
              <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
              <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
              <div
                class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <p class="text-gray-500">{{ state.job.location }}</p>
              </div>

              <h3 class="text-lg font-bold mb-6">
                Job Description
              </h3>

              <p class="mb-4">
                {{ state.job.description }}
              </p>

              <h3 class="text-lg font-bold mb-2">Salary</h3>

              <p class="mb-4 text-lime-500">{{ state.job.salary }} / Year</p>

              
            </div>

            <div class="bg-white p-6 rounded-lg border border-slate-200 mt-6">
              <h2 class="text-2xl font-bold mb-4">Company Info</h2>

              <p class="text-gray-500 text-md mb-4">{{ state.job.location }}</p>

              <p class="text-lg font-bold mb-2">{{ state.job.company.name }}</p>
              <p class="text-md mb-4">{{ state.job.company.description }}</p>

              <p class="text-lg font-bold mb-2">Benefits: </p>
              <p class="text-md mb-4">
                <ul>
                  <li v-for="(benefit, index) in state.job.company.benefits" :key="index">
                    {{ benefit }}
                  </li>
                </ul>
              </p>

              <p class="text-lg font-bold mb-2">Contact Phone: </p>
              <p class="text-md mb-4">{{ state.job.company.contactPhone }}</p>
              
              <p class="text-lg font-bold mb-2">Contact Email: </p>
              <p class="text-md mb-4">{{ state.job.company.contactEmail }}</p>

              <!-- Manage -->
                <RouterLink
                  :to="'/jobs/edit/' + state.job.id"
                  class="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-8 block"
                  >Edit Job</RouterLink
                >
                <button @click="deleteJob(state.job.id)"
                  class="bg-white border border-red-600 hover:bg-red-600 text-red-600 hover:text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
            </div>
          </main>
        </div>
      </div>
    </section>
    <div v-else class="text-center text-blue-500 py-6">
      <PulseLoader />
    </div>
  </div>
</template>