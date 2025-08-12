<script setup>
import { reactive, onMounted, ref, onBeforeUnmount } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import axios from 'axios'

const route = useRoute()
const jobId = route.params.id

const state = reactive({
  job: {},
  isLoading: true
})

const scrollY = ref(0)
const topOffSet = ref('top-30')
const position = ref('absolute')

const toast = useToast()

const handleScroll = () => {
  scrollY.value = window.scrollY
  
  if(scrollY.value > 100) {
    topOffSet.value = 'top-24'
    position.value = 'fixed'
  } else {
    topOffSet.value = 'top-30'
    position.value = 'absolute'
  }
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)

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

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
  <aside>

    <div
      :class="['transition-all duration-300',topOffSet, position]"
      class="fixed bg-white md:max-w-[490px] lg:max-w-[730px] w-full hidden md:block h-full overflow-y-auto p-6 rounded-lg border border-slate-200 mr-60 mb-20">
      <div v-if="isLoading" class="text-center m-6">
        <PulseLoader />
      </div>

      <div v-else>
        <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
        <div class="text-lg text-gray-600 mb-4">{{ state.job.company.name }}</div>
        <h3 class="text-slate-400 mb-4">{{ state.job.type }}</h3>

        <p class="mb-4">
          {{ state.job.description }}
        </p>

        <p class="text-lg font-bold mb-2">Salary</p>
        <p class="text-lime-500 text-md mb-4">{{ state.job.salary }}</p>

        <div class="border border-gray-100 mb-5"></div>

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
            to="/applied"
            class="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-8 block"
            >Quick Apply</RouterLink>
      </div>
    </div>
  </aside>
</template>