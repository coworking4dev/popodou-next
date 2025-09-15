import { useEffect, useState } from 'react'

import Image from 'next/image'

import { Dialog, HStack, IconButton } from '@chakra-ui/react'
import {
  CaretLeftIcon,
  CaretRightIcon,
  XIcon,
} from '@phosphor-icons/react/dist/ssr'

import { BaseModalProps } from '../hooks/useAlert'

export const GalleryModal = ({
  images,
  index,
  isOpen,
  close,
}: BaseModalProps<{ images: string[]; index: number }>) => {
  const [currentIndex, setCurrentIndex] = useState(index)

  useEffect(() => {
    setCurrentIndex(index)
  }, [index])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (e.key === 'ArrowLeft') {
      handlePrevious()
    } else if (e.key === 'ArrowRight') {
      handleNext()
    } else if (e.key === 'Escape') {
      close()
    }
  }

  if (!images || images.length === 0) return null

  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Backdrop bg={'grey.transparent.5'} />

      <Dialog.Positioner>
        <Dialog.Content
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onClick={close}
          p={{ base: '0px', sm: '40px', md: 0 }}
          minW={{ base: '100vw', md: '80vw' }}
          bg={'transparent'}
        >
          <IconButton
            onClick={close}
            position={'fixed'}
            top={{ base: '16px', sm: '30px', md: '40px' }}
            right={{ base: '16px', sm: '30px', md: '40px' }}
            variant={'ghost-grey'}
            height={'60px'}
            width={'60px'}
            size={'lg'}
            bg={'grey.transparent.5'}
            borderRadius={'full'}
          >
            <XIcon color={'white'} size={28} />
          </IconButton>

          <Dialog.Body
            p={0}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <HStack
              w={'1426px'}
              h={'720px'}
              gap={'32px'}
              display={'flex'}
              align={'center'}
              justify={'center'}
              position={'relative'}
            >
              {images.length > 1 && (
                <IconButton
                  position={'absolute'}
                  left={{ base: '20px', sm: '0' }}
                  top={'50%'}
                  transform={'translateY(-50%)'}
                  variant={'ghost-grey'}
                  minHeight={'60px'}
                  minWidth={'60px'}
                  size={'lg'}
                  bg={'grey.transparent.5'}
                  borderRadius={'full'}
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevious()
                  }}
                  zIndex={1000}
                >
                  <CaretLeftIcon color={'white'} size={28} />
                </IconButton>
              )}{' '}
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                objectFit={'contain'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                fill
              />
              {images.length > 1 && (
                <IconButton
                  position={'absolute'}
                  right={{ base: '20px', sm: '0' }}
                  top={'50%'}
                  transform={'translateY(-50%)'}
                  variant={'ghost-grey'}
                  minHeight={'60px'}
                  minWidth={'60px'}
                  size={'lg'}
                  bg={'grey.transparent.5'}
                  borderRadius={'full'}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  zIndex={1000}
                >
                  <CaretRightIcon color={'white'} size={28} />
                </IconButton>
              )}{' '}
            </HStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
