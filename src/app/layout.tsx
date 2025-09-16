import { Metadata, Viewport } from 'next'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Provider as ThemeProvider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'
import { ENV } from '@/configs/env'
import { manrope, pretendard } from '@/generated/fonts/next-fonts'
import { AppProvider } from '@/providers/app-provider'
import { OverlayProvider } from '@/providers/overlay-provider'

// import { GoogleAnalytics } from "@next/third-parties/google";

/**
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */

export const metadata: Metadata = {
  ...(ENV.DOMAIN && { metadataBase: new URL(ENV.DOMAIN) }),
  title: {
    default: 'popodou',
    template: `%s | popodou`,
  },
  description:
    'popodou brings wellness to life in ways that are sensory, intentional, and yours',
  applicationName: 'popodou',
  keywords: ['popodou', '', '...'],
  icons: [
    { rel: 'apple-touch-icon', url: '/images/120.png', sizes: '120x120' },
    { rel: 'apple-touch-icon', url: '/images/152.png', sizes: '152x152' },
    { rel: 'apple-touch-icon', url: '/images/180.png', sizes: '180x180' },
    { rel: 'apple-touch-icon', url: '/images/192.png', sizes: '192x192' },
    { rel: 'apple-touch-icon', url: '/images/512.png', sizes: '512x512' },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
    },
  ],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en',
    siteName: 'popodou',
    title: {
      default: 'popodou',
      template: `popodou | %s`,
    },
    description:
      'popodou brings wellness to life in ways that are sensory, intentional, and yours.',
    images: [
      {
        url: '/images/new_og.png',
        width: 600,
        height: 315,
        alt: 'Og Image Alt',
        type: 'image/png',
      },
    ],
    url: ENV.DOMAIN,
  },
  twitter: {
    card: 'summary_large_image',
    images: `/images/new_og.png`,
    title: 'popodou',
    description:
      'popodou brings wellness to life in ways that are sensory, intentional, and yours.',
    site: '@site',
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
}

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ErrorBoundary>
          <AppProvider>
            <ThemeProvider forcedTheme="light">
              <OverlayProvider>
                {children}
                <Toaster />
              </OverlayProvider>
            </ThemeProvider>
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
