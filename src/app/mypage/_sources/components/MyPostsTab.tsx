'use client'

import { Fragment, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  Box,
  Center,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { NotePencilIcon, TrashIcon } from '@phosphor-icons/react/dist/ssr'

import dayjs from 'dayjs'
import { useInView } from 'react-intersection-observer'

import { useAlert } from '@/components/@modal/hooks/useAlert'
import { LoadingWrapper } from '@/components/LoadingWrapper'
import { showToast } from '@/components/ui/toaster'
import { ROUTES } from '@/constants/routes'
import { MyCommunityPostResponseDtoType } from '@/generated/apis/@types/data-contracts'
import { useDeleteCommunityPostsMutation } from '@/generated/apis/CommunityPostApi/CommunityPostApi.query'
import {
  QUERY_KEY_MY_PAGE_API_API,
  useGetMyCommunityPostsInfiniteQuery,
} from '@/generated/apis/MyPageApi/MyPageApi.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

export const MyPostsTab = () => {
  const { openAlert } = useAlert()
  const invalidateQueries = useInvalidateQueries()
  const { ref, inView } = useInView()

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetMyCommunityPostsInfiniteQuery<MyCommunityPostResponseDtoType[]>({
    options: {
      select: (data: any) => {
        return data?.pages.flatMap((page: any) => page.data?.data || [])
      },
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  const { mutateAsync: deletePost } = useDeleteCommunityPostsMutation({})

  const handleDeletePost = (postId: number) => {
    openAlert({
      title: 'Are you sure you want to delete this?',
      description: 'This action cannot be undone.',
      confirmLabel: 'Delete',
      confirmColor: 'accent.red2',
      cancelLabel: 'Cancel',
      onConfirm: async () => {
        try {
          await deletePost({ postId })

          invalidateQueries(
            QUERY_KEY_MY_PAGE_API_API.GET_MY_COMMUNITY_POSTS_INFINITE(),
          )

          showToast({
            type: 'success',
            description: 'Successfully deleted.',
          })
        } catch (e) {
          // if (e instanceof Response) {
          //   const data = await e.json()
          //   showToast({
          //     type: 'error',
          //     description: data.errorCode,
          //   })
          // }
        }
      },
    })
  }

  const isEmpty = posts?.length === 0

  return (
    <VStack
      align={'start'}
      bg="white"
      borderRadius="20px"
      py={'28px'}
      px={{ base: '16px', sm: '28px' }}
      gap={'28px'}
      flex={1}
      h={isEmpty ? '100%' : 'auto'}
      justify={'stretch'}
    >
      <Text textStyle="ko-heading-2" color="grey.10">
        My Posts
      </Text>
      <LoadingWrapper loading={isLoading}>
        <MyPostTabContent
          posts={posts || []}
          onDeletePost={handleDeletePost}
          itemRef={ref}
          isFetchingNextPage={isFetchingNextPage}
        />
      </LoadingWrapper>
    </VStack>
  )
}

const MyPostTabContent = ({
  posts,
  onDeletePost,
  itemRef,
  isFetchingNextPage,
}: {
  posts: MyCommunityPostResponseDtoType[]
  onDeletePost: (postId: number) => void
  itemRef: (node: Element | null) => void
  isFetchingNextPage: boolean
}) => {
  const isEmpty = posts.length === 0

  if (isEmpty) {
    return (
      <Center w="100%" h="100%" flexDirection="column" gap="16px">
        <NotePencilIcon size={54} color="#8B7C74" />
        <Text textStyle="ko-body-4" color="grey.7">
          You haven’t written any posts yet.
        </Text>
      </Center>
    )
  }

  return (
    <VStack
      gap={{ base: '20px', sm: '28px' }}
      align="stretch"
      overflow="hidden"
      w={'100%'}
    >
      {posts.map((post, index) => (
        <Fragment key={post.postId}>
          <MyPostItem
            post={post}
            onDeletePost={onDeletePost}
            key={post.postId}
          />
          {index < posts.length - 1 && (
            <Box h="1px" bg="grey.2" w="100%" key={`${post.postId}-divider`} />
          )}
        </Fragment>
      ))}
      {isFetchingNextPage ?
        <Center h={'50px'} width={'100%'}>
          <Spinner />
        </Center>
      : <div ref={itemRef} />}
    </VStack>
  )
}

export const MyPostItem = ({
  post,
  onDeletePost,
}: {
  post: MyCommunityPostResponseDtoType
  onDeletePost: (postId: number) => void
}) => {
  const isBase = useBreakpointValue({ base: true, sm: false })

  return (
    <Box key={post.postId}>
      {/* 게시글 내용 - 클릭 가능한 링크로 감싸기 */}
      <Link
        href={ROUTES.LOUNGE_DETAIL.replace('[postId]', post.postId.toString())}
      >
        <HStack
          gap="20px"
          cursor="pointer"
          flexDirection={{ base: 'column', sm: 'row' }}
          align={{ base: 'start', sm: 'center' }}
        >
          {/* 이미지가 있는 경우 */}
          {post.images?.[0] && (
            <Box
              w="90px"
              h="90px"
              borderRadius="8px"
              overflow="hidden"
              flexShrink={0}
              bg="grey.2"
              position="relative"
            >
              <Image
                src={post.images[0].url || ''}
                alt="Post image"
                fill
                objectFit="cover"
              />
            </Box>
          )}
          {/* 컨텐츠 영역 */}
          <VStack
            gap={{ base: '12px', sm: '8px' }}
            align={'start'}
            justify={'center'}
            w={'100%'}
          >
            <HStack
              w={'100%'}
              justify={'space-between'}
              align={{ base: 'start', sm: 'center' }}
              gap={'20px'}
            >
              <Text
                css={{
                  lineClamp: 3,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
                textStyle="ko-heading-4"
                _hover={{
                  color: 'primary.4',
                }}
                transition="color 0.2s"
              >
                {post.content}
              </Text>

              {(isBase || !post.images?.[0]) && (
                <HStack justify="flex-end">
                  <IconButton
                    aria-label="Delete post"
                    variant="outline-grey"
                    size="sm"
                    borderRadius="6px"
                    w="32px"
                    h="32px"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onDeletePost(post.postId)
                    }}
                    _hover={{
                      bg: 'grey.0',
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </HStack>
              )}
            </HStack>

            {/* 메타 정보 - 이미지가 있는 경우에만 여기에 표시 */}
            <HStack
              gap={{ base: '6px', sm: '10px' }}
              align={{ base: 'start', sm: 'center' }}
              flexDirection={{ base: 'column', sm: 'row' }}
            >
              <Text textStyle="ko-body-6" color={'grey.9'}>
                {post.nickname}
              </Text>
              <Box
                w="1px"
                h="12px"
                bg="grey.3"
                display={{ base: 'none', sm: 'block' }}
              />
              <Text textStyle="ko-body-6" color={'grey.9'}>
                {dayjs(post.createdAt).format('MMMM DD[th], YYYY')}
              </Text>
            </HStack>
          </VStack>
          {post.images?.[0] && !isBase && (
            <HStack justify="flex-end" display={{ base: 'none', sm: 'flex' }}>
              <IconButton
                aria-label="Delete post"
                variant="outline-grey"
                size="sm"
                borderRadius="6px"
                w="32px"
                h="32px"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onDeletePost(post.postId)
                }}
                _hover={{
                  bg: 'grey.0',
                }}
              >
                <TrashIcon />
              </IconButton>
            </HStack>
          )}
        </HStack>
      </Link>
    </Box>
  )
}
