import { Suspense } from 'react'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Center, Spinner } from '@chakra-ui/react'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { ENV } from '@/configs/env'
import { getQueryClient } from '@/configs/react-query/get-query-client'
import { magazineApiApi } from '@/generated/apis/MagazineApi/MagazineApi.query'

import { MagazineDetailContainer } from './_source/components/MagazineDetail'

interface MagazineDetailPageProps {
  params: {
    journalId: string
  }
}

export async function generateMetadata({
  params,
}: MagazineDetailPageProps): Promise<Metadata> {
  const slug = (await params).journalId

  try {
    const post = await magazineApiApi
      .getMagazineDetail({
        magazineId: Number(slug),
      })
      .then((res) => res.data)

    return {
      title: post?.title,
      description: post?.subTitle,
      openGraph: {
        title: post?.title,
        description: post?.subTitle,
        images: [post?.thumbnail.url || ''],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://${ENV.DOMAIN}/journal/${slug}`,
      },
    }
  } catch (e) {
    return {
      title: 'Popodou Journal',
      description: 'Popodou Journal',
    }
  }
}

export default async function MagazineDetailPage({
  params,
}: MagazineDetailPageProps) {
  const { journalId } = params

  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: ['magazine', journalId],
      queryFn: () => {
        return magazineApiApi.getMagazineDetail({
          magazineId: Number(journalId),
        })
      },
    })

    return (
      <Suspense
        fallback={
          <Center>
            <Spinner />
          </Center>
        }
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MagazineDetailContainer journalId={journalId} />
        </HydrationBoundary>
      </Suspense>
    )
  } catch (e) {
    return notFound()
  }
}
