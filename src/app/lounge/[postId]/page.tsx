import { Suspense } from 'react'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Center, Container, Spinner } from '@chakra-ui/react'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { ENV } from '@/configs/env'
import { getQueryClient } from '@/configs/react-query/get-query-client'
import { communityPostApiApi } from '@/generated/apis/CommunityPostApi/CommunityPostApi.query'

import { PostDetailTemplate } from './_sources/PostDetailTemplate'

interface Props {
  params: {
    postId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = params

  try {
    const response = await communityPostApiApi.getCommunityPosts({
      postId: Number(postId),
    })

    const image = response.data?.images?.filter((v) => !!v.url)?.[0]?.url

    return {
      title: 'Popodou Lounge Post | ' + response.data?.nickname,
      description: response.data?.content,
      openGraph: {
        title: 'Popodou Lounge Post | ' + response.data?.nickname,
        description: response.data?.content,
        images: [image || ''],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://${ENV.DOMAIN}/lounge/${postId}`,
      },
    }
  } catch (e) {
    return {
      title: 'Popodou Lounge Post',
      description: 'Popodou Lounge Post',
    }
  }
}

export default async function LoungePostDetailPage({ params }: Props) {
  const { postId } = params

  const queryClient = getQueryClient()

  try {
    // 서버에서 데이터 존재 여부 확인
    const response = await communityPostApiApi.getCommunityPosts({
      postId: Number(postId),
    })

    if (!response.data) {
      notFound()
    }

    // 데이터가 존재하면 쿼리 캐시에 저장
    queryClient.prefetchQuery({
      queryKey: ['post', postId],
      queryFn: () =>
        communityPostApiApi.getCommunityPosts({
          postId: Number(postId),
        }),
    })

    return (
      <Container maxW={'1440px'}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense
            fallback={
              <Center h={'100vh'}>
                <Spinner />
              </Center>
            }
          >
            <PostDetailTemplate postId={postId} />
          </Suspense>
        </HydrationBoundary>
      </Container>
    )
  } catch (error) {
    notFound()
  }
}
