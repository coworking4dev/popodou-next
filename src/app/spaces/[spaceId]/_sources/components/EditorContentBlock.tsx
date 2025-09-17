import { useRef, useState } from 'react'

import { Box, BoxProps, Button, HStack, Text } from '@chakra-ui/react'

import { EditorContent } from '@/app/views/editor-content'
import { CaretDownIcon } from '@/generated/icons/MyIcons'

interface Props extends BoxProps {
  content: string
}

export const EditorContentBlock = ({ content, ...props }: Props) => {
  const [isMoreView, setIsMoreView] = useState(false)
  const [isOverflow, setIsOverflow] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const detailPageRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Box position={'relative'}>
        <EditorContent
          content={content}
          ref={detailPageRef}
          overflow={'hidden'}
          css={{
            opacity: isVisible ? 1 : 0,
            height: isOverflow && !isMoreView ? '1000px' : 'auto',
          }}
          onContentRendered={(scrollHeight) => {
            setIsVisible(true)
            if (scrollHeight > 1000) {
              setIsOverflow(true)
            }
          }}
          {...props}
        />
        {isOverflow && !isMoreView && (
          <Box
            position={'absolute'}
            bottom={0}
            left={0}
            right={0}
            w={'100%'}
            height={'230px'}
            zIndex={90}
            background={`linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, var(--color-grey-0, #FFF) 100%)`}
          ></Box>
        )}
      </Box>
      {isOverflow && (
        <Button
          bg="primary.5"
          width="100%"
          size="lg"
          onClick={() => setIsMoreView(!isMoreView)}
        >
          <HStack gap="8px">
            <CaretDownIcon
              boxSize="24px"
              transform={isMoreView ? 'rotate(180deg)' : 'rotate(0deg)'}
            />
            <Text>{isMoreView ? 'Less view' : 'More view'}</Text>
          </HStack>
        </Button>
      )}
    </>
  )
}
