'use client'

import { PropsWithChildren } from 'react'

import { OverlayProvider as OverlayKitProvider } from 'overlay-kit'

export const OverlayProvider = ({ children }: PropsWithChildren) => {
  return <OverlayKitProvider>{children}</OverlayKitProvider>
}
