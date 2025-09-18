'use client'

import {
  Box,
  Container,
  HStack,
  IconButton,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LinkIcon, ShareNetworkIcon } from '@phosphor-icons/react/dist/ssr'

import { EditorContentBlock } from '@/app/spaces/[spaceId]/_sources/components/EditorContentBlock'
import { CommentArea } from '@/app/views/comments/CommentArea'
import { Button } from '@/components/ui/button'
import { showToast } from '@/components/ui/toaster'
import {
  useAddComment1Mutation,
  useDeleteComment1Mutation,
  useGetComments1Query,
} from '@/generated/apis/MagazineApi/MagazineApi.query'
import { useGetMagazineDetailSuspenseQuery } from '@/generated/apis/MagazineApi/MagazineApi.suspenseQuery'

const isValidUrl = (url: string | undefined) => {
  if (!url) return false

  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

interface Props {
  journalId: string
}

export const MagazineDetailContainer = ({ journalId }: Props) => {
  const { data } = useGetMagazineDetailSuspenseQuery({
    variables: {
      magazineId: Number(journalId),
    },
    options: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  })

  const onClickPurchase = () => {
    if (isValidUrl(data?.data?.externalProductUrl)) {
      window.open(data?.data?.externalProductUrl, '_blank')
    } else {
      showToast({
        type: 'error',
        description: 'Invalid URL',
      })
    }
  }

  return (
    <Box position={'relative'}>
      <Container
        maxW={'1440px'}
        pb={'120px'}
        boxSizing={'border-box'}
        px={{ base: '20px', sm: '40px', md: '0px' }}
        pt={{ md: '56px', base: '20px' }}
      >
        <VStack align={'start'} w={'100%'} gap={'40px'}>
          <HStack
            align={'flex-end'}
            justify={'space-between'}
            w={'100%'}
            gap={'56px'}
          >
            <Text textStyle={'ko-display-3'}>{data?.data?.title}</Text>
            <HStack display={{ base: 'none', md: 'flex' }}>
              <Button size={'lg'} onClick={onClickPurchase}>
                PURCHASE
              </Button>
              <IconButton
                minH={'48px'}
                minW={'48px'}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  showToast({
                    type: 'success',
                    description: 'Link copied.',
                  })
                }}
              >
                <LinkIcon size={24} />
              </IconButton>
            </HStack>
          </HStack>

          <Text textStyle={'ko-heading-1'}>{data?.data?.subTitle}</Text>
          <EditorContentBlock content={data?.data?.content || ''} />

          <Separator h={'1px'} w={'100%'} borderColor={'primary.2'} />

          <CommentArea
            id={journalId}
            viewCount={data?.data?.viewCount}
            useGetCommentsQuery={useGetComments1Query}
            useAddCommentMutation={useAddComment1Mutation}
            useDeleteCommentMutation={useDeleteComment1Mutation}
            getCommentsVariables={(
              id: string,
              page: number,
              pageSize: number,
              options?: any,
            ) => ({
              variables: {
                magazineId: Number(id),
                query: {
                  page,
                  pageSize,
                },
              },
              options,
            })}
            addCommentVariables={(id: string, comment: string) => ({
              magazineId: Number(id),
              data: {
                comment,
              },
            })}
            deleteCommentVariables={(id: string, commentId: number) => ({
              magazineId: Number(id),
              commentId,
            })}
          />
        </VStack>
      </Container>
      <HStack
        width={'100%'}
        display={{ base: 'flex', md: 'none' }}
        position={'sticky'}
        bottom={'0px'}
        left={'0px'}
        h={'80px'}
        right={'0px'}
        p={'10px'}
        zIndex={99}
      >
        <Button width={'100%'} size={'lg'} onClick={onClickPurchase}>
          PURCHASE
        </Button>
        <IconButton
          minH={'48px'}
          minW={'48px'}
          onClick={() => {
            if (
              navigator.canShare({
                url: window.location.href,
              })
            ) {
              navigator.share({
                url: window.location.href,
              })
            } else {
              navigator.clipboard.writeText(window.location.href)
              showToast({
                type: 'success',
                description: 'Link copied.',
              })
            }
          }}
        >
          <ShareNetworkIcon size={24} />
        </IconButton>
      </HStack>
    </Box>
  )
}
