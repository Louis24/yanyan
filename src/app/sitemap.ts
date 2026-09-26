import type { MetadataRoute } from 'next'

const siteUrl = 'https://yanyan.mistressland.top'
const lastModified = new Date('2026-07-10T00:00:00.000Z')

const routes = [
  '/',
  '/age-verification',
  '/home',
  '/sessions',
  '/watch-me',
  '/a-new-era',
  '/apply-to-serve',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === '/' || route === '/home' ? 'weekly' : 'monthly',
    priority: route === '/' || route === '/home' || route === '/age-verification' ? 1 : 0.7,
  }))
}
