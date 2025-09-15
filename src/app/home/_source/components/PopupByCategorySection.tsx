'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import { XCircleIcon } from '@phosphor-icons/react/dist/ssr'

import { MasonryLayout } from '@/components/@layout/masonry-layout'
import { CategoryTabs } from '@/components/home/CategoryTabs'
import { PopupCard, SmallPopupCard } from '@/components/home/PopupCard'
import { ROUTES } from '@/constants/routes'
import { PopupResponseDtoType } from '@/generated/apis/@types/data-contracts'
import { useGetCategoriesQuery } from '@/generated/apis/CategoryApi/CategoryApi.query'
import { useGetPopupListQuery } from '@/generated/apis/PopupApi/PopupApi.query'
import { useFavoriteQueryHandler } from '@/hooks/useFavoriteQueryHandler'

const PopupCategoryContent = ({
  popupList,
  activeCategory,
}: {
  popupList: PopupResponseDtoType[]
  activeCategory: number | undefined
}) => {
  const router = useRouter()

  const { onChangePopupLike } = useFavoriteQueryHandler()

  const [bigSpaces, smallSpaces, mixedSpaces] = useMemo(() => {
    const left: PopupResponseDtoType[] = []
    const right: PopupResponseDtoType[] = []
    const mixed: {
      popup: PopupResponseDtoType
      type: 'big' | 'small'
    }[] = []

    popupList?.forEach((item, index: number) => {
      if (index == 0 || (index >= 5 && index % 3 == 2)) {
        left.push(item)
        mixed.push({ popup: item, type: 'big' })
      } else {
        right.push(item)
        mixed.push({ popup: item, type: 'small' })
      }
    })
    return [left, right, mixed]
  }, [popupList])

  if (popupList.length === 0) {
    return (
      <Center w={'100%'} flexDir={'column'} gap="12px" h={'600px'}>
        <XCircleIcon color={'#8B7C74'} size={54} />
        <Text textStyle="ko-body-4" color="grey.7">
          No ongoing pop-ups.{' '}
        </Text>
      </Center>
    )
  }

  return (
    <Fragment>
      <Flex gap="32px" width="100%">
        <Grid
          templateColumns={'1fr'}
          gap="64px"
          width="100%"
          display={{ base: 'grid', sm: 'none' }}
        >
          {mixedSpaces.map((card, index) => (
            <PopupCard key={index} popup={card.popup} />
          ))}
        </Grid>
        <Grid
          templateColumns={{
            md: '647fr 1px 728fr',
            sm: '350fr 1px 273fr',
          }}
          gap="32px"
          width="100%"
          display={{ base: 'none', sm: 'grid' }}
        >
          <GridItem>
            <VStack gap="64px" align="start" flex="1">
              {bigSpaces?.map((card, index) => (
                <PopupCard
                  key={index}
                  popup={card}
                  onLikeClick={() => {
                    onChangePopupLike(Number(card.popupId), !card.isLike, {
                      query: {
                        category: activeCategory,
                      },
                    })
                  }}
                />
              ))}
            </VStack>
          </GridItem>
          <Box
            width="1px"
            height="100%"
            alignSelf="stretch"
            bg={'primary.2'}
            display={smallSpaces?.length > 0 ? 'block' : 'none'}
          />
          <GridItem>
            <MasonryLayout
              columnsCount={1}
              gap="64px 32px"
              columnsCountBreakPoints={{ base: 1, sm: 1, md: 2 }}
            >
              {smallSpaces?.map((card, index) => (
                <SmallPopupCard
                  key={index}
                  popup={card}
                  onLikeClick={() => {
                    onChangePopupLike(Number(card.popupId), !card.isLike, {
                      query: {
                        category: activeCategory,
                      },
                    })
                  }}
                />
              ))}
            </MasonryLayout>
          </GridItem>
        </Grid>
      </Flex>
      <Button
        size="lg"
        display={{ base: 'block', sm: 'none' }}
        variant="solid-primary"
        color="grey.0"
        onClick={() => {
          router.push(ROUTES.POPUPS + '?category=' + activeCategory || 'All')
        }}
        w="100%"
      >
        READ ALL
      </Button>
    </Fragment>
  )
}

export const PopupByCategorySection = () => {
  const [activeCategory, setActiveCategory] = useState<number | undefined>()

  const router = useRouter()

  const { data: categories } = useGetCategoriesQuery()

  const { data: popupList } = useGetPopupListQuery({
    variables: {
      query: {
        category: activeCategory,
      },
    },
  })

  useEffect(() => {
    if (categories?.data) {
      setActiveCategory(categories.data[0].categoryId)
    }
  }, [categories])

  return (
    <Container
      maxW={'1440px'}
      pt={{ base: '80px', md: '120px' }}
      pb={{ base: '80px', sm: '120px' }}
      px={{ base: '20px', sm: '40px', md: '0px' }}
    >
      <VStack gap="24px" align="start" width="100%">
        <Flex justify="space-between" align="end" width="100%" height="56px">
          <Text textStyle="ko-display-4" color="gray.900">
            Pop-ups by Category
          </Text>
          <Button
            size="lg"
            display={{ base: 'none', sm: 'block' }}
            variant="solid-primary"
            color="grey.0"
            onClick={() => {
              router.push(ROUTES.POPUPS + '?category=' + activeCategory)
            }}
          >
            READ ALL
          </Button>
        </Flex>

        <Box w={'100%'} overflowX={'auto'} display={'flex'} flexShrink={0}>
          <CategoryTabs
            categories={categories?.data ?? []}
            activeCategoryId={activeCategory?.toString() ?? ''}
            onCategoryChange={(category) => setActiveCategory(category)}
          />
        </Box>

        <PopupCategoryContent
          popupList={popupList?.data?.data ?? []}
          activeCategory={activeCategory}
        />
      </VStack>
    </Container>
  )
}
