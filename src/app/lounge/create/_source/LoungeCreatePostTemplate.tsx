'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, HStack, Text, VStack } from '@chakra-ui/react'

import { useUploadFileToS3Mutation } from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import { AutoResizeTextArea } from '@/components/auto-resize-text-area'
import { showToast } from '@/components/ui/toaster'
import { useAddCommunityPostsMutation } from '@/generated/apis/CommunityPostApi/CommunityPostApi.query'
import { usePreventPageMove } from '@/hooks/usePreventPageMove'

import { LoungeImageUploader } from './components/LoungeImageUploader'

export const LoungeCreatePostTemplate = () => {
  const router = useRouter()
  const { mutateAsync: addCommunityPosts, isPending } =
    useAddCommunityPostsMutation({})

  const { mutateAsync: uploadFileToS3, isPending: isUploading } =
    useUploadFileToS3Mutation({})

  const [content, setContent] = useState('')
  const [images, setImages] = useState<File[]>([])

  usePreventPageMove({ shouldPrevent: content.length > 0 || images.length > 0 })

  const onSubmitPost = async () => {
    try {
      const uploadedFiles = await Promise.all(
        images.map(async (file) => {
          return await uploadFileToS3(file)
        }),
      )

      await addCommunityPosts({
        data: {
          content,
          imagePaths: uploadedFiles.map((file) => file.path),
        },
      })

      showToast({
        type: 'success',
        description: 'Success to create post',
      })

      router.push('/lounge')
    } catch (error) {
      console.error(error)
    }
  }

  const handleImageUpload = () => {
    // 이미지 업로드 로직 구현
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/jpg,image/jpeg,image/png'

    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      if (files.length + images.length <= 10) {
        setImages((prev) => [...prev, ...files])
      } else {
        // 최대 10장 초과 시 알림
        alert('You can upload up to 10 images.')
      }
    }
    input.click()
  }

  return (
    <VStack
      w={'100%'}
      position={'relative'}
      pb={{ base: '80px', sm: '120px' }}
      px={{ base: '20px', sm: '40px', md: '0px' }}
      gap={{ base: '16px', sm: '0px' }}
    >
      <HStack
        w={'100%'}
        justify={'space-between'}
        position={'sticky'}
        pt={{ base: '20px', md: '56px' }}
        pb={{ base: '12px', sm: '16px', md: '20px' }}
        top={{ base: '0px', sm: '0px', md: '24px' }}
        zIndex={{ base: '100', md: '1' }}
        alignItems={{ base: 'start', md: 'end' }}
        bg={'primary.1'}
        gap={'20px'}
      >
        <Text textStyle={'ko-display-4'}>New Post</Text>
        <Button
          size={'lg'}
          disabled={!content}
          onClick={onSubmitPost}
          loading={isPending || isUploading}
        >
          Publish
        </Button>
      </HStack>
      <VStack w={'100%'} align={'start'} gap={'40px'}>
        <VStack gap={'8px'} w={'100%'} align={'start'}>
          <HStack gap={'2px'}>
            <Text textStyle={'eng-body-5'} color={'grey.10'}>
              Content
            </Text>
            <Text color={'accent.red2'}>*</Text>
          </HStack>
          <AutoResizeTextArea
            p={'12px'}
            minH={620}
            borderRadius={'12px'}
            border={'1px solid'}
            borderColor={'grey.2'}
            placeholder={'Enter your content (max. 3,000 characters)'}
            maxLength={3000}
            value={content}
            onChange={(e) => setContent(e)}
          />
        </VStack>
        <VStack gap={'8px'} w={'100%'} align={'start'}>
          <HStack gap={'2px'} w={'100%'} justify={'space-between'}>
            <Text textStyle={'eng-body-5'} color={'grey.10'}>
              Upload Image
            </Text>

            <Button
              size={'sm'}
              variant={'outline-grey'}
              borderRadius={'6px'}
              disabled={images.length >= 10}
              onClick={handleImageUpload}
            >
              Upload Image
            </Button>
          </HStack>
          <LoungeImageUploader images={images} onChangeImages={setImages} />
        </VStack>
      </VStack>
    </VStack>
  )
}
