'use client'

import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'

import { FOOTER_SNS_LINK } from '@/components/@layout/page-layout/constants/footer-constants'
import { LogoLogoIcon } from '@/generated/icons/MyIcons'

export const IntroduceHeroSection = () => {
  return (
    <VStack w={'100%'}>
      <Box
        w={'100%'}
        h={{ base: '620px', sm: '800px', md: '1000px' }}
        maxH={'calc(100dvh - 80px)'}
        bgImage={'url(/images/assets/home/home.png)'}
        bgSize={'cover'}
        bgPos={'center'}
        bgRepeat={'no-repeat'}
        p={{ base: '28px 20px', sm: '28px 40px', md: '30px 40px' }}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'end'}
        gap={'32px'}
      >
        <VStack gap={{ base: '32px', md: '56px' }} align={'start'}>
          <VStack gap={'32px'} align={'start'}>
            <LogoLogoIcon
              color={'accent.pink1'}
              width={{ base: '300px', sm: '650px', md: '1300px' }}
              height={{ base: '55px', sm: '120px', md: '240px' }}
            />
            <Text
              textStyle={{ base: 'eng-heading-1', sm: 'eng-heading-1' }}
              color={'accent.pink1'}
            >
              popodou is a curation platform that connects you with K-brands
              that
              {'\n'}
              care—about purpose, experience, and the small things that shape
              your everyday life.
            </Text>
          </VStack>

          <HStack w={'100%'} justify={'end'}>
            <Button
              size={'capsule-md'}
              w={{ sm: 'auto', md: 'auto' }}
              variant={'outline-grey'}
              bg={'transparent'}
              borderRadius={'100px'}
              borderColor={'accent.pink1'}
              htmlTranslate="no"
              color={'accent.pink1'}
              textStyle={'eng-heading-3'}
              onClick={() => {
                window.open(FOOTER_SNS_LINK.instagram, '_blank')
              }}
            >
              Visit Our Instagram
              <ArrowUpRightIcon />
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  )
}
