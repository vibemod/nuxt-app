<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold">Hello World</h1>
    <p class="mt-4 text-lg">Welcome to AI SPA</p>
    <p class="mt-2 text-sm text-gray-500">Backend URL: {{ config.public.backendUrl }}</p>
  </div>
</template>
