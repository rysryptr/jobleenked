<script setup>
import applied from "/apply_success.svg";
</script>

<template>
  <div class="flex items-center justify-center flex-col gap-4 mt-52">
    <img :src="applied" class="w-[600px]" />
    <p class="text-xl font-bold">Quick Apply Succeeded!</p>
    <p class="text-md text-gray-700">Your application will be reviewed</p>
  </div>
</template>
