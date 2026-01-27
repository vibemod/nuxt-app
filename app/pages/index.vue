<script setup lang="ts">
const {
  repos,
  isLoading,
  error,
  selectedLanguage,
  selectedPeriod,
  popularLanguages,
  periodOptions,
  periodLabel,
  refresh,
} = useGitHubTrends()
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-2xl font-bold">
        GitHub Trends
      </h1>
      <div class="flex flex-wrap items-center gap-3">
        <USelectMenu
          v-model="selectedLanguage"
          :items="popularLanguages"
          value-key="value"
          class="w-44"
        />
        <USelectMenu
          v-model="selectedPeriod"
          :items="periodOptions"
          value-key="value"
          class="w-40"
        />
        <UButton
          icon="i-heroicons-arrow-path"
          variant="outline"
          :loading="isLoading"
          @click="refresh()"
        >
          Refresh
        </UButton>
      </div>
    </div>

    <UAlert
      v-if="error"
      color="error"
      :title="error"
      icon="i-heroicons-exclamation-triangle"
    />

    <div v-else-if="isLoading && repos.length === 0" class="space-y-4">
      <div v-for="i in 10" :key="i" class="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <USkeleton class="h-10 w-10 rounded-full shrink-0" />
        <div class="flex-1 space-y-2">
          <USkeleton class="h-5 w-48" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-3/4" />
        </div>
      </div>
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="repo in repos"
        :key="repo.url"
        class="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
      >
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400">
          {{ repo.rank }}
        </span>
        <div class="min-w-0 flex-1">
          <a
            :href="repo.url"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
          >
            {{ repo.username }} / {{ repo.repositoryName }}
          </a>
          <p v-if="repo.description" class="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {{ repo.description }}
          </p>
          <div class="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <UBadge v-if="repo.language" size="xs" variant="subtle">
              {{ repo.language }}
            </UBadge>
            <span>{{ repo.totalStars.toLocaleString() }} stars</span>
            <span>{{ repo.starsSince }} stars {{ periodLabel }}</span>
            <span>{{ repo.forks.toLocaleString() }} forks</span>
            <div v-if="repo.builtBy?.length" class="flex items-center gap-1">
              <span>Built by</span>
              <div class="flex -space-x-1.5">
                <UAvatar
                  v-for="user in repo.builtBy.slice(0, 5)"
                  :key="user.username"
                  :src="user.avatar"
                  :alt="user.username"
                  size="xs"
                  class="ring-2 ring-white dark:ring-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
