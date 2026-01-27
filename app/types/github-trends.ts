export type TrendingPeriod = 'daily' | 'weekly' | 'monthly'

export interface LanguageOption {
  value: string
  label: string
}

export interface GitHubTrendingRepo {
  rank: number
  username: string
  repositoryName: string
  url: string
  description: string | null
  language: string | null
  languageColor: string | null
  totalStars: number
  forks: number
  starsSince: number
  since: TrendingPeriod
  builtBy: Array<{ username: string; avatar: string }>
}
