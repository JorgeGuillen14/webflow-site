import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://velarix.ai"
  const now = new Date().toISOString()

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/kaptureops`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/request-demo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/book-demo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]
}
