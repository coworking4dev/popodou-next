'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Button, Flex, Text } from '@chakra-ui/react'

import { AutoResizeTextArea } from '@/components/auto-resize-text-area'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { usePreventFormLeave } from '@/hooks/usePreventPageMove'

interface Props {
  onSubmit: (comment: string) => void
  placeholder?: string
  uploadButtonText?: string
}

export const CommentInput = ({
  onSubmit,
  placeholder = 'Write a comment',
  uploadButtonText = 'Upload',
}: Props) => {
  const { isLoggedIn } = useAuth()
  const [comment, setComment] = useState('')

  usePreventFormLeave({ shouldPrevent: comment.length > 0 })

  const handleAddComment = () => {
    if (comment.trim()) {
      onSubmit(comment)
      setComment('')
    }
  }

  if (!isLoggedIn) {
    return (
      <Flex
        w={'100%'}
        bg={'grey.0'}
        pos={'relative'}
        borderRadius={'8px'}
        border={'1px solid'}
        borderColor={'grey.2'}
        overflow={'hidden'}
        p={'20px 12px'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={'12px'}
      >
        <Text textStyle={'ko-body-6'} color={'grey.8'}>
          You need to log in to leave a comment. Join now and become part of the
          conversation!
        </Text>
        <Link
          href={{
            pathname: ROUTES.LOGIN,
            query: {
              redirect:
                typeof window !== 'undefined' ? window.location.href : '',
            },
          }}
        >
          <Button size={'sm'} textStyle={'eng-caption-1'}>
            Log in / Sign up
          </Button>
        </Link>
      </Flex>
    )
  }

  return (
    <Flex
      w={'100%'}
      bg={'grey.0'}
      pos={'relative'}
      borderRadius={'8px'}
      border={'1px solid'}
      borderColor={'grey.2'}
      overflow={'hidden'}
    >
      <AutoResizeTextArea
        value={comment}
        disabled={!isLoggedIn}
        onChange={(e) => setComment(e)}
        placeholder={placeholder}
        w={'100%'}
        maxLength={2000}
        p={'12px'}
        minH={'120px'}
        textStyle={'ko-body-6'}
        pb={'50px'}
      />
      <Button
        position={'absolute'}
        right={'12px'}
        bottom={'12px'}
        disabled={!comment}
        type="submit"
        onClick={() => {
          handleAddComment()
        }}
      >
        {uploadButtonText}
      </Button>
    </Flex>
  )
}
