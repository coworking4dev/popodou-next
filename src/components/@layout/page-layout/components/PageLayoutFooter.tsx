'use client'

import Link from 'next/link'

import {
  Button,
  Flex,
  FlexProps,
  HStack,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react'
import { ArrowUpRightIcon as ArrowUpRightIconOriginal } from '@phosphor-icons/react/dist/ssr'

import { ROUTES } from '@/constants/routes'
import { useGetCategoriesQuery } from '@/generated/apis/CategoryApi/CategoryApi.query'

import {
  FOOTER_COMPANY_INFO,
  FOOTER_SNS_LINK,
} from '../constants/footer-constants'
import { LogoLinkButton } from './LogoImage'

const ArrowUpRightIcon = chakra(ArrowUpRightIconOriginal)

export const PageLayoutFooter = ({ ...props }: FlexProps) => {
  const { data } = useGetCategoriesQuery()

  return (
    <Flex
      w={'100%'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      gap={{ base: '56px', sm: '56px', md: '56px' }}
      {...props}
    >
      {/* 모바일: 첫 번째 섹션 (로고+이메일 + 소셜버튼) */}
      <VStack
        gap={{ base: '64px', sm: '64px', md: '0' }}
        align={'start'}
        w={'100%'}
        flexDir={{ base: 'column', sm: 'column', md: 'row' }}
        justify={{ base: 'start', sm: 'space-between', md: 'space-between' }}
      >
        {/* 로고 영역 */}
        <VStack
          gap={{ base: '32px', sm: '32px', md: '32px' }}
          align={'start'}
          w={{ base: '100%', sm: '100%', md: 'auto' }}
          flexDir={{ base: 'column', sm: 'row', md: 'column' }}
          justify={{ base: 'start', sm: 'space-between', md: 'start' }}
        >
          <VStack gap={'20px'} align={'start'}>
            <LogoLinkButton />
            <Text
              textStyle={{
                base: 'eng-heading-4',
                sm: 'eng-heading-4',
                md: 'eng-heading-3',
              }}
              color={'grey.0'}
              htmlTranslate="no"
            >
              popodou.official@popodou.co
            </Text>
          </VStack>

          <HStack gap={'12px'} w={{ base: '100%', sm: 'auto', md: 'auto' }}>
            <Button
              w={{ sm: 'auto', md: 'auto' }}
              variant={'outline-grey'}
              bg={'transparent'}
              borderRadius={'100px'}
              borderColor={'accent.pink1'}
              onClick={() => {
                window.open(FOOTER_SNS_LINK.instagram, '_blank')
              }}
            >
              <Text
                textStyle={'eng-heading-5'}
                color={'accent.pink1'}
                htmlTranslate="no"
                lineHeight={'1'}
                mt={'3px'}
              >
                Instargram
              </Text>
              <ArrowUpRightIcon boxSize={'20px'} color={'accent.pink1'} />
            </Button>
          </HStack>
        </VStack>

        {/* 네비게이션 영역 */}
        <VStack
          gap={{ base: '20px', sm: '20px', md: '0' }}
          align={'start'}
          w={{ base: '100%', sm: '100%', md: 'auto' }}
          flexDir={{ base: 'column', sm: 'row', md: 'row' }}
          justify={{ base: 'start', sm: 'space-between', md: 'start' }}
        >
          <VStack minW={{ base: 'auto', md: '100px' }} align={'start'}>
            <Link href={ROUTES.OurStory}>
              <Text textStyle={'ko-heading-5'} color={'grey.0'}>
                Our Story
              </Text>
            </Link>
          </VStack>
          <VStack
            gap={'20px'}
            align={'start'}
            minW={{ base: 'auto', md: '100px' }}
          >
            <Link href={ROUTES.POPUPS}>
              <Text
                textStyle={'ko-heading-5'}
                color={'grey.0'}
                htmlTranslate="no"
              >
                Pop-ups
              </Text>
            </Link>
            <VStack gap={'6px'} align={'start'}>
              {data?.data?.map((item) => (
                <Link
                  href={`${ROUTES.POPUPS}?category=${item.categoryId}`}
                  key={item.categoryId}
                >
                  <Text
                    textStyle={'ko-body-4'}
                    color={'grey.5'}
                    htmlTranslate="no"
                  >
                    {item.categoryName}
                  </Text>
                </Link>
              ))}
              {/* <Link href={ROUTES.POPUPS}>
                <Text
                  textStyle={'ko-body-4'}
                  color={'grey.5'}
                  htmlTranslate="no"
                >
                  Fashion & Accessories
                </Text>
              </Link>
              <Link href={ROUTES.POPUPS}>
                <Text
                  textStyle={'ko-body-4'}
                  color={'grey.5'}
                  htmlTranslate="no"
                >
                  Beauty & Cosmetics
                </Text>
              </Link>
              <Link href={ROUTES.POPUPS}>
                <Text
                  textStyle={'ko-body-4'}
                  color={'grey.5'}
                  htmlTranslate="no"
                >
                  Lifestyle & Home
                </Text>
              </Link>
              <Link href={ROUTES.POPUPS}>
                <Text
                  textStyle={'ko-body-4'}
                  color={'grey.5'}
                  htmlTranslate="no"
                >
                  Art & Culture
                </Text>
              </Link>
              <Link href={ROUTES.POPUPS}>
                <Text
                  textStyle={'ko-body-4'}
                  color={'grey.5'}
                  htmlTranslate="no"
                >
                  Tech & Innovation
                </Text>
              </Link>
              <Link href={ROUTES.POPUPS}>
                <Text
                  textStyle={'ko-body-4'}
                  color={'grey.5'}
                  htmlTranslate="no"
                >
                  Collaborations &{'\n'} Limited Editions
                </Text>
              </Link> */}
            </VStack>
          </VStack>
          <VStack minW={{ base: 'auto', md: '100px' }} align={'start'}>
            <Link href={ROUTES.LOUNGE}>
              <Text
                textStyle={'ko-heading-5'}
                color={'grey.0'}
                htmlTranslate="no"
              >
                Lounge
              </Text>
            </Link>
          </VStack>
          <VStack minW={{ base: 'auto', md: '100px' }} align={'start'}>
            <Link href={ROUTES.SPACES}>
              <Text
                textStyle={'ko-heading-5'}
                color={'grey.0'}
                htmlTranslate="no"
              >
                Spaces
              </Text>
            </Link>
          </VStack>
          <VStack minW={{ base: 'auto', md: '100px' }} align={'start'}>
            <Link href={ROUTES.JOURNAL}>
              <Text
                textStyle={'ko-heading-5'}
                color={'grey.0'}
                htmlTranslate="no"
              >
                Journal
              </Text>
            </Link>
          </VStack>
          <VStack minW={{ base: 'auto', md: '100px' }} align={'start'}>
            <Link
              href={ROUTES.POPUPS}
              onClick={(e) => {
                e.preventDefault()
                return false
              }}
            >
              <Text
                cursor={'not-allowed'}
                textStyle={'ko-heading-5'}
                color={'grey.4'}
                htmlTranslate="no"
              >
                Online pop-up
              </Text>
            </Link>
          </VStack>
        </VStack>
      </VStack>

      {/* 하단 영역 */}
      <VStack gap={{ base: '32px', sm: '32px', md: '32px' }} align={'start'}>
        <HStack
          w={'100%'}
          gap={{ base: '10px', sm: '10px', md: '28px' }}
          pt={'20px'}
          borderTop={'1px solid'}
          borderColor={'white.trnsparent.2'}
          flexWrap={'wrap'}
          align={'start'}
          flexDir={{ base: 'column', sm: 'column', md: 'row' }}
        >
          {FOOTER_COMPANY_INFO.map((info) => (
            <Flex key={info.title}>
              <Text textStyle={'ko-body-6'} color={'grey.6'} htmlTranslate="no">
                {info.title} : {info.value}
              </Text>
            </Flex>
          ))}
        </HStack>
        <Text textStyle={'ko-body-4'} color={'grey.2'} htmlTranslate="no">
          Copyright 2025 © popodou Inc. All rights reserved
        </Text>
      </VStack>
    </Flex>
  )
}
