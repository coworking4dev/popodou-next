import Image from 'next/image'

import { Box, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react'

export default function OurStoryPage() {
  return (
    <Box
      h={{ base: 'auto', md: 'calc(100dvh - 80px)' }}
      overflow={'hidden'}
      position={'relative'}
      w={'100%'}
    >
      <Grid
        templateColumns={{ base: '1fr', sm: '1fr', md: '1fr 1fr' }}
        h={'100%'}
        w={'100%'}
        position={'relative'}
      >
        {/* 왼쪽 이미지 섹션 */}
        <GridItem
          position={'relative'}
          h={{ base: '100vw', md: '100%' }}
          overflow={'hidden'}
        >
          <Box
            position={'absolute'}
            top={0}
            left={0}
            w={'100%'}
            h={'100%'}
            bgImage={'url(/images/assets/about/about.png)'}
            bgSize={'cover'}
            bgPos={'center'}
            bgRepeat={'no-repeat'}
          />

          {/* 로고 오버레이 */}
          <Flex
            position={'absolute'}
            left={'50%'}
            top={'50%'}
            transform={'translate(-50%, -50%)'}
          >
            <Image
              src={'/images/Logo.svg'}
              alt="popodou"
              width={108}
              height={24}
            />
          </Flex>
        </GridItem>

        {/* 오른쪽 텍스트 섹션 */}
        <GridItem
          h={{ base: 'auto', sm: 'auto', md: '100%' }}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          px={{ base: '20px', sm: '40px', md: '40px' }}
          py={{ base: '80px', sm: '80px', md: '0' }}
        >
          <VStack
            gap={{ base: '32px', sm: '32px', md: '32px' }}
            align={'flex-start'}
            w={'100%'}
            maxW={{ base: '100%', sm: '100%', md: '600px' }}
            textAlign={'start'}
          >
            {/* 제목 */}
            <Text textStyle={'eng-display-4'} color={'grey.10'}>
              How do you want wellness to feel in your everyday life?
            </Text>

            {/* 본문 텍스트 */}
            <VStack
              gap={{ base: '20px', sm: '20px', md: '20px' }}
              align={'flex-start'}
              w={'100%'}
            >
              <Text textStyle={'ko-body-4'} color={'grey.10'}>
                Born in Seoul, popodou is a curation platform that connects you
                with K-brands that care—about purpose, experience, and the small
                things that shape your everyday life.
              </Text>

              <Text textStyle={'ko-body-4'} color={'grey.10'}>
                We believe wellness isn&apos;t about perfection. It&apos;s about
                feeling present, light, and joyful in the spaces you move
                through and the things you choose.
              </Text>

              <Text textStyle={'ko-body-4'} color={'grey.10'}>
                From curated products that echo your rhythm, to spaces that
                breathe with the city, to communities that celebrate simple
                joy—popodou brings wellness to life in ways that are sensory,
                intentional, and yours.
              </Text>

              <Text textStyle={'ko-body-4'} color={'grey.10'}>
                This is wellness, made personal.
              </Text>

              <Text textStyle={'ko-body-3'} color={'grey.10'}>
                popodou is here—rooted in Seoul, moving with you.
              </Text>
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  )
}

//Footer 추가 필요
