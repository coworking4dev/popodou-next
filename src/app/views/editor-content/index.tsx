import { forwardRef, memo, useEffect, useRef } from 'react'

import { Box, BoxProps, mergeRefs } from '@chakra-ui/react'

import './editor-content.css'

interface Props extends BoxProps {
  content: string
  onContentRendered?: (scrollHeight: number) => void
}

export const EditorContent = memo(
  forwardRef<HTMLDivElement, Props>(
    ({ content, onContentRendered, ...props }, ref) => {
      const editorContentRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
        const element = editorContentRef.current
        if (!element || !onContentRendered) return

        // HTML 렌더링 완료 후 높이 측정을 위한 지연
        const measureHeight = () => {
          const scrollHeight = element.scrollHeight
          onContentRendered(scrollHeight)
        }

        // DOM 변화 감지를 위한 MutationObserver
        const observer = new MutationObserver(() => {
          // 약간의 지연을 두어 DOM 업데이트가 완전히 끝난 후 측정
          setTimeout(measureHeight, 100)
        })

        // 초기 측정
        setTimeout(measureHeight, 100)

        // 자식 노드의 변화 감지
        observer.observe(element, {
          childList: true,
          subtree: true,
          characterData: true,
        })

        return () => {
          observer.disconnect()
        }
      }, [content, onContentRendered])

      return (
        <Box
          ref={mergeRefs(editorContentRef, ref)}
          width="100%"
          className="editor-content"
          overflow={'hidden'}
          borderRadius="0"
          dangerouslySetInnerHTML={{ __html: content || '' }}
          {...props}
        />
      )
    },
  ),
  (prev, next) => prev.content === next.content && prev.css === next.css,
)

EditorContent.displayName = 'EditorContent'
