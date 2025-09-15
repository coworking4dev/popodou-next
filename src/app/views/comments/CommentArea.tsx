import { useMemo, useState } from 'react'

import dynamic from 'next/dynamic'

import {
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
  EyeIcon,
} from '@phosphor-icons/react/dist/ssr'
import {
  UseMutationResult,
  UseQueryResult,
  keepPreviousData,
} from '@tanstack/react-query'

import { isNumber } from 'lodash'

import { showToast } from '@/components/ui/toaster'

import { CommentList } from './CommentList'

const CommentInput = dynamic(
  () => import('./CommentInput').then((mod) => mod.CommentInput),
  { ssr: false },
)

interface CommentAreaProps<AddCommentVariables, DeleteCommentVariables> {
  id: string
  useGetCommentsQuery: (variables: any) => UseQueryResult<any, any>
  useAddCommentMutation: (
    options?: any,
  ) => UseMutationResult<any, any, AddCommentVariables>
  useDeleteCommentMutation: (
    options?: any,
  ) => UseMutationResult<any, any, DeleteCommentVariables>
  getCommentsVariables: (
    id: string,
    page: number,
    pageSize: number,
    options?: any,
  ) => any
  addCommentVariables: (id: string, comment: string) => AddCommentVariables
  deleteCommentVariables: (
    id: string,
    commentId: number,
  ) => DeleteCommentVariables

  viewCount?: number

  messages?: {
    commentAddedSuccess?: string
    commentDeletedSuccess?: string
    commentsTitle?: string
    commentPlaceholder?: string
    uploadButtonText?: string
  }
}

export const CommentArea = <AddCommentVariables, DeleteCommentVariables>({
  id,
  viewCount,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  getCommentsVariables,
  addCommentVariables,
  deleteCommentVariables,
  messages = {},
}: CommentAreaProps<AddCommentVariables, DeleteCommentVariables>) => {
  const {
    commentAddedSuccess = 'Comment added successfully',
    commentDeletedSuccess = 'Comment deleted successfully',
    commentsTitle = 'Comments',
    commentPlaceholder = 'Write a comment',
    uploadButtonText = 'Upload',
  } = messages

  const { mutateAsync: addComment } = useAddCommentMutation({})
  const { mutateAsync: deleteComment } = useDeleteCommentMutation({})

  const [currentPage, setCurrentPage] = useState(0)

  const {
    data: commentsData,
    refetch,
    isLoading,
  } = useGetCommentsQuery(
    getCommentsVariables(id, currentPage, 10, {
      placeholderData: keepPreviousData,
    }),
  )

  const totalPages = commentsData?.data?.totalPages || 0

  const handleAddComment = async (comment: string) => {
    try {
      await addComment(addCommentVariables(id, comment))
      showToast({
        type: 'success',
        description: commentAddedSuccess,
      })
      refetch()
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(deleteCommentVariables(id, commentId))
      showToast({
        type: 'success',
        description: commentDeletedSuccess,
      })
      refetch()
    } catch (e) {
      console.log(e)
    }
  }

  const handlePageChange = (page: number) => {
    if (typeof window === 'undefined') {
      return
    }
    window.scrollTo({
      top: document.getElementById('comment-area')?.offsetTop || 0,
      behavior: 'instant',
    })
    setCurrentPage(page)
  }

  const PAGE_SET_SIZE = 6

  // 현재 세트 계산 (0부터 시작)
  const currentSet = Math.floor(currentPage / PAGE_SET_SIZE)

  // 현재 세트의 시작 페이지
  const startPage = currentSet * PAGE_SET_SIZE

  // 현재 세트의 끝 페이지
  const endPage = Math.min(startPage + PAGE_SET_SIZE - 1, totalPages - 1)

  const renderPageNumbers = useMemo(() => {
    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }, [startPage, endPage])

  return (
    <VStack w={'100%'} align={'start'} gap={'40px'} id="comment-area">
      <VStack w={'100%'} align={'start'} gap={'20px'}>
        <HStack w={'100%'} justify={'space-between'}>
          <Text textStyle={'eng-heading-1'}>
            {commentsTitle}
            <Text
              textStyle={'eng-heading-1'}
              as={'span'}
              ml={'6px'}
              color={'secondary.5'}
            >
              {commentsData?.data?.totalElements}
            </Text>
          </Text>
          {isNumber(viewCount) && (
            <HStack>
              <EyeIcon color={'#6A6D71'} size={20} />
              <Text textStyle={'ko-body-2'} color={'grey.7'}>
                {viewCount}
              </Text>
            </HStack>
          )}
        </HStack>
        <CommentInput
          onSubmit={handleAddComment}
          placeholder={commentPlaceholder}
          uploadButtonText={uploadButtonText}
        />
      </VStack>
      <CommentList
        comments={commentsData?.data?.content || []}
        loading={isLoading}
        onDelete={handleDeleteComment}
      />
      {renderPageNumbers.length > 0 && (
        <Flex justify="center" align="center" gap={2} mt={6} w={'100%'}>
          <HStack gap={'0px'}>
            {totalPages > 5 && (
              <IconButton
                variant={'ghost-grey'}
                w={{ base: '32px', sm: '40px' }}
                h={{ base: '32px', sm: '40px' }}
                onClick={() => {
                  // 이전 세트의 첫 페이지로 이동
                  const prevSetStartPage = Math.max(
                    0,
                    (currentSet - 1) * PAGE_SET_SIZE,
                  )
                  if (prevSetStartPage !== currentPage) {
                    handlePageChange(prevSetStartPage)
                  } else {
                    // 첫 번째 세트라면 첫 페이지로 이동
                    handlePageChange(0)
                  }
                }}
                disabled={currentPage === 0}
              >
                <CaretDoubleLeftIcon color={'#4E5053'} size={24} />
              </IconButton>
            )}
            <IconButton
              variant={'ghost-grey'}
              w={{ base: '32px', sm: '40px' }}
              h={{ base: '32px', sm: '40px' }}
              onClick={() => {
                // 현재 페이지가 세트의 첫 페이지인지 확인
                const isFirstPageInSet = currentPage === startPage
                if (isFirstPageInSet) {
                  // 세트의 첫 페이지면 이전 세트의 마지막 페이지로 이동
                  const prevSetEndPage = Math.max(
                    0,
                    (currentSet - 1) * PAGE_SET_SIZE + PAGE_SET_SIZE - 1,
                  )
                  handlePageChange(prevSetEndPage)
                } else {
                  // 그렇지 않으면 이전 페이지로 이동
                  handlePageChange(currentPage - 1)
                }
              }}
              disabled={currentPage === 0}
            >
              <CaretLeftIcon color={'#4E5053'} size={24} />
            </IconButton>
          </HStack>
          {renderPageNumbers.map((page, index) => (
            <Button
              key={index}
              w={{ base: '32px', sm: '40px' }}
              h={{ base: '32px', sm: '40px' }}
              borderRadius={'8px'}
              textStyle={'ko-body-3'}
              variant={page === currentPage ? 'solid-primary' : 'ghost-grey'}
              bg={page === currentPage ? 'primary.4' : 'transparent'}
              onClick={() => page !== -1 && handlePageChange(page)}
              disabled={page === -1}
            >
              {page + 1}
            </Button>
          ))}
          <HStack gap={'0px'}>
            <IconButton
              variant={'ghost-grey'}
              w={{ base: '32px', sm: '40px' }}
              h={{ base: '32px', sm: '40px' }}
              onClick={() => {
                // 현재 페이지가 세트의 마지막 페이지인지 확인
                const isLastPageInSet = currentPage === endPage
                if (isLastPageInSet) {
                  // 세트의 마지막이면 다음 세트의 첫 페이지로 이동
                  const nextSetStartPage = (currentSet + 1) * PAGE_SET_SIZE
                  if (nextSetStartPage < totalPages) {
                    handlePageChange(nextSetStartPage)
                  }
                } else {
                  // 그렇지 않으면 다음 페이지로 이동
                  handlePageChange(currentPage + 1)
                }
              }}
              disabled={currentPage >= totalPages - 1}
            >
              <CaretRightIcon color={'#4E5053'} size={24} />
            </IconButton>
            {totalPages > 5 && (
              <IconButton
                variant={'ghost-grey'}
                w={{ base: '32px', sm: '40px' }}
                h={{ base: '32px', sm: '40px' }}
                onClick={() => {
                  // 다음 세트의 첫 페이지로 이동
                  const nextSetStartPage = (currentSet + 1) * PAGE_SET_SIZE
                  if (nextSetStartPage < totalPages) {
                    handlePageChange(nextSetStartPage)
                  } else {
                    // 마지막 세트라면 마지막 페이지로 이동
                    handlePageChange(totalPages - 1)
                  }
                }}
                disabled={currentPage >= totalPages - 1}
              >
                <CaretDoubleRightIcon color={'#4E5053'} size={24} />
              </IconButton>
            )}
          </HStack>
        </Flex>
      )}{' '}
    </VStack>
  )
}
