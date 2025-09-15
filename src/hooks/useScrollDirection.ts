import { useEffect, useState } from 'react'

import { useBreakpointValue } from '@chakra-ui/react'

import { debounce } from 'lodash'

export const useScrollDirection = (threshold = 10) => {
  const topThreshold = useBreakpointValue({ base: 48, sm: 56, md: 80 }) || 80
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null,
  )
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const updateScrollDirection = debounce(
      () => {
        const scrollY = window.scrollY
        setIsAtTop(scrollY < topThreshold)

        if (Math.abs(scrollY - lastScrollY) < threshold) {
          return
        }

        setScrollDirection(scrollY > lastScrollY ? 'down' : 'up')
        setLastScrollY(scrollY > 0 ? scrollY : 0)
      },
      10,
      {
        leading: true,
      },
    )

    window.addEventListener('scroll', updateScrollDirection)

    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [topThreshold, lastScrollY, threshold])

  return { scrollDirection, isAtTop }
}
