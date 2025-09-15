import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { clientCookie } from '@/stores/cookie/store'

export const useAuth = () => {
  const accessToken = clientCookie.get(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
  const refreshToken = clientCookie.get(COOKIE_KEYS.AUTH.REFRESH_TOKEN)

  const isLoggedIn = !!accessToken && !!refreshToken

  return { isLoggedIn }
}
