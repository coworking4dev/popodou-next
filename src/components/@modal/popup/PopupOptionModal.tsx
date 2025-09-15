'use client'

import { useEffect, useRef, useState } from 'react'

import {
  Dialog,
  HStack,
  IconButton,
  Portal,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react'
import { XIcon } from '@phosphor-icons/react/dist/ssr'

import { euroFormat } from '@/app/_source/utils/price'
import { GetReservationOptionsType } from '@/generated/apis/@types/data-contracts'

import { BaseModalProps } from '../hooks/useAlert'

interface PopupOptionModalProps extends BaseModalProps {
  programs: GetReservationOptionsType[]
  onProgramSelect?: (program: GetReservationOptionsType) => void
}

export const PopupOptionModal = ({
  isOpen,
  close,
  programs,
  onProgramSelect,
}: PopupOptionModalProps) => {
  const [isScrollable, setIsScrollable] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current && contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight
        const viewportHeight = window.innerHeight

        // viewport의 80%를 넘으면 스크롤 가능하도록 설정
        const maxHeight = viewportHeight * 0.8
        setIsScrollable(contentHeight > maxHeight)
      }
    }

    if (isOpen) {
      // 모달이 열릴 때 약간의 지연 후 체크 (DOM 렌더링 완료 후)
      setTimeout(checkScrollable, 100)
      window.addEventListener('resize', checkScrollable)
    }

    return () => {
      window.removeEventListener('resize', checkScrollable)
    }
  }, [isOpen, programs])

  const handleProgramSelect = (program: GetReservationOptionsType) => {
    onProgramSelect?.(program)

    //window.open(program.googleFormUrl, '_blank')
    close()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={({ open }) => !open && close()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={{ base: '20px', sm: '0px' }}>
          <Dialog.Content
            ref={containerRef}
            borderRadius="8px"
            p="0"
            w={'100%'}
            maxH={isScrollable ? '80vh' : 'auto'}
            boxShadow="2px 4px 80px 0px rgba(27,28,29,0.04), 1px 2px 10px 0px rgba(27,28,29,0.04)"
            border="1px solid grey.3"
            bg={'secondary.1'}
          >
            {/* 고정 헤더 */}
            <VStack gap="0" align="stretch" w={'100%'}>
              <HStack
                justify="space-between"
                align="center"
                p="16px 20px"
                borderBottom="1px solid transparent"
              >
                <Dialog.Title textStyle={'ko-heading-4'} color="grey.10">
                  Please select a program to reserve.
                </Dialog.Title>
                <Dialog.CloseTrigger
                  asChild
                  cursor="pointer"
                  w="24px"
                  h="24px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton variant={'ghost-grey'}>
                    <XIcon size={24} />
                  </IconButton>
                </Dialog.CloseTrigger>
              </HStack>

              {/* 스크롤 가능한 프로그램 목록 */}
              <VStack
                ref={contentRef}
                gap="0"
                align="stretch"
                overflow={isScrollable ? 'auto' : 'visible'}
                maxH={isScrollable ? 'calc(80vh - 80px)' : 'auto'}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#eaebec',
                    borderRadius: '3px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#d1d5db',
                  },
                }}
              >
                {programs.map((program, index) => (
                  <HStack
                    key={program.optionId}
                    align="center"
                    p="16px 20px"
                    cursor="pointer"
                    bg={'transparent'}
                    _hover={{
                      bg: 'secondary.2',
                    }}
                    onClick={() => handleProgramSelect(program)}
                    borderBottom={index < programs.length - 1 ? 'none' : 'none'}
                    transition="background-color 0.2s ease"
                  >
                    <Text textStyle={'ko-body-3'}>{program.optionName}</Text>
                    <Separator
                      orientation="vertical"
                      color={'grey.2'}
                      w={'1px'}
                      h={'12px'}
                    />
                    <Text
                      textStyle={'ko-caption-1'}
                      color={'grey.9'}
                      lineHeight={'1'}
                    >
                      {euroFormat(program.price)}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
