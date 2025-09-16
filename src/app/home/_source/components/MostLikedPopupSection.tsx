'use client'

import { useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { HeartIcon } from '@phosphor-icons/react/dist/ssr'

import { formatDateRange } from '@/app/_source/utils/date'
import { ImageAsNext } from '@/components/image-as-next'
import { ROUTES } from '@/constants/routes'
import { useGetMostLikedPopupQuery } from '@/generated/apis/HomeApi/HomeApi.query'
import { useFavoriteQueryHandler } from '@/hooks/useFavoriteQueryHandler'

const ChakraHeartIcon = chakra(HeartIcon)

export const MostLikedPopupSection = () => {
  const router = useRouter()

  const { data: popupList } = useGetMostLikedPopupQuery({})

  const { onChangePopupLike } = useFavoriteQueryHandler()

  const displayPopup = useMemo(() => {
    if (!popupList?.data?.isDisplay) {
      return []
    }
    return popupList?.data?.list?.slice(0, 4)
  }, [popupList])
  if (displayPopup?.length === 0) {
    return null
  }

  return (
    <VStack bg={'common-white'}>
      <Container
        maxW={'1440px'}
        pt={{ base: '80px', md: '120px' }}
        pb={{ base: '80px', sm: '120px' }}
        px={{ base: '20px', sm: '40px', md: '0px' }}
      >
        <VStack gap="24px" align="start" width="100%">
          <Flex justify="space-between" align="end" width="100%" height="56px">
            <Text textStyle="ko-display-4" color="gray.900">
              Top 10 Most Liked Pop-ups
            </Text>
            <Button
              display={{ base: 'none', sm: 'block' }}
              size="lg"
              variant="solid-primary"
              color="grey.0"
              onClick={() => {
                router.push(ROUTES.POPUPS + '?orderBy=MOST_LIKE')
              }}
            >
              View All
            </Button>
          </Flex>

          <Flex gap="32px" width="100%" flexDir={{ base: 'column', md: 'row' }}>
            <Grid
              templateColumns={{
                base: 'repeat(2, 1fr)',
                md: 'repeat(auto-fill, minmax(330px, 1fr))',
              }}
              gap={{ base: '16px', sm: '32px' }}
              width="100%"
            >
              {displayPopup?.map((popup, index) => (
                <GridItem key={index} cursor={'pointer'}>
                  <Link
                    href={ROUTES.POPUPS + '/' + popup.popupId}
                    style={{ width: '100%' }}
                  >
                    <VStack
                      gap={'12px'}
                      width={'100%'}
                      height={'100%'}
                      align={'start'}
                    >
                      <VStack
                        align={'start'}
                        gap={'12px'}
                        position="relative"
                        width={'100%'}
                      >
                        <ImageAsNext
                          borderRadius={'8px'}
                          src={popup.imageInfo.url || ''}
                          alt={popup.title}
                          w={'100%'}
                          height={{ sm: '336px' }}
                          aspectRatio={{ base: '1/1' }}
                          objectFit="cover"
                        />
                        <IconButton
                          variant="ghost-primary"
                          width={{ base: '32px', sm: '42px' }}
                          height={{ base: '32px', sm: '42px' }}
                          position="absolute"
                          bottom={{ base: '10px', sm: '16px' }}
                          right={{ base: '10px', sm: '16px' }}
                          _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onChangePopupLike(popup.popupId, !popup.isLike, {})
                          }}
                        >
                          <ChakraHeartIcon
                            width={{ base: '20px', sm: '28px' }}
                            height={{ base: '20px', sm: '28px' }}
                            weight={popup.isLike ? 'fill' : 'regular'}
                            color={popup.isLike ? 'red' : 'white'}
                          />
                        </IconButton>
                      </VStack>
                      <VStack align={'start'} gap={'16px'}>
                        <Text textStyle={'ko-heading-2'}>{popup.title}</Text>
                        <VStack align={'start'} gap={'6px'}>
                          <Text textStyle={'ko-body-6'} color={'grey.8'}>
                            {formatDateRange(popup.startDate, popup.endDate)}
                          </Text>
                          <Text textStyle={'ko-body-6'} color={'grey.8'}>
                            {popup.city}, {popup.country}
                          </Text>
                        </VStack>
                      </VStack>
                    </VStack>
                  </Link>
                </GridItem>
              ))}
            </Grid>
            <Button
              size="lg"
              variant="solid-primary"
              color="grey.0"
              w="100%"
              display={{ base: 'block', sm: 'none' }}
              onClick={() => {
                router.push(ROUTES.POPUPS + '?orderBy=MOST_LIKE')
              }}
            >
              View All
            </Button>
          </Flex>
        </VStack>
      </Container>
    </VStack>
  )
}
