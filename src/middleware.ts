import { NextRequest, NextResponse } from 'next/server'

import { jwtDecode } from '@toktokhan-dev/universal'

import { ENV } from './configs/env'
import { COOKIE_KEYS } from './constants/cookie-keys'
import { ROUTES } from './constants/routes'
import { calcMaxAge } from './utils/middleware/calc-max-age'
import { getJwtCookieOptions } from './utils/middleware/get-jwt-cookie-option'
import { matchingPath } from './utils/middleware/matching-path'

// JWT 디코딩을 위한 헬퍼 함수

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies: requestCookies, url } = request
  const { pathname } = nextUrl

  const accessToken = requestCookies.get('accessToken')?.value
  const refreshToken = requestCookies.get('refreshToken')?.value

  const decodedAccess = accessToken ? jwtDecode(accessToken) : null
  const accessExp = decodedAccess?.exp || 0
  const accessExp1HourBefore = accessExp - 3600
  const isTryRefresh =
    refreshToken && (!accessToken || Date.now() / 1000 >= accessExp1HourBefore)

  let isRefreshSuccess = false
  let isRefreshError = false

  if (isTryRefresh) {
    try {
      const refreshResponse = await fetch(
        `${ENV.API_BASE_URL}/v1/user/refresh/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        },
      )

      if (refreshResponse.ok) {
        const newToken = await refreshResponse.json()
        const { accessToken, refreshToken } = newToken

        requestCookies.set(COOKIE_KEYS.AUTH.ACCESS_TOKEN, accessToken)
        requestCookies.set(COOKIE_KEYS.AUTH.REFRESH_TOKEN, refreshToken)
        isRefreshSuccess = true
      } else {
        isRefreshError = true
        requestCookies.delete(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
        requestCookies.delete(COOKIE_KEYS.AUTH.REFRESH_TOKEN)
        console.log('Refresh failed with status:', refreshResponse.status)
      }
    } catch (error) {
      isRefreshError = true
      requestCookies.delete(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
      requestCookies.delete(COOKIE_KEYS.AUTH.REFRESH_TOKEN)
      console.error('Error during refresh:', error)
    }
  }

  const response = NextResponse.next({
    request,
  })

  const { cookies: responseCookies } = response

  if (isRefreshError) {
    responseCookies.delete(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
    responseCookies.delete(COOKIE_KEYS.AUTH.REFRESH_TOKEN)
    isRefreshSuccess = false
  }

  if (isRefreshSuccess) {
    const refreshedReqAccess = requestCookies.get(
      COOKIE_KEYS.AUTH.ACCESS_TOKEN,
    )?.value
    const refreshedReqRefresh = requestCookies.get(
      COOKIE_KEYS.AUTH.REFRESH_TOKEN,
    )?.value

    if (refreshedReqAccess && refreshedReqRefresh) {
      const decodedRefresh = jwtDecode(refreshedReqRefresh)
      const refreshMaxAge = calcMaxAge({ exp: decodedRefresh?.exp })

      responseCookies.set(
        COOKIE_KEYS.AUTH.ACCESS_TOKEN,
        refreshedReqAccess,
        getJwtCookieOptions(refreshMaxAge),
      )
      responseCookies.set(
        COOKIE_KEYS.AUTH.REFRESH_TOKEN,
        refreshedReqRefresh,
        getJwtCookieOptions(refreshMaxAge),
      )
      isRefreshSuccess = false
    } else {
      responseCookies.delete(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
      responseCookies.delete(COOKIE_KEYS.AUTH.REFRESH_TOKEN)
    }
  }

  const isLogin = !!accessToken && !!refreshToken

  if (!isLogin && matchingPath([ROUTES.MY_PAGE], pathname)) {
    return NextResponse.redirect(new URL(`/login?returnUrl=${pathname}`, url))
  }

  if (isLogin && matchingPath([ROUTES.LOGIN, ROUTES.FIND_PASSWORD], pathname)) {
    return NextResponse.redirect(new URL('/home', url))
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', url))
  }

  return response
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|sitemap.xml|robots.txt|manifest.json|icons|videos|fonts|images|favicon.ico).*)',
    },
  ],
}
