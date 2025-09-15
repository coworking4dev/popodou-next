'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Box,
  Center,
  Spinner,
  mergeRefs,
  useBreakpointValue,
} from '@chakra-ui/react'

import { debounce } from 'lodash'
import { useInView } from 'react-intersection-observer'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { breakpoints } from '@/configs/theme/breakpoints'

interface Props {
  children: React.ReactNode
  columnsCount?: number
  hasNextPage?: boolean
  gap?: string
  gapBreakPoints?: {
    base?: string
    sm?: string
    md?: string
  }
  columnsCountBreakPoints: {
    base?: number
    sm?: number
    md?: number
  }
  isFetchingNextPage?: boolean
  onInfiniteScrollTrigger?: () => void
}

export const MasonryLayout = ({
  children,
  gap,
  hasNextPage,
  gapBreakPoints,
  columnsCount = 2,
  columnsCountBreakPoints,
  onInfiniteScrollTrigger,
  isFetchingNextPage,
}: Props) => {
  const { ref, inView } = useInView()

  const base = breakpoints.base.replace('px', '')
  const sm = breakpoints.sm.replace('px', '')
  const md = breakpoints.md.replace('px', '')

  const [mouthed, setMouthed] = useState(false)
  const triggerElementRef = useRef<HTMLDivElement | null>(null)

  const currentBreakpoint = useBreakpointValue({
    base: 'base',
    sm: 'sm',
    md: 'md',
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      onInfiniteScrollTrigger?.()
    }
  }, [inView, hasNextPage, onInfiniteScrollTrigger])

  useEffect(() => {
    setMouthed(true)
  }, [])

  const calculateOptimalTriggerPosition = useCallback(() => {
    if (typeof window === 'undefined') return
    if (!mouthed) return
    if (!onInfiniteScrollTrigger) return

    const masonryLayoutWrapper = document.querySelector(
      '.masonry-layout-wrapper',
    )
    if (!masonryLayoutWrapper) return

    // 각 열(column)의 마지막 요소들을 찾아서 높이를 측정
    const columns = masonryLayoutWrapper.querySelectorAll('& > div')
    const columnHeights: number[] = []

    columns.forEach((column) => {
      const lastChild = column.lastElementChild
      if (lastChild) {
        const rect = lastChild.getBoundingClientRect()
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop
        const absoluteTop = rect.top + scrollTop
        columnHeights.push(absoluteTop)
      }
    })

    // 가장 낮은 높이를 찾음 (가장 짧은 열)
    if (columnHeights.length > 0) {
      const minHeight = Math.min(...columnHeights)
      // 트리거 요소의 위치를 가장 낮은 높이로 설정
      if (triggerElementRef.current) {
        triggerElementRef.current.style.top = `${minHeight}px` // 200px 여유를 둠
      }
    }
  }, [mouthed])

  useEffect(() => {
    if (mouthed) {
      // 초기 계산
      setTimeout(calculateOptimalTriggerPosition, 100)

      // 리사이즈 이벤트 리스너 추가
      const handleResize = debounce(() => {
        setTimeout(calculateOptimalTriggerPosition, 100)
      }, 100)

      window.addEventListener('scroll', handleResize)
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('scroll', handleResize)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [mouthed, calculateOptimalTriggerPosition])

  // children이 변경될 때마다 트리거 위치 재계산
  useEffect(() => {
    if (mouthed) {
      setTimeout(calculateOptimalTriggerPosition, 100)
    }
  }, [children, mouthed, calculateOptimalTriggerPosition])

  if (!mouthed) {
    return null
  }

  return (
    <Box position={'relative'}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          [base]: columnsCountBreakPoints.base ?? columnsCount,
          [sm]: columnsCountBreakPoints.sm ?? columnsCount,
          [md]: columnsCountBreakPoints.md ?? columnsCount,
        }}
      >
        <Masonry
          className="masonry-layout-wrapper"
          style={{
            gap:
              gapBreakPoints?.[
                currentBreakpoint as keyof typeof gapBreakPoints
              ] || gap,
          }}
          itemStyle={{
            gap:
              gapBreakPoints?.[
                currentBreakpoint as keyof typeof gapBreakPoints
              ] || gap,
          }}
        >
          {children}
        </Masonry>
      </ResponsiveMasonry>
      {isFetchingNextPage ?
        <Center h={'50px'} width={'100%'}>
          <Spinner />
        </Center>
      : <div
          ref={mergeRefs(triggerElementRef, ref)}
          style={{
            position: 'absolute',
            height: '10px',
            width: '30px',
            pointerEvents: 'none',
          }}
        />
      }
    </Box>
  )
}
