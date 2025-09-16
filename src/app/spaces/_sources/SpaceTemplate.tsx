'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Separator,
  Spinner,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { keepPreviousData } from '@tanstack/react-query'

import { useInView } from 'react-intersection-observer'

import { CategorySelector } from '@/app/views/CategorySelector'
import { MasonryLayout } from '@/components/@layout/masonry-layout'
import { GetAllPlaceResponseDtoType } from '@/generated/apis/@types/data-contracts'
import { useGetPlaceListInfiniteQuery } from '@/generated/apis/PlaceApi/PlaceApi.query'
import { useScrollDirection } from '@/hooks/useScrollDirection'

import { BigSpaceCard, SmallSpaceCard } from './components/SpaceCard'

export const SpacesTemplate = () => {
  const { ref, inView } = useInView()
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const { scrollDirection, isAtTop } = useScrollDirection()
  const [category, setCategory] = useState<string>('')

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetPlaceListInfiniteQuery({
      variables: {
        query: {
          category: category ? Number(category) : undefined,
        },
      },
      options: {
        select(data) {
          return data?.pages.map((v) => v.data?.data).flat()
        },
        placeholderData: keepPreviousData,
      },
    })

  const [bigSpaces, smallSpaces, mixedSpaces] = useMemo(() => {
    const left: GetAllPlaceResponseDtoType[] = []
    const right: GetAllPlaceResponseDtoType[] = []
    const mixed: {
      space: GetAllPlaceResponseDtoType
      type: 'big' | 'small'
    }[] = []

    data?.forEach((item, index: number) => {
      if (index == 0 || (index >= 5 && index % 3 == 2)) {
        left.push(item)
        mixed.push({ space: item, type: 'big' })
      } else {
        right.push(item)
        mixed.push({ space: item, type: 'small' })
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
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [category])

  return (
    <VStack
      align={'start'}
      position={'relative'}
      pb={{ base: '80px', sm: '120px' }}
      px={{ base: '20px', sm: '40px', md: '0px' }}
      gap={{ base: '16px', sm: '0px' }}
    >
      <HStack
        pt={{ base: '20px', md: '56px' }}
        pb={{ base: '12px', sm: '16px', md: '20px' }}
        position={'sticky'}
        top={{ base: '0px', sm: '0px', md: '24px' }}
        flexDir={{ base: 'column', sm: 'row' }}
        zIndex={{ base: '100', md: '1' }}
        w={'100%'}
        justifyContent={'space-between'}
        gap={{ base: '20px', sm: '12px' }}
        bg={'common-white'}
        alignItems={{ base: 'start', md: 'end' }}
        transform={transform}
        transition={'transform 0.3s ease'}
      >
        <Text textStyle={'ko-display-4'}>Spaces</Text>
        <Box w={{ base: '100%', sm: 'auto' }}>
          <Flex
            alignItems={'center'}
            gap={'12px'}
            justifyContent={'space-between'}
            w={{ base: '100%', sm: 'auto' }}
          >
            <Text textStyle={'ko-body-3'}>Category</Text>
            <CategorySelector value={category} onChange={setCategory} />
          </Flex>
        </Box>
      </HStack>

      <VStack gap={'64px'} display={{ base: 'grid', sm: 'none' }}>
        {mixedSpaces?.map((v) => {
          if (v.type === 'big') {
            return <BigSpaceCard key={'_' + v.space.placeId} space={v.space} />
          } else {
            return <SmallSpaceCard key={v.space.placeId} space={v.space} />
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
            {bigSpaces?.map((v) => {
              return <BigSpaceCard key={'_' + v.placeId} space={v} />
            })}
          </VStack>
        </GridItem>

        <GridItem display={{ base: 'none', sm: 'block' }}>
          <Separator
            display={smallSpaces?.length > 0 ? 'block' : 'none'}
            orientation="vertical"
            w={'1px'}
            color={'primary.2'}
            h={'100%'}
          />
        </GridItem>
        <GridItem display={{ base: 'none', sm: 'block' }}>
          <MasonryLayout
            gap="64px 32px"
            columnsCountBreakPoints={{ base: 1, sm: 1, md: 2 }}
          >
            {smallSpaces?.map((v) => {
              return <SmallSpaceCard key={v.placeId} space={v} />
            })}
          </MasonryLayout>
        </GridItem>
      </Grid>
      {isFetchingNextPage ?
        <Center h={'50px'} width={'100%'}>
          <Spinner />
        </Center>
      : <div ref={ref} />}
    </VStack>
  )
}
