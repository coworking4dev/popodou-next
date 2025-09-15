'use client'

import { useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  Box,
  BoxProps,
  Image as ChakraImage,
  HStack,
  IconButton,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react'
import { HeartIcon } from '@phosphor-icons/react/dist/ssr'

import dayjs from 'dayjs'

import { getCategoryBadgeStyle } from '@/app/_source/helper/category'
import { getStatusBadgeStyle } from '@/app/_source/helper/lounge'
import { ROUTES } from '@/constants/routes'
import {
  PopupResponseDtoType,
  ThisMonthPopupResponseType,
} from '@/generated/apis/@types/data-contracts'

import { CustomBadge } from '../CustomBadge'

interface PopupCardProps {
  titleTextStyle?: TextProps['textStyle']
  popup: PopupResponseDtoType | ThisMonthPopupResponseType
  onLikeClick?: () => void
  height?: BoxProps['height']
}

export const PopupCard = ({
  popup,
  onLikeClick,
  titleTextStyle,
  height,
}: PopupCardProps) => {
  const { thumbnail, title, startDate, endDate, city, country, isLike } = popup

  const [aspectRatio, setAspectRatio] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const ref = useRef<HTMLDivElement>(null)

  const date =
    dayjs(startDate).format('MMMM DD[th]') +
    ' – ' +
    dayjs(endDate).format('MMMM DD[th], YYYY')
  const location = `${city}, ${country}`

  return (
    <Link
      href={ROUTES.POPUP_DETAIL.replace('[popupId]', popup.popupId.toString())}
      style={{
        width: '100%',
      }}
    >
      <Box
        opacity={isLoading ? 0 : 1}
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        width={'100%'}
        height={isLoading ? '70vh' : height || 'auto'}
        minH={'fit-content'}
        cursor={'pointer'}
        aspectRatio={height ? 'auto' : aspectRatio || ''}
        _hover={{
          '& > img': {
            filter: 'blur(7.5px)',
          },
        }}
      >
        <Image
          src={thumbnail.url ?? ''}
          alt={title || ''}
          width={1440}
          height={810}
          onLoadingComplete={(e) => {
            const { naturalWidth, naturalHeight } = e

            if (naturalHeight > naturalWidth) {
              setAspectRatio(`${e.naturalWidth} / ${e.naturalHeight}`)
            } else {
              const { height, width } =
                ref.current?.getBoundingClientRect() || {}

              if (height) {
                setAspectRatio(`${e.naturalWidth} / ${height}`)
              }

              if (width) {
                setAspectRatio(`${width} / ${e.naturalHeight}`)
              }
            }

            setIsLoading(false)
          }}
          sizes="100vw"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <Box
          width={'100%'}
          position={'relative'}
          height={'100%'}
          display={'flex'}
          ref={ref}
          flexDirection={'column'}
          justifyContent={'end'}
        >
          <VStack
            align="start"
            gap="8px"
            p={'20px'}
            bg={'linear-gradient(transparent, rgba(0,0,0,0.7))'}
          >
            <HStack gap={'6px'}>
              <CustomBadge {...getStatusBadgeStyle(popup.status)} />
              <CustomBadge {...getCategoryBadgeStyle(popup.category)} />
            </HStack>
            <VStack align="start" gap="20px" width="100%">
              <Text
                textStyle={titleTextStyle || 'ko-display-4'}
                color="white"
                overflowWrap={'anywhere'}
              >
                {title}
              </Text>

              <HStack justify="space-between" width="100%" align={'end'}>
                <VStack align="start" gap="6px" flex="1">
                  <Text textStyle={'ko-body-4'} color="grey.1">
                    {date}
                  </Text>
                  <Text textStyle={'ko-body-4'} color="grey.1">
                    {location}
                  </Text>
                </VStack>

                <IconButton
                  aria-label="좋아요"
                  variant="ghost-primary"
                  width={'42px'}
                  height={'42px'}
                  _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onLikeClick?.()
                  }}
                >
                  <HeartIcon
                    size={28}
                    weight={isLike ? 'fill' : 'regular'}
                    color={isLike ? 'red' : 'white'}
                  />
                </IconButton>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </Link>
  )
}

// Small card variant for sidebar
export const SmallPopupCard = ({
  popup,
  onLikeClick,
}: {
  popup: PopupResponseDtoType
  onLikeClick?: () => void
}) => {
  const {
    thumbnail,
    description,
    title,
    isLike,
    startDate,
    endDate,
    city,
    country,
  } = popup

  const date =
    dayjs(startDate).format('MMMM DD[th]') +
    ' – ' +
    dayjs(endDate).format('MMMM DD[th], YYYY')
  const location = `${city}, ${country}`

  return (
    <Link
      href={ROUTES.POPUP_DETAIL.replace('[popupId]', popup.popupId.toString())}
    >
      <Box position="relative" width="100%" cursor={'pointer'}>
        <Box
          position="relative"
          borderRadius="lg"
          width="100%"
          overflow="hidden"
        >
          <ChakraImage
            src={thumbnail.url}
            alt={title || ''}
            width={0}
            height={0}
            objectFit="cover"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          <IconButton
            variant="ghost-primary"
            size="sm"
            width="42px"
            height="42px"
            position="absolute"
            bottom="20px"
            right="20px"
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onLikeClick?.()
            }}
          >
            <HeartIcon
              size={28}
              weight={isLike ? 'fill' : 'regular'}
              color={isLike ? 'red' : 'white'}
            />
          </IconButton>
        </Box>
        <VStack align="start" mt="12px" gap={'0px'}>
          <HStack gap={'6px'}>
            <CustomBadge {...getStatusBadgeStyle(popup.status)} />
            <CustomBadge {...getCategoryBadgeStyle(popup.category)} />
          </HStack>
          <VStack align="start" gap="12px" width="100%" mt={'6px'}>
            <Text textStyle="ko-heading-2" color="grey.10">
              {title}
            </Text>

            {description && (
              <Text textStyle="ko-body-6" color="grey.9">
                {description}
              </Text>
            )}
          </VStack>
          <VStack align="start" gap="6px" mt={'20px'}>
            <Text textStyle="ko-body-6" color="grey.8">
              {date}
            </Text>
            <Text textStyle="ko-body-6" color="grey.8">
              {location}
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Link>
  )
}
