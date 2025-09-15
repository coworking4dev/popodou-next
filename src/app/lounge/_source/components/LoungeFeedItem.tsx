import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'

import { getFeedItemBadgeStyle } from '@/app/_source/helper/lounge'
import { formatCommentTime } from '@/app/_source/utils/date'
import { CustomBadge } from '@/components/CustomBadge'
import { ROUTES } from '@/constants/routes'
import { LoungeFeedDtoType } from '@/generated/apis/@types/data-contracts'

interface Props {
  item: LoungeFeedDtoType
}

export const LoungeFeedItem = ({ item }: Props) => {
  const router = useRouter()

  return (
    <Box
      bg="white"
      borderRadius="10px"
      border="1px solid"
      borderColor="grey.2"
      p="12px"
      w="full"
    >
      <VStack gap="8px" align="stretch" w="full">
        {item.thumbnail?.url && (
          <Image
            src={item.thumbnail?.url}
            alt={item.thumbnail?.url || ''}
            width={1440}
            height={810}
            style={{
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        )}

        <CustomBadge
          {...getFeedItemBadgeStyle(item.type)}
          textStyle={'ko-body-3'}
        />
        <HStack gap="10px" w="full">
          <HStack gap="10px" maxH={'100%'} overflow={'hidden'}>
            <Text
              textStyle={'ko-body-3'}
              color={'grey.10'}
              css={{
                lineClamp: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'nowrap',
                wordBreak: 'break-all',
              }}
            >
              {item.nickname || 'Deleted Account'}
            </Text>
            <Box w="1px" h="12px" bg="grey.300" />
            <Text
              textStyle={'ko-body-6'}
              color={'grey.8'}
              whiteSpace={'nowrap'}
            >
              {formatCommentTime(item.createdAt)}
            </Text>
          </HStack>
        </HStack>
        <Text
          textStyle="ko-body-6"
          color={'grey.8'}
          maxH={'110px'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
        >
          {item.content}
        </Text>
        <Button
          w="full"
          size={'lg'}
          color={'grey.8'}
          variant={'outline-grey'}
          textStyle={'ko-body-5'}
          onClick={() => {
            if (item.type === 'MAGAZINE_COMMENT') {
              router.push(`${ROUTES.JOURNAL}/${item.id}`)
            } else if (item.type === 'POPUP_COMMENT') {
              router.push(`${ROUTES.POPUPS}/${item.id}`)
            } else if (item.type === 'LOUNGE') {
              router.push(`${ROUTES.LOUNGE}/${item.id}`)
            }
          }}
        >
          View Content
        </Button>
      </VStack>
    </Box>
  )
}
