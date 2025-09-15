import localFont from 'next/font/local'

export const pretendard = localFont({
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
  fallback: [
    'Pretendard Variable',
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
  src: [
    {
      style: 'normal',
      weight: '45 920',
      path: '../../../public/fonts/pretendard/PretendardVariable.woff2',
    },
  ],
})

export const manrope = localFont({
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
  fallback: [
    'Manrope',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'sans-serif',
  ],
  src: [
    {
      style: 'normal',
      weight: '200 800',
      path: '../../../public/fonts/manrope/ManRope.ttf',
    },
  ],
})
