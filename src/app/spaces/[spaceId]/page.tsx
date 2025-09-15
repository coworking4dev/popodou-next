import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ENV } from '@/configs/env'
import { placeApiApi } from '@/generated/apis/PlaceApi/PlaceApi.query'

import { SpaceDetailTemplate } from './_sources/SpaceDetailTemplate'

interface Props {
  params: {
    spaceId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { spaceId } = params

  try {
    const response = await placeApiApi.getPlaceDetail({
      placeId: Number(spaceId),
    })

    const image = response.data?.photos?.filter((v) => !!v.url)?.[0]?.url

    return {
      title: 'Popodou Space | ' + response.data?.title,
      description: response.data?.subTitle,
      openGraph: {
        title: 'Popodou Space | ' + response.data?.title,
        description: response.data?.subTitle,
        images: [image || ''],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://${ENV.DOMAIN}/spaces/${spaceId}`,
      },
    }
  } catch (e) {
    return {
      title: 'Popodou Space',
      description: 'Popodou Space',
    }
  }
}

export default async function SpaceDetailPage({ params }: Props) {
  const { spaceId } = params

  try {
    // 서버에서 데이터 페칭
    const response = await placeApiApi.getPlaceDetail({
      placeId: Number(spaceId),
    })

    if (!response.data) {
      notFound()
    }

    const space = response.data

    // 클라이언트 컴포넌트에 데이터 전달
    return <SpaceDetailTemplate space={space} />
  } catch (error) {
    console.error('공간 상세 정보를 가져오는 중 오류 발생:', error)
    notFound()
  }
}
