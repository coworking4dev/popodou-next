'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  Box,
  Button,
  HStack,
  Tabs,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'

import { MasonryLayout } from '@/components/@layout/masonry-layout'
import { ROUTES } from '@/constants/routes'
import { GetAllLoungeFeedParamsFilterEnumType } from '@/generated/apis/@types/data-contracts'
import { useGetAllLoungeFeedInfiniteQuery } from '@/generated/apis/LoungeApi/LoungeApi.query'
import { useScrollDirection } from '@/hooks/useScrollDirection'

import { LoungeFeedItem } from './components/LoungeFeedItem'

export const LoungeTemplate = () => {
  const router = useRouter()

  const { scrollDirection, isAtTop } = useScrollDirection()

  const isMobile = useBreakpointValue({ base: true, sm: false })

  const searchParams = useSearchParams()

  const [selectedFilter, setSelectedFilter] = useState<
    'ALL' | 'LOUNGE' | 'POPUPS' | 'JOURNAL'
  >('ALL')

  const {
    data: lounges,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetAllLoungeFeedInfiniteQuery({
    variables: {
      query: {
        filter:
          selectedFilter === 'ALL' ? undefined : (
            (selectedFilter as GetAllLoungeFeedParamsFilterEnumType)
          ),
      },
    },
  })

  useEffect(() => {
    refetch()
    window.scrollTo(0, 0)
  }, [selectedFilter])

  useLayoutEffect(() => {
    const tab = searchParams.get('tab') as string
    if (tab && ['ALL', 'LOUNGE', 'POPUPS', 'JOURNAL'].includes(tab)) {
      setSelectedFilter(tab as 'ALL' | 'LOUNGE' | 'POPUPS' | 'JOURNAL')
    } else {
      setSelectedFilter('ALL')
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    const newTab = value as 'ALL' | 'LOUNGE' | 'POPUPS' | 'JOURNAL'
    setSelectedFilter(newTab)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('tab', newTab)
    router.push(`/lounge?${newSearchParams.toString()}`, { scroll: false })
  }

  const transform = (() => {
    if (isMobile) {
      if (isAtTop && scrollDirection === 'up') {
        return 'translateY(0)'
      }

      if (scrollDirection === 'up' && !isAtTop) {
        return 'translateY(48px)'
      }
      if (scrollDirection === 'down' && !isAtTop) {
        return 'translateY(-62px)'
      }
    }

    return 'none'
  })()

  return (
    <VStack
      align={'start'}
      position={'relative'}
      pb={{ base: '80px', sm: '120px' }}
      gap={{ base: '16px', sm: '0px' }}
      px={{ base: '20px', sm: '40px', md: '0px' }}
    >
      <VStack
        pt={{ base: '20px', md: '56px' }}
        pb={{ base: '16px', md: '20px' }}
        position={'sticky'}
        top={{ base: '0px', sm: '0px', md: '24px' }}
        zIndex={{ base: '100', md: '1' }}
        bg={'common-white'}
        w={'100%'}
        gap={'20px'}
        align={'start'}
        justifyContent={'space-between'}
        transform={transform}
        transition={'transform 0.3s ease'}
      >
        <HStack align={'center'} justify={'space-between'} w={'100%'}>
          <Text textStyle={'ko-display-4'}>Lounge</Text>
          <Button
            size={{ base: 'md', sm: 'lg' }}
            onClick={() => {
              router.push(ROUTES.LOUNGE_CREATE)
            }}
          >
            New Post
          </Button>
        </HStack>
        <Tabs.Root
          w={{ base: '100%', sm: 'auto' }}
          variant={'enclosed'}
          value={selectedFilter}
          onValueChange={({ value }) => {
            handleTabChange(value)
          }}
        >
          <Tabs.List justifyContent={'space-between'}>
            <Tabs.Trigger value="ALL">All</Tabs.Trigger>
            <Tabs.Trigger value="LOUNGE">Lounge</Tabs.Trigger>
            <Tabs.Trigger value="POPUPS">Pop-ups</Tabs.Trigger>
            <Tabs.Trigger value="JOURNAL">Journal</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </VStack>
      <Box w={'100%'}>
        <MasonryLayout
          columnsCount={3}
          gapBreakPoints={{
            base: '40px 24px',
            sm: '40px 24px',
            md: '40px 32px',
          }}
          columnsCountBreakPoints={{ base: 1, sm: 2, md: 3 }}
          onInfiniteScrollTrigger={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
          {lounges?.pages
            .flatMap((page) => page.data?.data ?? [])
            .map((lounge) => {
              return <LoungeFeedItem key={lounge.id} item={lounge} />
            })}
        </MasonryLayout>
      </Box>
    </VStack>
  )
}
