<script setup>
import { defineProps, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  job: Object
})

const showFullDescription = ref(false)

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

const truncatedDescription = computed(() => {
  let description = props.job.description
  if(!showFullDescription.value) {
    description = description.substring(0, 90) + '...'
  }

  return description
})
</script>

<template>
  <RouterLink :to="'jobs/' + job.id" class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ job.title }}</div>
        <h3 class="text-xl font-bold">{{ job.type }}</h3>
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
        <div class="text-orange-700 mb-3">
          <i class="fa-solid fa-location-dot text-lg"></i>
          {{ job.location }}
        </div>
        <h3 class="text-yellow-500 mb-2">$ {{ job.salary }} / Year</h3>
      </div>
    </div>
  </RouterLink>
</template>