import { Center, Separator, VStack } from '@chakra-ui/react'

import { CommentInfoType } from '@/generated/apis/@types/data-contracts'

import { CommentsEmptyView } from './CommentEmptyContent'
import { CommentItem } from './CommentItem'

interface Props {
  comments: CommentInfoType[]
  loading: boolean
  onDelete: (commentId: number) => void
}

export const CommentList = ({ comments, loading, onDelete }: Props) => {
  // if (loading) {
  //   return (
  //     <Center w={'100%'} h={'800px'}>
  //       <Spinner />
  //     </Center>
  //   )
  // }

  if (comments.length === 0) {
    return (
      <Center w={'100%'} h={'70vh'} maxH={'800px'}>
        <CommentsEmptyView />
      </Center>
    )
  }
  return (
    <VStack align="stretch" w={'100%'} gap={'24px'}>
      {comments?.map((comment, index) => {
        const elements = []
        elements.push(
          <CommentItem
            key={`comment-${index}`}
            comment={comment}
            onDelete={() => onDelete(comment.commentId)}
          />,
        )

        if (index < comments.length - 1) {
          elements.push(
            <Separator
              key={`separator-${index}`}
              h={'1px'}
              borderColor={'grey.2'}
            />,
          )
        }
        return elements
      })}
    </VStack>
  )
}
