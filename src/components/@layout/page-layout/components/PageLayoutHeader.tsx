'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Button, HStack, IconButton, Text } from '@chakra-ui/react'
import { ListIcon } from '@phosphor-icons/react/dist/ssr'

import { overlay } from 'overlay-kit'

import { logout } from '@/actions/logout'
import { NavigatorDrawer } from '@/components/@drawer/navigator-drawer'
import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { ROUTES } from '@/constants/routes'
import { useGetMyPageProfileQuery } from '@/generated/apis/MyPageApi/MyPageApi.query'
import { LogoLogoIcon } from '@/generated/icons/MyIcons'
import { clientCookie } from '@/stores/cookie/store'

import { HEADER_NAVIGATOR_CONSTANTS } from '../constants/header-navigator-constants'

export const Logo = () => {
  return (
    <Link href={ROUTES.MAIN}>
      <LogoLogoIcon
        color={'primary.5'}
        w={{ base: '120px', md: '140px' }}
        h={{ base: '22px', md: '26px' }}
      />
    </Link>
  )
}

export const PageLayoutHeader = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <HStack
      px={{ base: '20px 12px', sm: '40px 32px' }}
      py={'8px'}
      alignItems={'center'}
      w={'100%'}
      gap={'80px'}
      justifyContent={'space-between'}
    >
      <Logo />
      <MobileHeaderContent />
      <DesktopHeaderContent isLogin={isLogin} />
    </HStack>
  )
}

const DesktopHeaderContent = ({ isLogin }: { isLogin: boolean }) => {
  const currentPath = usePathname()
  const router = useRouter()

  const { data } = useGetMyPageProfileQuery({
    options: {
      enabled: !!isLogin,
      select: (data) => data.data,
    },
  })

  const isActive = (path: string) => {
    return currentPath.includes(path)
  }

  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      w={'100%'}
      display={{ base: 'none', md: 'flex' }}
    >
      <>
        <HStack gap={'36px'}>
          {HEADER_NAVIGATOR_CONSTANTS.map((item) => (
            <Link
              href={item.path}
              key={item.path}
              onClick={(e) => {
                if (item.path === ROUTES.ONLINE_POPUP) {
                  e.preventDefault()
                  return false
                }
              }}
            >
              <Text
                textStyle={'eng-heading-5'}
                cursor={
                  item.path === ROUTES.ONLINE_POPUP ? 'not-allowed' : 'pointer'
                }
                htmlTranslate="no"
                color={item.path === ROUTES.ONLINE_POPUP ? 'grey.4' : 'grey.9'}
                data-active={isActive(item.path)}
                css={{
                  '&[data-active="true"]': {
                    textDecoration: 'underline',
                    textDecorationColor: 'primary.5',
                    textDecorationThickness: '2px',
                    textUnderlineOffset: '4px',
                  },
                }}
              >
                {item.title}
              </Text>
            </Link>
          ))}
        </HStack>
      </>
      <HStack>
        {isLogin ?
          <Button
            variant={'ghost-grey'}
            onClick={() => {
              router.replace(ROUTES.MY_PAGE)
            }}
          >
            <Text textStyle={'ko-body-3'} color={'grey.9'}>
              {data?.nickname}
            </Text>
          </Button>
        : <Button
            size={'lg'}
            bg={'primary.5'}
            onClick={() => {
              if (isLogin) {
                logout()
                router.replace(ROUTES.LOGIN)
              } else {
                router.replace(ROUTES.LOGIN)
              }
            }}
          >
            <Text textStyle={'eng-body-5'}>{'Log in'}</Text>
          </Button>
        }
      </HStack>
    </HStack>
  )
}

const MobileHeaderContent = () => {
  const accessToken = clientCookie.get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)

  const openDrawer = () => {
    overlay.open(({ close, isOpen }) => {
      return (
        <NavigatorDrawer
          close={close}
          isOpen={isOpen}
          accessToken={accessToken}
        />
      )
    })
  }

  return (
    <IconButton
      variant={'ghost-primary'}
      h={'40px'}
      w={'40px'}
      display={{ base: 'flex', md: 'none' }}
      onClick={openDrawer}
    >
      <ListIcon size={24} />
    </IconButton>
  )
}
