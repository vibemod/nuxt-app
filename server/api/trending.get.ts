const API_BASE = 'https://githubtrending.lessx.xyz'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const since = (query.since as string) || 'daily'
  const language = (query.language as string) || ''

  const params = new URLSearchParams()
  if (language) params.append('language', language)
  params.append('since', since)

  const url = `${API_BASE}/trending?${params.toString()}`
  const data = await $fetch<unknown>(url)
  return Array.isArray(data) ? data : []
})
