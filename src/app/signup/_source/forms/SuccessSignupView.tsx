import Link from 'next/link'

import { Center, HStack, Text, VStack, chakra } from '@chakra-ui/react'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

const CheckCircle = chakra(CheckCircleIcon)

export const SuccessSignupView = () => {
  return (
    <Center as={VStack} gap={'64px'} h={'100%'}>
      <VStack gap={'0px'} maxW={'480px'}>
        <CheckCircle w={'72px'} h={'72px'} color={'primary.4'} />
        <Text textStyle={'ko-heading-1'} mt={'12px'}>
          Thank you for joining popodou.
        </Text>
        <Text textStyle={'pre-body-6'} color={'grey.7'} mt={'8px'}>
          Let’s begin your curated experience together.
        </Text>
      </VStack>
      <HStack gap={'12px'} w={'100%'}>
        <Link href={ROUTES.MAIN} style={{ width: '100%' }}>
          <Button
            size={'lg'}
            variant={'outline-primary'}
            bg={'transparent'}
            w={'100%'}
          >
            Home
          </Button>
        </Link>
        <Link href={ROUTES.LOGIN} style={{ width: '100%' }}>
          <Button size={'lg'} w={'100%'}>
            Log in
          </Button>
        </Link>
      </HStack>
    </Center>
  )
}
