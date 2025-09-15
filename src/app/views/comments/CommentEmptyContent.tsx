import { Center, Text, chakra } from '@chakra-ui/react'
import { ChatCircleDotsIcon as ChatCircleDotsIconOriginal } from '@phosphor-icons/react/dist/ssr'

const ChatCircleDotsIcon = chakra(ChatCircleDotsIconOriginal)

export const CommentsEmptyView = () => {
  return (
    <Center w={'100%'} h={'auto'} flexDirection={'column'} gap={'12px'}>
      <ChatCircleDotsIcon width={54} height={54} color={'primary.4'} />
      <Text textStyle={'ko-body-6'} color={'grey.7'}>
        Be the first to leave a comment.
      </Text>
    </Center>
  )
}
