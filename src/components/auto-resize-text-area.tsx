'use client'

import { forwardRef, useEffect, useRef } from 'react'

import { Textarea, TextareaProps, useControllableState } from '@chakra-ui/react'

interface AutoResizeTextAreaProps extends Omit<TextareaProps, 'onChange'> {
  value?: string
  onChange?: (value: string) => void
  minHeight?: string
}

export const AutoResizeTextArea = forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextAreaProps
>(({ value, onChange, minHeight = '0px', ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>()

  const [state, setState] = useControllableState({
    value: value,
    defaultValue: value,
    onChange,
  })

  const combinedRef = (node: HTMLTextAreaElement) => {
    textareaRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    // 높이를 초기화하여 스크롤 높이를 정확히 계산
    textarea.style.height = 'auto'

    // 스크롤 높이를 기반으로 높이 설정
    const scrollHeight = textarea.scrollHeight
    const minHeightNum = parseInt(minHeight)

    const newHeight = Math.max(scrollHeight, minHeightNum)

    textarea.style.height = `${newHeight}px`
  }

  const setTextStyle = () => {
    const textarea = textareaRef.current
    if (!textarea) return
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setState(newValue)
  }

  useEffect(() => {
    adjustHeight()
  }, [state, minHeight])

  useEffect(() => {
    setTextStyle()
  }, [])

  return (
    <Textarea
      ref={combinedRef}
      border={'none'}
      value={state}
      borderRadius={'none'}
      onChange={handleChange}
      minHeight={minHeight}
      overflow="hidden"
      resize="none"
      {...props}
    />
  )
})

AutoResizeTextArea.displayName = 'AutoResizeTextArea'
