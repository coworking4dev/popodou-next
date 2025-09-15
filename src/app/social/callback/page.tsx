'use client'

import { Suspense } from 'react'

import { Splash } from '@/components/Splash'

import { LinkCallback } from './_source/components/link-callback'

export default function SocialCallbackPage() {
  return (
    <Suspense fallback={<Splash />}>
      <LinkCallback />
    </Suspense>
  )
}
