<script setup>
import { defineProps, computed, ref} from 'vue';

const props = defineProps({
  job: Object
})

const showFullDescription = ref(false)

const truncatedDescription = computed(() => {
  let description = props.job.description
  if(!showFullDescription.value) {
    description = description.substring(0, 120) + '...'
  }

  return description
})

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-lg text-gray-600 mb-4">{{ job.company.name }}</div>
        <RouterLink :to="'jobs/' + job.id" class="text-3xl font-bold mb-4">{{ job.title }}</RouterLink>
        <h3 class="text-gray-500 mb-4 mt-4">{{ job.location }}</h3>
      </div>

      <div class="mb-5">
        <div>
          {{ truncatedDescription }}
        </div>
        <button @click="toggleFullDescription" class="text-sky-500 hover:text-sky-600">
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>
      
      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-gray-700 mb-3">
          <i class="fa-solid fa-location-dot text-lg"></i>
          {{ job.type }}
        </div>
        <h3 class="text-lime-500 mb-2">{{ job.salary }} / Year</h3>
      </div>
    </div>
  </div>
</template>