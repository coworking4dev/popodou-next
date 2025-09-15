'use client'

import { useEffect } from 'react'

import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'

import setToken from '@/actions/set-token'
import { Splash } from '@/components/Splash'

export const LinkCallback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') as Route

  const initializeToken = async () => {
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')

    if (accessToken && refreshToken) {
      await setToken({
        accessToken,
        refreshToken,
      })
      router.push(returnUrl || '/home')
    }
  }

  useEffect(() => {
    initializeToken()
  }, [])

  return <Splash />
}
