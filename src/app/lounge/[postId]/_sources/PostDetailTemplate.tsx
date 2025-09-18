'use client'

import { useMemo } from 'react'

import { useRouter } from 'next/navigation'

import { Button, HStack, Separator, Text, VStack } from '@chakra-ui/react'
import { SirenIcon } from '@phosphor-icons/react/dist/ssr'

import { formatCommentTime } from '@/app/_source/utils/date'
import { EditorContentBlock } from '@/app/spaces/[spaceId]/_sources/components/EditorContentBlock'
import { SpaceGalleryList } from '@/app/spaces/[spaceId]/_sources/components/SpaceGalleryList'
import { HeartIconButton } from '@/app/views/HeartButton'
import { CommentArea } from '@/app/views/comments/CommentArea'
import { usePostModal } from '@/components/@modal/post/usePostModal'
import { If } from '@/components/If'
import { showToast } from '@/components/ui/toaster'
import { getQueryClient } from '@/configs/react-query/get-query-client'
import { ROUTES } from '@/constants/routes'
import { ResponseDTOGetCommunityPostResponseDtoType } from '@/generated/apis/@types/data-contracts'
import {
  QUERY_KEY_COMMUNITY_POST_API_API,
  useAddCommunityPostsCommentsMutation,
  useAddCommunityPostsLikeMutation,
  useDeleteCommunityPostsCommentsMutation,
  useGetCommunityPostsCommentsQuery,
} from '@/generated/apis/CommunityPostApi/CommunityPostApi.query'
import { useGetCommunityPostsSuspenseQuery } from '@/generated/apis/CommunityPostApi/CommunityPostApi.suspenseQuery'
import { clientCookie } from '@/stores/cookie/store'

export const PostDetailTemplate = ({ postId }: { postId: string }) => {
  const { openPostReportModal } = usePostModal()
  const router = useRouter()
  const { data: post } = useGetCommunityPostsSuspenseQuery({
    variables: {
      postId: Number(postId),
    },
    options: {
      select: (data) => data.data,
    },
  })

  const queryClient = getQueryClient()

  const { mutate: addCommunityPostsLike } = useAddCommunityPostsLikeMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEY_COMMUNITY_POST_API_API.GET_COMMUNITY_POSTS({
            postId: Number(postId),
          }),
        })
      },
    },
  })

  const photos = useMemo(() => {
    return post?.images?.filter((v) => !!v.url) || []
  }, [post?.images])

  const onLikeClick = () => {
    const isLoggedIn =
      clientCookie.get('accessToken') && clientCookie.get('refreshToken')

    if (!isLoggedIn) {
      showToast({
        type: 'error',
        description: 'Please login to like this post.',
      })
      router.push(ROUTES.LOGIN + '?redirectUrl=' + window.location.href)
      return
    }

    queryClient.setQueryData(
      QUERY_KEY_COMMUNITY_POST_API_API.GET_COMMUNITY_POSTS({
        postId: Number(postId),
      }),
      (old: ResponseDTOGetCommunityPostResponseDtoType) => {
        return {
          ...old,
          data: {
            ...old.data,
            isLike: !old.data?.isLike,
          },
        }
      },
    )
    if (!post?.isLike) {
      showToast({
        type: 'success',
        description: 'Saved! You can check it in My Page > Saved Items.',
        closeButton: false,
        action: {
          label: '[View Saved Items]',
          onClick: () => {
            router.push(ROUTES.MY_PAGE + '?tab=favorites')
          },
        },
      })
    }
    addCommunityPostsLike({
      postId: Number(postId),
      query: { isLike: !post?.isLike },
    })
  }

  return (
    <VStack
      w={'100%'}
      position={'relative'}
      pt={{ base: '20px', md: '56px' }}
      pb={{ base: '80px', sm: '120px' }}
      px={{ base: '20px', sm: '40px', md: '0px' }}
      gap={{ base: '12px', sm: '16px' }}
    >
      <HStack
        w={'100%'}
        gap={{ base: '6px', sm: '20px' }}
        justify={'end'}
        display={{ base: 'none', sm: 'flex' }}
      >
        <HStack w={'100%'} gap={'20px'} justify={'end'}>
          <HStack gap={'10px'}>
            <Text textStyle={'ko-body-3'}>{post?.nickname}</Text>
            <Separator
              orientation={'vertical'}
              w={'1px'}
              h={'12px'}
              color={'grey.3'}
            />
            <Text textStyle={'ko-body-3'}>
              {formatCommentTime(post?.createdAt ?? '')}
            </Text>
          </HStack>
          <HStack align={'center'} gap={'6px'}>
            <HeartIconButton
              isLike={post?.isLike}
              onClick={() => {
                onLikeClick()
              }}
            />
            <Text textStyle={'ko-body-3'}>{post?.likeCount}</Text>
          </HStack>
        </HStack>
      </HStack>

      <VStack
        gap={'6px'}
        align={'start'}
        display={{ base: 'flex', sm: 'none' }}
        w={'100%'}
      >
        <Text textStyle={'ko-body-3'}>{post?.nickname}</Text>
        <HStack
          align={'center'}
          gap={'6px'}
          justify={'space-between'}
          w={'100%'}
        >
          <Text textStyle={'ko-body-3'}>
            {formatCommentTime(post?.createdAt ?? '')}
          </Text>

          <HStack align={'center'} gap={'6px'}>
            <HeartIconButton
              isLike={post?.isLike}
              onClick={() => {
                onLikeClick()
              }}
            />
            <Text textStyle={'ko-body-3'}>{post?.likeCount}</Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack w={'100%'} align={'start'} gap={'32px'}>
        <EditorContentBlock
          content={post?.content ?? ''}
          bg={'transparent'}
          textStyle={'ko-body-6'}
          minHeight={{ base: 'unset', sm: '300px' }}
          color={'grey.8'}
        />
        <If condition={photos.length > 0}>
          <SpaceGalleryList photos={photos} />
        </If>

        <HStack gap={'6px'} justify={'end'} w={'100%'} textStyle={'ko-body-3'}>
          <Button
            variant={'ghost-grey'}
            color={'grey.10'}
            onClick={() => {
              openPostReportModal(Number(postId))
            }}
          >
            <SirenIcon size={24} />
            <Text textStyle={'ko-body-3'}>Report this post </Text>
          </Button>
        </HStack>

        <Separator
          orientation={'horizontal'}
          color={'primary.2'}
          height={'1px'}
          w={'100%'}
        />

        <CommentArea
          id={postId}
          viewCount={post?.viewCount}
          useGetCommentsQuery={useGetCommunityPostsCommentsQuery}
          useAddCommentMutation={useAddCommunityPostsCommentsMutation}
          useDeleteCommentMutation={useDeleteCommunityPostsCommentsMutation}
          getCommentsVariables={(
            id: string,
            page: number,
            pageSize: number,
            options?: any,
          ) => ({
            variables: {
              postId: Number(id),
              query: {
                page,
                pageSize,
              },
            },
            options,
          })}
          addCommentVariables={(id: string, comment: string) => ({
            postId: Number(id),
            data: {
              comment,
            },
          })}
          deleteCommentVariables={(id: string, commentId: number) => ({
            postId: Number(id),
            commentId,
          })}
        />
      </VStack>
    </VStack>
  )
}
