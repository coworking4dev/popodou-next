import { usePathname } from 'next/navigation'

import {
  Button,
  Drawer,
  IconButton,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { XIcon } from '@phosphor-icons/react/dist/ssr'

import { ROUTES } from '@/constants/routes'
import { useGetMyPageProfileQuery } from '@/generated/apis/MyPageApi/MyPageApi.query'
import { LogoLogoIcon } from '@/generated/icons/MyIcons'

import { HEADER_NAVIGATOR_CONSTANTS } from '../@layout/page-layout/constants/header-navigator-constants'
import { BaseModalProps } from '../@modal/hooks/useAlert'
import { Tooltip } from '../ui/tooltip'

export const NavigatorDrawer = (
  props: BaseModalProps & { accessToken?: string },
) => {
  const { accessToken } = props

  const { data } = useGetMyPageProfileQuery({
    options: {
      enabled: !!accessToken,
      select: (data) => data.data,
    },
  })

  const currentPath = usePathname()

  const isActive = (path: string) => {
    return currentPath.includes(path)
  }

  return (
    <Drawer.Root open={props.isOpen} onOpenChange={props.close}>
      <Drawer.Backdrop />
      <Drawer.Trigger />
      <Drawer.Positioner>
        <Drawer.Content
          w={'100%'}
          h={'100%'}
          bg={'grey.0'}
          p={'16px'}
          pt={'0px'}
        >
          <Drawer.Header
            justifyContent={'space-between'}
            display={'flex'}
            alignItems={'center'}
            minH={'80px'}
          >
            <Drawer.Title title="Navigator">
              <LogoLogoIcon color={'accent.mint2'} w={'120px'} h={'22px'} />
            </Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <IconButton w={'40px'} h={'40px'} variant={'ghost-primary'}>
                <XIcon size={24} color={'grey.10'} />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body>
            <VStack alignItems={'flex-start'} gap={'0px'}>
              {accessToken ?
                <Link href={ROUTES.MY_PAGE} my={'20px'}>
                  <Button>
                    <Text textStyle={'ko-body-3'}>{data?.nickname}</Text>
                  </Button>
                </Link>
              : <Link
                  href={accessToken ? ROUTES.MAIN : ROUTES.LOGIN}
                  my={'20px'}
                  css={{
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                >
                  <Button size={'lg'} bg={'primary.5'}>
                    <Text textStyle={'eng-body-5'}>Log in</Text>
                  </Button>
                </Link>
              }
              {HEADER_NAVIGATOR_CONSTANTS.map((item) => {
                if (item.path === ROUTES.ONLINE_POPUP) {
                  return (
                    <Tooltip
                      key={item.path}
                      content={'Coming soon'}
                      contentProps={{
                        css: { '--tooltip-bg': 'colors.accent.mint2' },
                        color: 'white',
                      }}
                    >
                      <Text
                        my={'20px'}
                        textStyle={'eng-heading-5'}
                        cursor={'not-allowed'}
                        htmlTranslate="no"
                        color={'grey.4'}
                      >
                        {item.title}
                      </Text>
                    </Tooltip>
                  )
                }

                return (
                  <Link
                    href={item.path}
                    key={item.path}
                    my={'20px'}
                    ml={'4px'}
                    css={{
                      '&:hover': {
                        textDecoration: 'none',
                      },
                    }}
                  >
                    <Text
                      textStyle={'eng-heading-5'}
                      cursor={'pointer'}
                      data-active={isActive(item.path)}
                      css={{
                        '&:hover': {
                          textDecoration: 'underline',
                          textDecorationColor: 'primary.5',
                          textDecorationThickness: '2px',
                          textUnderlineOffset: '4px',
                        },
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
                )
              })}
            </VStack>
          </Drawer.Body>
          <Drawer.Footer />
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}
