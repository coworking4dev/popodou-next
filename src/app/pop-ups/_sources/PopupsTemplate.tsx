'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Separator,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { XCircleIcon } from '@phosphor-icons/react/dist/ssr'
import { keepPreviousData } from '@tanstack/react-query'

import { CategorySelector } from '@/app/views/CategorySelector'
import { OrderBySelector } from '@/app/views/OrderBySelector'
import { ProgressSelector } from '@/app/views/ProgressSelector'
import { MasonryLayout } from '@/components/@layout/masonry-layout'
import { PopupCard, SmallPopupCard } from '@/components/home/PopupCard'
import {
  GetPopupListParamsOrderEnumType,
  GetPopupListParamsStatusEnumType,
  PopupResponseDtoType,
} from '@/generated/apis/@types/data-contracts'
import { useGetPopupListInfiniteQuery } from '@/generated/apis/PopupApi/PopupApi.query'
import { useFavoriteQueryHandler } from '@/hooks/useFavoriteQueryHandler'
import { useScrollDirection } from '@/hooks/useScrollDirection'

export const PopupsTemplate = () => {
  const { onChangePopupLike } = useFavoriteQueryHandler()

  const isMobile = useBreakpointValue({ base: true, sm: false })
  const searchParams = useSearchParams()
  const router = useRouter()
  const [category, setCategory] = useState<string>('')
  const [status, setStatus] = useState<GetPopupListParamsStatusEnumType>()
  const [orderBy, setOrderBy] = useState<GetPopupListParamsOrderEnumType>()

  const { scrollDirection, isAtTop } = useScrollDirection()

  useEffect(() => {
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const orderBy = searchParams.get('orderBy')

    if (category) {
      setCategory(category)
    }
    if (status) {
      setStatus(status as GetPopupListParamsStatusEnumType)
    }
    if (orderBy) {
      setOrderBy(orderBy as GetPopupListParamsOrderEnumType)
    }
  }, [searchParams])

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('category', category)
    newSearchParams.set('status', status || '')
    newSearchParams.set('orderBy', orderBy || '')

    router.push(`/pop-ups?${newSearchParams.toString()}`)
  }, [category, status, orderBy])

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetPopupListInfiniteQuery({
      variables: {
        query: {
          category: category ? Number(category) : undefined,
          status: status ? status : undefined,
          order: orderBy ? orderBy : undefined,
        },
      },
      options: {
        select(data) {
          return data?.pages.map((v) => v.data?.data).flat()
        },
        placeholderData: keepPreviousData,
      },
    })

  const onLikeClick = async (popup: PopupResponseDtoType, isLike: boolean) => {
    await onChangePopupLike(popup.popupId, !popup.isLike, {
      query: {
        category: category ? Number(category) : undefined,
        status: status ? status : undefined,
        order: orderBy ? orderBy : undefined,
      },
    })
  }

  const [bigPopups, smallPopups, mixedPopups] = useMemo(() => {
    const left: PopupResponseDtoType[] = []
    const right: PopupResponseDtoType[] = []
    const mixed: { popup: PopupResponseDtoType; type: 'big' | 'small' }[] = []

    data?.forEach((item, index: number) => {
      if (index == 0 || (index >= 5 && index % 3 == 2)) {
        left.push(item)
        mixed.push({ popup: item, type: 'big' })
      } else {
        right.push(item)
        mixed.push({ popup: item, type: 'small' })
      }
    })

    return [left, right, mixed]
  }, [data])

  const transform = useMemo(() => {
    if (isMobile) {
      if (isAtTop && scrollDirection === 'up') {
        return 'translateY(0)'
      }

      if (scrollDirection === 'up' && !isAtTop) {
        return 'translateY(48px)'
      }
      if (scrollDirection === 'down' && !isAtTop) {
        return 'translateY(-58px)'
      }
    }

    return 'none'
  }, [isMobile, isAtTop, scrollDirection])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [category, status, orderBy])

  return (
    <VStack
      align={'start'}
      pb={{ base: '80px', sm: '120px' }}
      px={{ base: '20px', sm: '40px', md: '0px' }}
      gap={{ base: '0px', sm: '0px' }}
      position={'relative'}
    >
      <HStack
        pt={{ base: '20px', md: '56px' }}
        pb={{ base: '12px', sm: '16px', md: '20px' }}
        position={'sticky'}
        top={{ base: '0px', sm: '0px', md: '24px' }}
        zIndex={{ base: '100', md: '1' }}
        w={'100%'}
        transform={transform}
        transition={'transform 0.3s ease'}
        justifyContent={'space-between'}
        gap={{ base: '20px', sm: '12px' }}
        bg={'primary.1'}
        alignItems={{ base: 'start', md: 'end' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Text textStyle={'ko-display-4'}>Pop-Ups</Text>
        <HStack
          gap={{ base: '8px', sm: '12px' }}
          w={{ base: '100%', md: 'auto' }}
          justifyContent={{ sm: 'space-between', md: 'start' }}
        >
          <Box w={{ base: '100%', sm: 'auto' }}>
            <ProgressSelector
              value={status}
              onChange={(e) => setStatus(e as GetPopupListParamsStatusEnumType)}
            />
          </Box>
          <HStack
            gap={{ base: '8px', sm: '12px' }}
            w={{ base: '100%', sm: 'auto' }}
          >
            <CategorySelector value={category} onChange={setCategory} />
            <OrderBySelector
              value={orderBy}
              onChange={(e) => setOrderBy(e as GetPopupListParamsOrderEnumType)}
            />
          </HStack>
        </HStack>
      </HStack>

      {data?.length === 0 ?
        <Center w={'100%'} flexDir={'column'} gap="12px" h={'600px'}>
          <XCircleIcon color={'#8B7C74'} size={54} />
          <Text textStyle="ko-body-4" color="grey.7">
            No ongoing pop-ups.{' '}
          </Text>
        </Center>
      : <Fragment>
          <VStack gap={'64px'} display={{ base: 'grid', sm: 'none' }}>
            {mixedPopups?.map((v) => {
              if (v.type === 'big') {
                return (
                  <PopupCard
                    key={'_' + v.popup.popupId}
                    popup={v.popup}
                    onLikeClick={() => onLikeClick(v.popup, v.popup.isLike)}
                  />
                )
              } else {
                return (
                  <SmallPopupCard
                    key={v.popup.popupId}
                    popup={v.popup}
                    onLikeClick={() => onLikeClick(v.popup, v.popup.isLike)}
                  />
                )
              }
            })}
          </VStack>
          <Grid
            display={{ base: 'none', sm: 'grid' }}
            templateColumns={{
              sm: '350fr 1px 273fr',
              md: '647fr 1px 720fr',
            }}
            w={'100%'}
            gap={'32px'}
          >
            <GridItem>
              <VStack gap={'64px'}>
                {bigPopups?.map((v) => {
                  return (
                    <PopupCard
                      key={'_' + v.popupId}
                      popup={v}
                      onLikeClick={() => onLikeClick(v, v.isLike)}
                    />
                  )
                })}
              </VStack>
            </GridItem>

            <GridItem display={{ base: 'none', sm: 'block' }}>
              <Separator
                display={smallPopups?.length > 0 ? 'block' : 'none'}
                orientation="vertical"
                w={'1px'}
                color={'primary.2'}
                h={'100%'}
              />
            </GridItem>
            <GridItem display={{ base: 'none', sm: 'block' }}>
              <MasonryLayout
                columnsCount={2}
                gap="64px 32px"
                columnsCountBreakPoints={{ base: 1, sm: 1, md: 2 }}
                onInfiniteScrollTrigger={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              >
                {smallPopups?.map((v) => {
                  return (
                    <SmallPopupCard
                      key={v.popupId}
                      popup={v}
                      onLikeClick={() => onLikeClick(v, v.isLike)}
                    />
                  )
                })}
              </MasonryLayout>
            </GridItem>
          </Grid>
        </Fragment>
      }
    </VStack>
  )
}
