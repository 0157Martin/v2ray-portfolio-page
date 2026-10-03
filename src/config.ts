export type PageConfig = { template: 'portfolio' | 'resume'; domain: string; seed: string; name?: string; city?: string }

const fallback: PageConfig = { template: 'portfolio', domain: 'example.com', seed: 'preview' }

export async function loadConfig(): Promise<PageConfig> {
  try {
    const response = await fetch('./site-config.json', { cache: 'no-store', signal: AbortSignal.timeout(5000) })
    if (!response.ok) return fallback
    const value: unknown = await response.json()
    if (!value || typeof value !== 'object') return fallback
    const candidate = value as Partial<PageConfig>
    if ((candidate.template !== 'portfolio' && candidate.template !== 'resume') || typeof candidate.domain !== 'string') return fallback
    return { template: candidate.template, domain: candidate.domain, seed: typeof candidate.seed === 'string' ? candidate.seed : 'preview', name: typeof candidate.name === 'string' ? candidate.name.trim() : undefined, city: typeof candidate.city === 'string' ? candidate.city.trim() : undefined }
  } catch { return fallback }
}

function hash(value: string) { return [...value].reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0) >>> 0 }
export function choose<T>(items: readonly T[], seed: string, salt: string): T { return items[hash(`${seed}:${salt}`) % items.length] }
