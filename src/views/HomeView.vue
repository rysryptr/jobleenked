<script setup>
import Hero from '@/components/Hero.vue'
import HomeCards from '@/components/HomeCards.vue'
import Companies from '@/components/company/Companies.vue'
import HighestSalary from '@/components/salary/HighestSalary.vue'
import JobListings from '@/components/browsejob/JobListings.vue'
</script>

<template>
  <!-- <Hero /> -->
  <Companies :limit="4"/>
  <div class="max-w-7xl mx-auto">
    <HighestSalary :limit="3" />
  </div>
  <JobListings :limit="3" :showButton="true" />
</template>