import { cookies } from 'next/headers'
import Link from 'next/link'

import { Button, HStack, Text } from '@chakra-ui/react'

import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { ROUTES } from '@/constants/routes'

const Logo = () => {
  return (
    <Link href={ROUTES.MAIN}>
      <Text textStyle={'eng-heading-2'}>popodou</Text>
    </Link>
  )
}

export const NavigationHeader = () => {
  const accessToken = cookies().get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)?.value

  return (
    <HStack
      px={'40px'}
      py={'8px'}
      justifyContent={'space-between'}
      alignItems={'center'}
      w={'100%'}
    >
      <HStack gap={'80px'} justifyContent={'flex-start'} alignItems={'center'}>
        <Logo />
        <HStack gap={'36px'}>
          <Link href={ROUTES.OurStory}>
            <Text textStyle={'eng-heading-5'} cursor={'pointer'}>
              Our Story
            </Text>
          </Link>
          <Link href={ROUTES.POPUPS}>
            <Text textStyle={'eng-heading-5'} cursor={'pointer'}>
              Pop-ups
            </Text>
          </Link>
          <Link href={ROUTES.LOUNGE}>
            <Text textStyle={'eng-heading-5'} cursor={'pointer'}>
              Lounge
            </Text>
          </Link>
          <Link href={ROUTES.SPACES}>
            <Text textStyle={'eng-heading-5'} cursor={'pointer'}>
              Spaces
            </Text>
          </Link>
          <Link href={ROUTES.JOURNAL}>
            <Text textStyle={'eng-heading-5'} cursor={'pointer'}>
              Journal
            </Text>
          </Link>
          <Link
            href={ROUTES.ONLINE_POPUP}
            style={{ cursor: 'disabled', pointerEvents: 'none' }}
          >
            <Text textStyle={'eng-heading-5'} cursor={'pointer'}>
              Online pop-up
            </Text>
          </Link>
        </HStack>
      </HStack>
      <HStack>
        <Link href={accessToken ? ROUTES.MAIN : ROUTES.LOGIN}>
          <Button size={'lg'} bg={'primary.5'}>
            <Text textStyle={'eng-body-5'}>
              {accessToken ? 'Log out' : 'Log in'}
            </Text>
          </Button>
        </Link>
      </HStack>
    </HStack>
  )
}
