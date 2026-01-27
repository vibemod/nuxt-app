import { ref, computed, watch } from 'vue'
import type { GitHubTrendingRepo, TrendingPeriod, LanguageOption } from '~/types/github-trends'

const TRENDING_API = 'https://githubtrending.lessx.xyz/trending'

export function useGitHubTrends() {
  const repos = ref<GitHubTrendingRepo[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedLanguage = ref('')
  const selectedPeriod = ref<TrendingPeriod>('daily')

  // Cache to avoid excessive API calls
  const cache = new Map<string, { data: GitHubTrendingRepo[]; timestamp: number }>()
  const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  const popularLanguages: LanguageOption[] = [
    { value: '', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'c++', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'c#', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'dart', label: 'Dart' },
    { value: 'vue', label: 'Vue' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'shell', label: 'Shell' },
  ]

  const periodOptions: Array<{ value: TrendingPeriod; label: string }> = [
    { value: 'daily', label: 'Today' },
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
  ]

  const getCacheKey = (language: string, since: TrendingPeriod): string => {
    return `${language || 'all'}-${since}`
  }

  const fetchTrendingRepos = async (language: string = '', since: TrendingPeriod = 'daily') => {
    const cacheKey = getCacheKey(language, since)
    const cached = cache.get(cacheKey)

    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      repos.value = cached.data
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const params = new URLSearchParams()
      params.append('since', since)
      if (language) params.append('language', language)
      const raw = await $fetch<unknown>(`https://cors-anywhere.com/${TRENDING_API}?${params.toString()}`)
      const data = Array.isArray(raw) ? raw : []

      // Transform API response to match our GitHubTrendingRepo interface
      const processedData: GitHubTrendingRepo[] = data.map((repo: {
        builders: Array<{ profile: string; avatar: string }>
        repository: string
        name: string
        description: string | null
        language: string | null
        stars: string
        forks: string
        increased: string
      }, index: number) => {
        const parts = repo.name.split('/')
        const username = parts[0] ?? ''
        const repositoryName = parts[1] ?? ''
        // Parse stars/forks which may contain commas (e.g., "96,500")
        const parseNumber = (str: string) => parseInt(str.replace(/,/g, ''), 10) || 0
        // Parse "361 stars today" -> 361
        const parseStarsSince = (str: string) => {
          const match = str.match(/^(\d+)/)
          return match ? parseInt(match[1] ?? '0', 10) : 0
        }

        return {
          rank: index + 1,
          username,
          repositoryName,
          url: repo.repository,
          description: repo.description,
          language: repo.language,
          languageColor: null,
          totalStars: parseNumber(repo.stars),
          forks: parseNumber(repo.forks),
          starsSince: parseStarsSince(repo.increased || ''),
          since,
          builtBy: repo.builders?.map(b => ({
            username: b.profile?.replace('https://github.com/', '') ?? '',
            avatar: b.avatar,
          })) || [],
        }
      })

      repos.value = processedData

      // Update cache
      cache.set(cacheKey, { data: processedData, timestamp: Date.now() })
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      repos.value = []
    }
    finally {
      isLoading.value = false
    }
  }

  const refresh = () => {
    // Clear cache for current selection and refetch
    const cacheKey = getCacheKey(selectedLanguage.value, selectedPeriod.value)
    cache.delete(cacheKey)
    fetchTrendingRepos(selectedLanguage.value, selectedPeriod.value)
  }

  // Watch for filter changes
  watch([selectedLanguage, selectedPeriod], ([language, period]) => {
    fetchTrendingRepos(language as string, period as TrendingPeriod)
  })

  const periodLabel = computed(() => {
    switch (selectedPeriod.value) {
      case 'daily': return 'today'
      case 'weekly': return 'this week'
      case 'monthly': return 'this month'
      default: return 'today'
    }
  })

  // Initial fetch
  fetchTrendingRepos(selectedLanguage.value, selectedPeriod.value)

  return {
    repos,
    isLoading,
    error,
    selectedLanguage,
    selectedPeriod,
    popularLanguages,
    periodOptions,
    periodLabel,
    refresh,
  }
}
