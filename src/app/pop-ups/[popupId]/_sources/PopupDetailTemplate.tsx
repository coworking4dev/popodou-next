'use client'

import {
  Box,
  Center,
  Container,
  HStack,
  IconButton,
  Separator,
  Spinner,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  CalendarBlankIcon,
  LinkIcon,
  MapPinIcon,
  ShareNetworkIcon,
} from '@phosphor-icons/react/dist/ssr'
import { isNotNullish } from '@toktokhan-dev/universal'

import { getCategoryBadgeStyle } from '@/app/_source/helper/category'
import { getStatusBadgeStyle } from '@/app/_source/helper/lounge'
import {
  formatDateRange,
  formatLocalTime,
  formatTimeRange,
} from '@/app/_source/utils/date'
import { EditorContentBlock } from '@/app/spaces/[spaceId]/_sources/components/EditorContentBlock'
import { HeartIconButton } from '@/app/views/HeartButton'
import { CommentArea } from '@/app/views/comments/CommentArea'
import { CustomBadge } from '@/components/CustomBadge'
import { ImageAsNext } from '@/components/image-as-next'
import { showToast } from '@/components/ui/toaster'
import { GetPopupResponseDtoType } from '@/generated/apis/@types/data-contracts'
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useGetPopupQuery,
} from '@/generated/apis/PopupApi/PopupApi.query'
import { useFavoriteQueryHandler } from '@/hooks/useFavoriteQueryHandler'

import { PopupPriceBox } from './components/PopupPriceBox'

interface Props {
  popupId: string
}

const IconsArea = ({
  onLikeClick,
  isMobile,
  popup,
}: {
  onLikeClick: () => void
  isMobile?: boolean
  popup?: GetPopupResponseDtoType
}) => {
  const iconSize = useBreakpointValue({ base: 24, sm: 28, md: 32 })

  return (
    <HStack>
      <IconButton
        variant={'ghost-grey'}
        w={{ base: '24px', sm: '28px', md: '40px' }}
        h={{ base: '24px', sm: '28px', md: '40px' }}
      >
        <HeartIconButton
          onClick={onLikeClick}
          isLike={popup?.isLike}
          color={'#8B7C74'}
          size={iconSize}
        />
      </IconButton>
      <IconButton
        onClick={() => {
          if (
            navigator.canShare({
              url: window.location.href,
            }) &&
            isMobile
          ) {
            navigator.share({
              url: window.location.href,
            })
          } else {
            navigator.clipboard.writeText(window.location.href)
            showToast({
              type: 'success',
              description: 'Link copied.',
            })
          }
        }}
        variant={'ghost-grey'}
        w={{ base: '24px', sm: '28px', md: '40px' }}
        h={{ base: '24px', sm: '28px', md: '40px' }}
      >
        {isMobile ?
          <ShareNetworkIcon size={iconSize} color={'#8B7C74'} />
        : <LinkIcon size={iconSize} color={'#8B7C74'} />}
      </IconButton>
    </HStack>
  )
}

export const PopupDetailTemplate = ({ popupId }: Props) => {
  const { onChangePopupLike } = useFavoriteQueryHandler()
  const isBase =
    useBreakpointValue({ base: true, sm: false, md: false }) || false

  const { data: popup } = useGetPopupQuery({
    variables: {
      popupId: Number(popupId),
    },
    options: {
      select: (data) => data.data,
    },
  })

  const date = formatDateRange(popup?.startDate, popup?.endDate)

  const openTimeFormatted = formatLocalTime(popup?.openTime)
  const closeTimeFormatted = formatLocalTime(popup?.closeTime)

  const time = formatTimeRange(openTimeFormatted, closeTimeFormatted)

  const onLikeClick = async () => {
    if (!isNotNullish(popup?.isLike)) return
    await onChangePopupLike(Number(popupId), !popup.isLike, {})
  }

  if (!popup) {
    return (
      <Center h={'100vh'}>
        <Spinner />
      </Center>
    )
  }

  return (
    <Box
      width="100%"
      pb={{ base: '80px', sm: '120px' }}
      px={{ base: '20px', sm: '40px', md: '0px' }}
    >
      <Container maxW="1440px" px="0">
        <VStack
          gap={{ base: '28px', sm: '40px' }}
          align="stretch"
          w={'100%'}
          pt={{ base: '20px', md: '56px' }}
        >
          <ImageAsNext
            src={popup?.mainImage.url || ''}
            alt={popup?.title || ''}
            height={'calc(80vh - 176px)'}
            objectFit={'cover'}
            w={'100%'}
          />
          <HStack
            w={'100%'}
            align={'start'}
            gap={{ base: '28px', sm: '40px' }}
            justify={'space-between'}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <VStack w={'100%'} align={'start'} gap={'16px'}>
              <HStack
                align={'start'}
                gap="6px"
                w={'100%'}
                justify={'space-between'}
              >
                <HStack align={'start'} gap="6px">
                  {popup?.status && (
                    <CustomBadge
                      {...getStatusBadgeStyle(popup?.status)}
                      textStyle={'ko-body-3'}
                    />
                  )}
                  {popup?.category && (
                    <CustomBadge
                      {...getCategoryBadgeStyle(popup?.category)}
                      textStyle={'ko-body-3'}
                    />
                  )}
                </HStack>
                <Box display={{ base: 'block', md: 'none' }}>
                  <IconsArea onLikeClick={onLikeClick} popup={popup} isMobile />
                </Box>
              </HStack>
              <HStack align={'start'} gap="6px" justify={'space-between'}>
                <Text textStyle={'ko-heading-1'} overflowWrap={'anywhere'}>
                  {popup?.title || ''}
                </Text>
                <Box display={{ base: 'none', md: 'block' }}>
                  <IconsArea onLikeClick={onLikeClick} popup={popup} />
                </Box>
              </HStack>
              <VStack gap={{ base: '28px', sm: '32px' }} align={'start'}>
                <Text textStyle={'ko-body-2'}>{popup?.description || ''}</Text>
                <VStack gap={'20px'} w={'100%'} align={'start'}>
                  <HStack
                    gap={'8px'}
                    align={{ base: 'flex-start', sm: 'center' }}
                  >
                    <CalendarBlankIcon size={isBase ? 24 : 28} />
                    <HStack
                      gap={{ base: '6px', sm: '12px' }}
                      align={{ base: 'flex-start', sm: 'center' }}
                      flexDir={{ base: 'column', sm: 'row' }}
                    >
                      <Text textStyle={'ko-heading-3'}>{date}</Text>
                      <Separator
                        display={{ base: 'none', sm: 'block' }}
                        orientation={'vertical'}
                        color={'grey.3'}
                        height={'24px'}
                      />
                      <Text textStyle={'ko-heading-3'}>{time}</Text>
                    </HStack>
                  </HStack>
                  <HStack>
                    <MapPinIcon size={isBase ? 24 : 28} />
                    <Text textStyle={'ko-heading-3'}>
                      {[popup?.addressLine, popup?.city, popup?.country]
                        .filter(Boolean)
                        .join(', ')}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
            <Box w={{ base: '100%', md: 'auto' }}>
              <PopupPriceBox popup={popup} />
            </Box>
          </HStack>
          <Box height="1px" bg="grey.3" />
          <EditorContentBlock content={popup?.detailPage || ''} />
          <Box height="1px" bg="grey.3" />
          <CommentArea
            id={popupId}
            viewCount={popup?.viewCount}
            useGetCommentsQuery={useGetCommentsQuery}
            useAddCommentMutation={useAddCommentMutation}
            useDeleteCommentMutation={useDeleteCommentMutation}
            getCommentsVariables={(
              id: string,
              page: number,
              pageSize: number,
              options?: any,
            ) => ({
              variables: {
                popupId: Number(id),
                query: {
                  page,
                  pageSize,
                },
              },
              options,
            })}
            addCommentVariables={(id: string, comment: string) => ({
              popupId: Number(id),
              data: {
                comment,
              },
            })}
            deleteCommentVariables={(id: string, commentId: number) => ({
              popupId: Number(id),
              commentId,
            })}
          />
        </VStack>
      </Container>
    </Box>
  )
}
