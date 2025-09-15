import { Dispatch, SetStateAction } from 'react'

import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { XIcon } from '@phosphor-icons/react/dist/ssr'

import { ImageUploadEmptyView } from './ImageUploadEmptyView'

interface LoungeImageUploaderProps {
  images: File[]
  onChangeImages: Dispatch<SetStateAction<File[]>>
}

export const LoungeImageUploader = ({
  images,
  onChangeImages,
}: LoungeImageUploaderProps) => {
  const handleImageUpload = () => {
    // 이미지 업로드 로직 구현
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/jpg,image/jpeg,image/png'

    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      if (files.length + images.length <= 10) {
        onChangeImages((prev) => [...prev, ...files])
      } else {
        alert('You can upload up to 10 images.')
      }
    }

    input.click()
  }

  if (images.length === 0) {
    return <ImageUploadEmptyView onUpload={handleImageUpload} />
  }

  return (
    <VStack
      border="2px dashed"
      borderColor="grey.3"
      borderRadius="12px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="16px"
      cursor="pointer"
      p={'24px'}
      bg={'common-white'}
      w={'100%'}
    >
      {images.map((image, index) => (
        <HStack
          key={index}
          align={'start'}
          justify={'space-between'}
          w={'100%'}
        >
          <Text
            textStyle="ko-body-6"
            color="grey.9"
            fontWeight="400"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            maxW="100%"
          >
            {image.name}
          </Text>
          <Button
            size="sm"
            variant="ghost-grey"
            p="4px"
            minW="24px"
            h="24px"
            borderRadius="4px"
            onClick={() =>
              onChangeImages((prev) => prev.filter((_, i) => i !== index))
            }
            _hover={{ bg: 'grey.1' }}
          >
            <XIcon size={'20px'} />
          </Button>
        </HStack>
      ))}
    </VStack>
  )
}
