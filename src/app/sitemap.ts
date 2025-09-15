import { MetadataRoute } from 'next'

import { ENV } from '@/configs/env'
import {
  getJournalIds,
  getLoungePostIds,
  getPopupIds,
  getSpaceIds,
} from '@/utils/sitemap'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = ENV.DOMAIN || 'https://localhost:3000'

  // 정적 라우트들
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/our-story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pop-ups`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lounge`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/spaces`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/find-password`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // 동적 라우트들 생성
  try {
    const [popupIds, loungeIds, spaceIds, journalIds] = await Promise.all([
      getPopupIds(),
      getLoungePostIds(),
      getSpaceIds(),
      getJournalIds(),
    ])

    const popupRoutes: MetadataRoute.Sitemap = popupIds.map((id) => ({
      url: `${baseUrl}/pop-ups/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    const loungeRoutes: MetadataRoute.Sitemap = loungeIds.map((id) => ({
      url: `${baseUrl}/lounge/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    const spaceRoutes: MetadataRoute.Sitemap = spaceIds.map((id) => ({
      url: `${baseUrl}/spaces/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    const journalRoutes: MetadataRoute.Sitemap = journalIds.map((id) => ({
      url: `${baseUrl}/journal/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [
      ...staticRoutes,
      ...popupRoutes,
      ...loungeRoutes,
      ...spaceRoutes,
      ...journalRoutes,
    ]
  } catch (error) {
    console.error('Failed to generate dynamic sitemap routes:', error)
    // API 호출 실패 시 정적 라우트만 반환
    return staticRoutes
  }
}
