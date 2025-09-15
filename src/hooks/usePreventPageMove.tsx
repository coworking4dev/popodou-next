'use client'

import { useCallback, useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useAlert } from '@/components/@modal/hooks/useAlert'

export const usePreventPageMove = ({
  shouldPrevent = true,
}: {
  shouldPrevent?: boolean
}) => {
  const router = useRouter()
  const { openAlert } = useAlert()
  const isNavigatingRef = useRef(false)
  const isShowingDialogRef = useRef(false)
  const historyAddedRef = useRef(false) // 히스토리 항목이 추가되었는지 추적

  const showLeaveConfirmation = useCallback(async () => {
    return await new Promise<boolean>((resolve) => {
      openAlert({
        title: 'Do you want to stop writing?',
        description:
          'If you leave this page, all entered content will be deleted.\nDo you want to proceed?',
        cancelLabel: 'Leave',
        confirmLabel: 'Continue',
        onConfirm: async () => {
          resolve(true) // 계속 작성 (페이지 유지)
        },
        onCancel: () => {
          resolve(false) // 떠나기 (페이지 이탈)
        },
      })
    })
  }, [openAlert])

  // 프로그래밍적 네비게이션을 허용하는 함수
  const allowNavigation = useCallback(
    (url: string) => {
      isNavigatingRef.current = true
      router.push(url)
    },
    [router],
  )

  useEffect(() => {
    if (!shouldPrevent) {
      isNavigatingRef.current = false

      // shouldPrevent가 false가 되면서 이전에 추가한 히스토리 항목 제거
      if (historyAddedRef.current) {
        window.history.back() // 추가했던 히스토리 항목 제거
        historyAddedRef.current = false
      }

      return
    }

    // shouldPrevent가 true일 때만 히스토리 추가
    if (!historyAddedRef.current) {
      window.history.pushState(null, '', '')
      historyAddedRef.current = true
    }

    const interceptNavigation = async (event: MouseEvent) => {
      if (!shouldPrevent || isNavigatingRef.current) return

      const target = event.target as HTMLAnchorElement
      const link = target.closest('a[href]') as HTMLAnchorElement

      if (
        link &&
        link.href &&
        !link.href.startsWith('mailto:') &&
        !link.href.startsWith('tel:') &&
        !link.href.startsWith('javascript:')
      ) {
        event.preventDefault()
        event.stopPropagation()

        const shouldStay = await showLeaveConfirmation()
        if (!shouldStay) {
          isNavigatingRef.current = true
          if (link.href.startsWith(window.location.origin)) {
            router.push(link.href.replace(window.location.origin, ''))
          } else {
            window.location.href = link.href
          }
        }
      }
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!shouldPrevent || isNavigatingRef.current) return

      // 브라우저 표준 확인 대화상자
      event.preventDefault()
      event.returnValue = ''
      return ''
    }

    const handlePopState = async (event: PopStateEvent) => {
      if (!shouldPrevent || isNavigatingRef.current) return

      const shouldStay = await showLeaveConfirmation()

      if (!shouldStay) {
        window.history.back()
      } else {
        window.history.pushState(null, '', '')
        // 머무르기를 선택한 경우 - 아무것도 하지 않음 (이미 현재 페이지에 있음)
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener('click', interceptNavigation, true)
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    return () => {
      // 클린업
      document.removeEventListener('click', interceptNavigation, true)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
      isNavigatingRef.current = false
      isShowingDialogRef.current = false
    }
  }, [shouldPrevent, showLeaveConfirmation])

  return {
    allowNavigation,
  }
}

// 호환성을 위한 별칭
export const usePreventFormLeave = usePreventPageMove
