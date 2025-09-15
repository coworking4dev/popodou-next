'use client'

import {
  Box,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'

import { ROUTES } from '@/constants/routes'
import { PopupStoriesResponseType } from '@/generated/apis/@types/data-contracts'

interface StoryCardProps {
  story: PopupStoriesResponseType
  onReadMore?: () => void
  variant?: 'large' | 'small'
}

const filterImageFromHTMLContent = (content: string) => {
  return content.replace(/<img[^>]*>/g, '')
}

export const StoryCard = ({
  story,
  onReadMore,
  variant = 'small',
}: StoryCardProps) => {
  const isLarge = variant === 'large'

  if (isLarge) {
    return (
      <Link
        href={ROUTES.JOURNAL_DETAIL.replace(
          '[journalId]',
          story.magazineId?.toString() ?? '',
        )}
        style={{
          width: '100%',
        }}
      >
        <Box
          position="relative"
          borderRadius="lg"
          overflow="hidden"
          height="620px"
          width="100%"
          cursor={'pointer'}
          _hover={{
            '& > img': {
              transition: 'filter 0.2s ease',
              filter: 'blur(7.5px)',
            },
          }}
        >
          <Image
            src={story.thumbnail?.url}
            alt={story.title}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            objectFit="cover"
          />

          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            p="5"
            background="linear-gradient(transparent, rgba(0,0,0,0.7))"
          >
            <HStack justify="space-between" align="end" width="100%">
              <Text
                textStyle="ko-display-4"
                color={story.titleHex ? '#' + story.titleHex : 'grey.0'}
                flex={1}
              >
                {story.title}
              </Text>

              <IconButton
                aria-label="read-more-button"
                variant="ghost-primary"
                size="lg"
                width="48px"
                height="48px"
                onClick={onReadMore}
              >
                <ArrowUpRightIcon
                  size={48}
                  color={story.titleHex ? '#' + story.titleHex : 'grey.0'}
                />
              </IconButton>
            </HStack>
          </Box>
        </Box>
      </Link>
    )
  } else {
    return (
      <Link
        href={ROUTES.JOURNAL_DETAIL.replace(
          '[journalId]',
          story.magazineId?.toString() ?? '',
        )}
        style={{
          width: '100%',
        }}
      >
        <VStack align="start" gap="20px" width="100%" height="620px">
          <Box
            borderRadius="lg"
            overflow="hidden"
            maxHeight="320px"
            minHeight="320px"
            width="100%"
          >
            <Image
              src={story.thumbnail?.url}
              alt={story.title}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>

          <Box
            width="100%"
            height={'280px'}
            maxH={'280px'}
            minH={'280px'}
            overflow={'hidden'}
            display={'flex'}
            flexDirection={'column'}
          >
            <Text
              textStyle="ko-heading-2"
              css={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {story.title}
            </Text>

            <Text
              mt={'6px'}
              textStyle="ko-body-2"
              color="grey.9"
              css={{
                display: '-webkit-box',
                WebkitLineClamp: 7,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              dangerouslySetInnerHTML={{
                __html: filterImageFromHTMLContent(story.content ?? ''),
              }}
            ></Text>
          </Box>
        </VStack>
      </Link>
    )
  }
}
