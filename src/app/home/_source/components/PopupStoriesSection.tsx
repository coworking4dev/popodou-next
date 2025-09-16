'use client'

import { Fragment } from 'react'

import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react'
import { XCircleIcon } from '@phosphor-icons/react/dist/ssr'

import { StoryCard } from '@/components/home/StoryCard'
import { ROUTES } from '@/constants/routes'
import { PopupStoriesResponseType } from '@/generated/apis/@types/data-contracts'
import { useGetPopupStoriesQuery } from '@/generated/apis/HomeApi/HomeApi.query'

export const PopupStoriesContent = ({
  stories,
}: {
  stories: PopupStoriesResponseType[] | undefined
}) => {
  const router = useRouter()

  if (stories?.length === 0 || !stories) {
    return (
      <Center w={'100%'} flexDir={'column'} gap="12px" h={'600px'}>
        <XCircleIcon color={'#8B7C74'} size={54} />
        <Text textStyle="ko-body-4" color="grey.7">
          No ongoing stories.
        </Text>
      </Center>
    )
  }

  return (
    <Fragment>
      <Flex
        gap="32px"
        width="100%"
        align="stretch"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Box flex={530} display={'flex'}>
          {stories?.[0] && <StoryCard story={stories?.[0]} />}
        </Box>
        <Box flex={880} display={'flex'}>
          {stories?.[1] && <StoryCard story={stories?.[1]} variant="large" />}
        </Box>
      </Flex>

      <Flex
        gap="32px"
        width="100%"
        align="stretch"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Box flex={880} display={'flex'}>
          {stories?.[2] && <StoryCard story={stories?.[2]} variant="large" />}
        </Box>

        <Box flex={530} display={'flex'}>
          {stories?.[3] && <StoryCard story={stories?.[3]} />}
        </Box>
      </Flex>
      <Button
        size="lg"
        variant="solid-primary"
        color="grey.0"
        display={{ base: 'block', sm: 'none' }}
        w="100%"
        onClick={() => {
          router.push(ROUTES.JOURNAL)
        }}
      >
        View All
      </Button>
    </Fragment>
  )
}

export const PopupStoriesSection = () => {
  const router = useRouter()

  const { data: stories } = useGetPopupStoriesQuery({
    options: {
      select: (data) => data?.data,
    },
  })

  console.log(stories)

  return (
    <Container
      pb={'120px'}
      pt={{ base: '80px', md: '120px' }}
      px={{ base: '20px', sm: '40px', md: '0px' }}
      bg={'secondary.2'}
      display={'flex'}
      alignItems={'center'}
      flexDir={'column'}
      maxW={'none'}
    >
      <VStack gap="32px" align="start" width="100%" maxW={'1440px'}>
        <Flex justify="space-between" align="end" width="100%" height="56px">
          <Text textStyle="ko-display-4" color="gray.900">
            Pop-ups Stories
          </Text>
          <Button
            size="lg"
            variant="solid-primary"
            color="grey.0"
            display={{ base: 'none', sm: 'block' }}
            onClick={() => {
              router.push(ROUTES.JOURNAL)
            }}
          >
            View All
          </Button>
        </Flex>
        <PopupStoriesContent stories={stories} />
      </VStack>
    </Container>
  )
}
