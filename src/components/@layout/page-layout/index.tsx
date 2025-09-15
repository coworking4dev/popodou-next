import { PropsWithChildren } from 'react'

import { cookies } from 'next/headers'

import { ContainerProps, Grid, GridItem, GridItemProps } from '@chakra-ui/react'

import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { LAYOUT } from '@/constants/layout'

import { PageLayoutFooter } from './components/PageLayoutFooter'
import { PageLayoutHeader } from './components/PageLayoutHeader'

interface PageLayoutProps {
  containerProps?: ContainerProps
  headerProps?: GridItemProps
  hideFooter?: boolean
}

export const PageLayout = ({
  containerProps,
  headerProps,
  children,
  hideFooter = false,
}: PropsWithChildren<PageLayoutProps>) => {
  const accessToken = cookies().get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)?.value
  const refreshToken = cookies().get(COOKIE_KEYS.AUTH.REFRESH_TOKEN)?.value

  const isLoggedIn = !!accessToken && !!refreshToken

  return (
    <Grid
      w={'100%'}
      minW={'100%'}
      minH={'100vh'}
      pos={'relative'}
      gridAutoColumns={'1fr'}
      bg={'primary.1'}
      gridTemplateRows={{
        base: `${LAYOUT.HEADER.HEIGHT.MOBILE} minmax(calc(100vh - ${LAYOUT.HEADER.HEIGHT.MOBILE}), 1fr) auto`,
        sm: `${LAYOUT.HEADER.HEIGHT.TABLET} minmax(calc(100vh - ${LAYOUT.HEADER.HEIGHT.TABLET}), 1fr) auto`,
        md: `${LAYOUT.HEADER.HEIGHT.DESKTOP} minmax(calc(100vh - ${LAYOUT.HEADER.HEIGHT.DESKTOP}), 1fr) auto`,
      }}
      templateAreas={`"header" "main" "footer"`}
    >
      <GridItem
        area={'header'}
        as={'header'}
        position="fixed"
        top={'0px'}
        left={'0px'}
        h={{
          base: LAYOUT.HEADER.HEIGHT.MOBILE,
          sm: LAYOUT.HEADER.HEIGHT.TABLET,
          md: LAYOUT.HEADER.HEIGHT.DESKTOP,
        }}
        right={'0px'}
        zIndex={100}
        bg={'primary.1'}
        w={'100%'}
        display="flex"
        justifyContent={'center'}
        {...headerProps}
      >
        <PageLayoutHeader isLogin={isLoggedIn} />
      </GridItem>
      <GridItem
        as={'main'}
        area={'main'}
        w={'100%'}
        minW={'100%'}
        {...containerProps}
      >
        {children}
      </GridItem>
      {!hideFooter && (
        <GridItem
          area={'footer'}
          as={'footer'}
          h={'100%'}
          w={'100%'}
          p={{
            base: '80px 20px 40px 20px',
            sm: '80px 40px 40px 40px',
          }}
          bg={{
            base: 'background.inverse.1',
          }}
        >
          <PageLayoutFooter />
        </GridItem>
      )}
    </Grid>
  )
}
