'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

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
} from '@chakra-ui/react'
import { HeartIcon } from '@phosphor-icons/react/dist/ssr'

import dayjs from 'dayjs'
import { useInView } from 'react-intersection-observer'

import { LoadingWrapper } from '@/components/LoadingWrapper'
import { ROUTES } from '@/constants/routes'
import { MyPopupLikeResponseDtoType } from '@/generated/apis/@types/data-contracts'
import { useGetMyPopupLikesInfiniteQuery } from '@/generated/apis/MyPageApi/MyPageApi.query'
import { useAddPopupFavoriteMutation } from '@/generated/apis/PopupApi/PopupApi.query'

interface FavoritePopupItemProps {
  popup: MyPopupLikeResponseDtoType & { isLike: boolean }
  onLikeToggle: (popupId: number) => void
}

const FavoritePopupItem = ({ popup, onLikeToggle }: FavoritePopupItemProps) => {
  const {
    popupId,
    thumbnail,
    title,
    startDate,
    endDate,
    city,
    country,
    isLike,
  } = popup

  const formatDate = (start: string, end: string) => {
    return `${dayjs(start).format('MMMM DD[th]')} – ${dayjs(end).format('MMMM DD[th], YYYY')}`
  }

  const location = `${city}, ${country}`
  const dateRange = formatDate(startDate, endDate)

  return (
    <>
      {/* 데스크톱 버전 - 가로 레이아웃 */}
      <Box display={{ base: 'none', md: 'block' }} w="100%">
        <Link
          href={ROUTES.POPUP_DETAIL.replace('[popupId]', popupId.toString())}
        >
          <HStack
            gap="20px"
            align="start"
            w="100%"
            cursor="pointer"
            _hover={{ bg: 'grey.0' }}
            transition="background 0.2s"
            borderRadius="8px"
          >
            {/* 썸네일 이미지 */}
            <Box
              flexShrink={0}
              w="90px"
              h="90px"
              borderRadius="8px"
              overflow="hidden"
              bg="grey.2"
              position="relative"
            >
              <Image src={thumbnail.url || ''} alt={title} fill />
            </Box>

            {/* 컨텐츠 영역 */}
            <HStack gap="20px" flex="1" align="start">
              {/* 텍스트 정보 */}
              <VStack gap="12px" align="start" flex="1" h="100%">
                <Text
                  textStyle="ko-heading-2"
                  color="grey.10"
                  css={{
                    overflowWrap: 'anywhere',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {title}
                </Text>
                <VStack gap="6px" align="start">
                  <Text textStyle="ko-body-6" color="grey.8">
                    {dateRange}
                  </Text>
                  <Text textStyle="ko-body-6" color="grey.8">
                    {location}
                  </Text>
                </VStack>
              </VStack>

              {/* 좋아요 버튼 */}
              <IconButton
                aria-label="즐겨찾기"
                variant="ghost-grey"
                size="sm"
                w="42px"
                h="42px"
                borderRadius="full"
                bg="transparent"
                _hover={{ bg: 'rgba(0,0,0,0.05)' }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onLikeToggle(popupId)
                }}
              >
                <HeartIcon size={25} weight="fill" color="#8b7c74" />
              </IconButton>
            </HStack>
          </HStack>
        </Link>
      </Box>

      {/* 모바일 버전 - 세로 레이아웃 */}
      <Box display={{ base: 'block', md: 'none' }} w="100%">
        <Link
          href={ROUTES.POPUP_DETAIL.replace('[popupId]', popupId.toString())}
        >
          <VStack
            gap="20px"
            align="start"
            w="100%"
            cursor="pointer"
            _hover={{ bg: 'grey.0' }}
            transition="background 0.2s"
            borderRadius="8px"
          >
            {/* 썸네일 이미지 */}
            <Box
              w="90px"
              h="90px"
              borderRadius="8px"
              overflow="hidden"
              bg="grey.2"
              flexShrink={0}
              position="relative"
            >
              <Image src={thumbnail.url || ''} alt={title} fill />
            </Box>

            {/* 컨텐츠 영역 */}
            <VStack gap="12px" align="start" w="100%">
              {/* 제목과 좋아요 버튼 */}
              <HStack
                gap="20px"
                align="start"
                w="100%"
                justify={'space-between'}
              >
                <Text
                  textStyle="ko-heading-2"
                  color={'grey.10'}
                  css={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {title}
                </Text>

                <IconButton
                  variant="ghost-grey"
                  size="sm"
                  w="42px"
                  h="42px"
                  borderRadius="full"
                  bg="transparent"
                  flexShrink={0}
                  _hover={{ bg: 'rgba(0,0,0,0.05)' }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onLikeToggle(popupId)
                  }}
                >
                  <HeartIcon size={25} weight="fill" color="#8b7c74" />
                </IconButton>
              </HStack>

              {/* 날짜와 위치 정보 */}
              <VStack gap="6px" align="start" w="100%">
                <Text
                  textStyle="ko-body-6"
                  color="#4e5053"
                  fontSize="14px"
                  lineHeight="1.6"
                >
                  {dateRange}
                </Text>
                <Text
                  textStyle="ko-body-6"
                  color="#4e5053"
                  fontSize="14px"
                  lineHeight="1.6"
                >
                  {location}
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </Link>
      </Box>
    </>
  )
}

export const FavoritesTab = () => {
  const [removedPopupIds, setRemovedPopupIds] = useState<Set<number>>(new Set())
  const { ref, inView } = useInView()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMyPopupLikesInfiniteQuery({
      options: {
        select: (data: any) => {
          // 최신순으로 정렬 (API에서 이미 최신순으로 제공됨)
          return data?.pages.flatMap((page: any) => page.data?.data || [])
        },
        getNextPageParam: (lastPage: any) => {
          return lastPage?.data?.hasNext ? lastPage.data.cursor : undefined
        },
      },
    })

  const { mutateAsync: toggleFavorite } = useAddPopupFavoriteMutation({
    options: {
      onSuccess: () => {
        // 성공 시 리패치하지 않고 즉시 UI에서 제거
      },
    },
  })

  const handleLikeToggle = useCallback(
    async (popupId: number) => {
      try {
        // 즉시 UI에서 제거
        setRemovedPopupIds((prev: Set<number>) => new Set(prev).add(popupId))
        // API 호출로 실제 즐겨찾기 해제
        await toggleFavorite({
          popupId,
          query: { isLike: false },
        })
      } catch (error) {
        console.error('즐겨찾기 토글 실패:', error)
        // 실패 시 다시 UI에 표시
        setRemovedPopupIds((prev: Set<number>) => {
          const newSet = new Set(prev)
          newSet.delete(popupId)
          return newSet
        })
      }
    },
    [toggleFavorite],
  )

  // 제거되지 않은 팝업들만 필터링
  const favoritePopups = useMemo(() => {
    return (data || []).filter(
      (popup: MyPopupLikeResponseDtoType) =>
        !removedPopupIds.has(popup.popupId),
    )
  }, [data, removedPopupIds])

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  if (favoritePopups.length === 0) {
    return (
      <Container
        maxW="900px"
        py="28px"
        px={{ base: '16px', sm: '28px' }}
        h="100%"
      >
        <VStack gap="28px" align="start" w="100%" h="100%">
          <Text textStyle="ko-heading-2" color="grey.10">
            Favorites (Pop-ups)
          </Text>
          <VStack gap="24px" align="center" justify="center" w="100%" flex="1">
            <VStack gap="12px" align="center">
              {/* 하트 아이콘 */}
              <Box w="54px" h="54px" position="relative">
                <HeartIcon size={54} weight="regular" color="#6a6d71" />
              </Box>

              {/* 메시지 */}
              <Text textStyle="ko-body-4" color="grey.7" textAlign="center">
                No items in your wishlist.
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </Container>
    )
  }

  return (
    <Container
      maxW="900px"
      py={'28px'}
      h={'100%'}
      px={{ base: '16px', sm: '28px' }}
      pt={'28px'}
      bg={'grey.0'}
    >
      <VStack gap="28px" align="start" w="100%">
        {/* 제목 */}
        <Text textStyle="ko-heading-2" color="grey.10">
          Favorites (Pop-ups)
        </Text>

        {/* 즐겨찾기 목록 */}
        <LoadingWrapper loading={isLoading}>
          <VStack gap="20px" align="start" w="100%">
            {favoritePopups.map(
              (popup: MyPopupLikeResponseDtoType, index: number) => (
                <Box key={popup.popupId} w="100%">
                  <FavoritePopupItem
                    popup={{
                      ...popup,
                      isLike: true, // 즐겨찾기 목록이므로 항상 true
                    }}
                    onLikeToggle={handleLikeToggle}
                  />
                  {/* 구분선 - 마지막 아이템 제외 */}
                  {index < favoritePopups.length - 1 && (
                    <Box mt="20px">
                      <Separator
                        orientation="horizontal"
                        color="grey.2"
                        h="1px"
                        w="100%"
                      />
                    </Box>
                  )}
                </Box>
              ),
            )}
            {isFetchingNextPage ?
              <Center h={'50px'} width={'100%'}>
                <Spinner />
              </Center>
            : <div ref={ref} />}
          </VStack>
        </LoadingWrapper>
      </VStack>
    </Container>
  )
}
