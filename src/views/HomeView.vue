<script setup>
import Hero from "@/components/Hero.vue";
import HomeCards from "@/components/HomeCards.vue";
import Companies from "@/components/company/Companies.vue";
import HighestSalary from "@/components/salary/HighestSalary.vue";
import JobListings from "@/components/browsejob/JobListings.vue";
</script>

<template>
  <!-- <Hero /> -->
  <Companies :limit="4" />
  <HighestSalary :limit="3" />
  <JobListings :limit="3" :showButton="true" />
</template>
