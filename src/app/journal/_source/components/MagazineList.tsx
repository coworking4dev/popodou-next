'use client'

import { useEffect, useRef, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  Box,
  Center,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  MagnifyingGlassIcon,
  XCircleIcon,
} from '@phosphor-icons/react/dist/ssr'
import { keepPreviousData } from '@tanstack/react-query'

import { MasonryLayout } from '@/components/@layout/masonry-layout'
import { LoadingWrapper } from '@/components/LoadingWrapper'
import { useGetMagazineListInfiniteQuery } from '@/generated/apis/MagazineApi/MagazineApi.query'
import { useScrollDirection } from '@/hooks/useScrollDirection'

import { MagazineItem } from './MagazineItem'

export const MagazineList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '')
  const inputRef = useRef<HTMLInputElement>(null)

  const isMobile = useBreakpointValue({ base: true, sm: false })
  const { scrollDirection, isAtTop } = useScrollDirection()

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useGetMagazineListInfiniteQuery({
      variables: {
        query: {
          keyword: keyword,
        },
      },
      options: {
        select: (data) => {
          return data?.pages.flatMap((page) => page.data?.data)
        },
        placeholderData: keepPreviousData,
      },
    })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = keyword
    }
  }, [keyword])

  // keyword가 변경될 때마다 URL query params 업데이트
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (keyword) {
      params.set('keyword', keyword)
    } else {
      params.delete('keyword')
    }

    const newUrl =
      params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }, [keyword, router, searchParams])

  const transform = (() => {
    if (isMobile) {
      if (isAtTop && scrollDirection === 'down') {
        return 'translateY(-52px)'
      }

      if (isAtTop && scrollDirection === 'up') {
        return 'translateY(0)'
      }

      if (scrollDirection === 'up' && !isAtTop) {
        return 'translateY(48px)'
      }
      if (scrollDirection === 'down' && !isAtTop) {
        return 'translateY(-52px)'
      }
    }

    return 'none'
  })()

  return (
    <VStack
      align={'start'}
      pb={{ base: '80px', sm: '120px' }}
      gap={{ base: '0px', sm: '0px' }}
      position={'relative'}
      height={'100%'}
      px={{ base: '20px', sm: '40px', md: '0px' }}
    >
      <HStack
        pt={{ base: '20px', md: '56px' }}
        pb={{ base: '16px', sm: '20px', md: '12px' }}
        position={'sticky'}
        transform={transform}
        transition={'transform 0.3s ease'}
        flexDir={{ base: 'column', sm: 'row' }}
        top={{ base: '0px', sm: '0px', md: '24px' }}
        w={'100%'}
        justifyContent={{ base: 'flex-end', sm: 'space-between' }}
        gap={'12px'}
        bg={'primary.1'}
        alignItems={{ base: 'start', md: 'end' }}
        zIndex={{ base: '100', md: '1' }}
      >
        {/* Desktop: Journal Title */}
        <Text textStyle={'ko-display-4'}>Journal</Text>
        <HStack
          gap={{ base: '8px' }}
          alignItems={'center'}
          w={{ base: '100%', sm: 'auto' }}
          as={'form'}
          onSubmit={(e) => {
            e.preventDefault()
            setKeyword(inputRef.current?.value ?? '')
            window.scrollTo(0, 0)
          }}
        >
          <Input
            w={{ base: '100%', sm: '300px' }}
            placeholder="Please search by keyword."
            size={'lg'}
            ref={inputRef}
          />
          <IconButton
            minW={'46px'}
            minH={'46px'}
            loading={isLoading}
            onClick={() => setKeyword(inputRef.current?.value ?? '')}
          >
            <MagnifyingGlassIcon size={24} />
          </IconButton>
        </HStack>
      </HStack>
      <LoadingWrapper loading={isLoading}>
        <Box w={'100%'} h={'100%'}>
          {data?.length === 0 && (
            <Center h={'100%'} flexDir={'column'} gap={'12px'}>
              <XCircleIcon color={'#8B7C74'} size={54} />
              <Text textStyle={'ko-body-4'} color={'grey.7'}>
                No results found.
              </Text>
            </Center>
          )}
          <MasonryLayout
            hasNextPage={hasNextPage}
            onInfiniteScrollTrigger={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            columnsCount={3}
            columnsCountBreakPoints={{ base: 1, sm: 1, md: 3 }}
            gap="16px"
          >
            {data?.map((item, index) => (
              <MagazineItem key={index} item={item} />
            ))}
          </MasonryLayout>
        </Box>
      </LoadingWrapper>
    </VStack>
  )
}
