<script setup lang="ts">
const links = [[
  {
    label: 'Home',
    to: '/'
  }
]]
</script>

<template>
  <UContainer>
    <UHeader>
      <template #title>
        AI SPA
      </template>

      <template #body>
        <UNavigationMenu :items="links" orientation="horizontal" highlight highlight-color="primary" :ui="{ item: 'group-data-[orientation=horizontal]:data-highlighted:before:rounded-full' }" />
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>
  </UContainer>
</template>
