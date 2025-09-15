import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@chakra-ui/react'

import { ENV } from '@/configs/env'
import { popupApiApi } from '@/generated/apis/PopupApi/PopupApi.query'

import { PopupDetailTemplate } from './_sources/PopupDetailTemplate'

interface Props {
  params: {
    popupId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { popupId } = params
  try {
    const response = await popupApiApi.getPopup({
      popupId: Number(popupId),
    })
    const image = response.data?.mainImage.url

    return {
      title: 'Popodou Popup | ' + response.data?.title,
      description: response.data?.description,
      openGraph: {
        title: 'Popodou Popup | ' + response.data?.title,
        description: response.data?.description,
        images: [image || ''],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://${ENV.DOMAIN}/pop-ups/${popupId}`,
      },
    }
  } catch (e) {
    return {
      title: 'Popodou Popup',
      description: 'Popodou Popup',
    }
  }
}

export default async function PopupDetailPage({ params }: Props) {
  const { popupId } = params

  try {
    await popupApiApi.getPopup({
      popupId: Number(popupId),
    })

    return (
      <Container maxW={'1440px'}>
        <PopupDetailTemplate popupId={popupId} />
      </Container>
    )
  } catch (e) {
    return notFound()
  }
}
