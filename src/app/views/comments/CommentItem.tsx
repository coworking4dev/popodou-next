import { Button, HStack, Text, VStack } from '@chakra-ui/react'

import { formatCommentTime } from '@/app/_source/utils/date'
import { CommentInfoType } from '@/generated/apis/@types/data-contracts'

export const CommentItem = ({
  comment,
  onDelete,
}: {
  comment: CommentInfoType
  onDelete: () => void
}) => {
  return (
    <VStack w={'100%'} gap={'10px'} align={'start'}>
      <HStack w={'100%'} justify={'space-between'}>
        <HStack justify="space-between" align="flex-start" gap={'4px'}>
          <Text textStyle={'ko-body-6'} color={'grey.9'}>
            {comment.nickname || 'Deleted Account'}
          </Text>
          <Text textStyle={'ko-body-6'} color={'grey.7'}>
            ·
          </Text>
          <Text textStyle={'ko-body-6'} color={'grey.7'}>
            {formatCommentTime(comment.createdAt)}
          </Text>
        </HStack>
        {comment.isMine && (
          <Button
            size={'sm'}
            variant={'ghost-grey'}
            textStyle={'ko-body-6'}
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </HStack>
      <Text
        textStyle={'ko-body-4'}
        whiteSpace={'pre-wrap'}
        overflowWrap={'anywhere'}
        overflow={'hidden'}
      >
        {comment.comment}
      </Text>
    </VStack>
  )
}
