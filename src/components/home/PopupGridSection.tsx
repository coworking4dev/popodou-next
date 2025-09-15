'use client'

import { useRouter } from 'next/navigation'

import {
  Box,
  Button,
  Center,
  Container,
  ContainerProps,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react'
import { XCircleIcon } from '@phosphor-icons/react/dist/ssr'

import { ROUTES } from '@/constants/routes'
import {
  PopupResponseDtoType,
  ThisMonthPopupResponseType,
} from '@/generated/apis/@types/data-contracts'
import { useFavoriteQueryHandler } from '@/hooks/useFavoriteQueryHandler'

import { PopupCard } from './PopupCard'

interface PopupGridSectionProps {
  title: string
  popups: (PopupResponseDtoType | ThisMonthPopupResponseType)[]
  containerProps?: ContainerProps
}

export const PopupGridSection = ({
  title,
  popups,
  containerProps = { px: '240px', py: '120px' },
}: PopupGridSectionProps) => {
  const router = useRouter()

  return (
    <Container {...containerProps}>
      <VStack gap="24px" align="start" width="100%">
        <Flex justify="space-between" align="end" width="100%" height="56px">
          <Text textStyle="ko-display-4" color="gray.900">
            {title}
          </Text>
          <Button
            size="lg"
            variant="solid-primary"
            color="grey.0"
            display={{ base: 'none', sm: 'block' }}
            onClick={() => {
              router.push(ROUTES.POPUPS + '?status=UPCOMING')
            }}
          >
            READ ALL
          </Button>
        </Flex>
        <PopupGridSectionContent popups={popups} />
      </VStack>
    </Container>
  )
}

const PopupGridSectionContent = ({
  popups,
}: {
  popups: (PopupResponseDtoType | ThisMonthPopupResponseType)[]
}) => {
  const { onChangePopupLike } = useFavoriteQueryHandler()

  if (popups?.length === 0) {
    return (
      <Center w={'100%'} flexDir={'column'} gap="12px" h={'600px'}>
        <XCircleIcon color={'#8B7C74'} size={54} />
        <Text textStyle="ko-body-4" color="grey.7">
          No ongoing Pop-ups Coming Soon.
        </Text>
      </Center>
    )
  }

  return (
    <Box width="100%">
      {/* Mobile Layout (base) - 1 column */}
      <VStack
        gap="24px"
        align="start"
        width="100%"
        display={{ base: 'flex', sm: 'none' }}
      >
        {popups.slice(0, 6).map((popup) => (
          <Box key={popup.popupId} w="100%">
            <PopupCard
              popup={popup}
              titleTextStyle="ko-heading-2"
              height="400px"
              onLikeClick={() => {
                onChangePopupLike(popup.popupId, !popup.isLike, {})
              }}
            />
          </Box>
        ))}
      </VStack>

      {/* Tablet Layout (sm) - 2 columns */}
      <Flex
        gap="24px"
        width="100%"
        align="start"
        display={{ base: 'none', sm: 'flex', md: 'none' }}
      >
        {/* Column 1 */}
        <VStack gap="24px" align="start" flex="1">
          {popups[0] && (
            <Box w="100%">
              <PopupCard
                popup={popups[0]}
                titleTextStyle="ko-heading-2"
                height="354px"
                onLikeClick={() => {
                  onChangePopupLike(popups[0].popupId, !popups[0].isLike, {})
                }}
              />
            </Box>
          )}
          {popups[1] && (
            <Box w="100%">
              <PopupCard
                popup={popups[1]}
                titleTextStyle="ko-heading-2"
                height="354px"
                onLikeClick={() => {
                  onChangePopupLike(popups[1].popupId, !popups[1].isLike, {})
                }}
              />
            </Box>
          )}
          {popups[4] && (
            <Box w="100%">
              <PopupCard
                popup={popups[4]}
                titleTextStyle="ko-heading-2"
                height="354px"
                onLikeClick={() => {
                  onChangePopupLike(popups[4].popupId, !popups[4].isLike, {})
                }}
              />
            </Box>
          )}
        </VStack>

        {/* Column 2 */}
        <VStack gap="24px" align="start" flex="1">
          {popups[2] && (
            <Box w="100%">
              <PopupCard
                popup={popups[2]}
                titleTextStyle="ko-heading-2"
                height="411px"
                onLikeClick={() => {
                  onChangePopupLike(popups[2].popupId, !popups[2].isLike, {})
                }}
              />
            </Box>
          )}
          {popups[3] && (
            <Box w="100%">
              <PopupCard
                popup={popups[3]}
                titleTextStyle="ko-heading-2"
                height={'296px'}
                onLikeClick={() => {
                  onChangePopupLike(popups[3].popupId, !popups[3].isLike, {})
                }}
              />
            </Box>
          )}
          {popups[5] && (
            <Box w="100%">
              <PopupCard
                popup={popups[5]}
                titleTextStyle="ko-heading-2"
                height={'354px'}
                onLikeClick={() => {
                  onChangePopupLike(popups[5].popupId, !popups[5].isLike, {})
                }}
              />
            </Box>
          )}
        </VStack>
      </Flex>

      {/* Desktop Layout (md and above) - 3 columns */}
      <Flex
        gap="32px"
        width="100%"
        align="start"
        display={{ base: 'none', md: 'flex' }}
      >
        {/* Column 1 */}
        <VStack gap="32px" align="start" flex="1">
          {popups[0] && (
            <Box w="100%">
              <PopupCard
                popup={popups[0]}
                titleTextStyle="ko-heading-2"
                height="506px"
                onLikeClick={() => {
                  onChangePopupLike(popups[0].popupId, !popups[0].isLike, {})
                }}
              />
            </Box>
          )}
          {popups[1] && (
            <Box w="100%">
              <PopupCard
                popup={popups[1]}
                titleTextStyle="ko-heading-2"
                height="506px"
                onLikeClick={() => {
                  onChangePopupLike(popups[1].popupId, !popups[1].isLike, {})
                }}
              />
            </Box>
          )}
        </VStack>

        {/* Column 2 */}
        <VStack gap="32px" align="start" flex="1">
          {popups[2] && (
            <Box w="100%">
              <PopupCard
                popup={popups[2]}
                titleTextStyle="ko-heading-2"
                height={'588px'}
                onLikeClick={() => {
                  onChangePopupLike(popups[2].popupId, !popups[2].isLike, {})
                }}
              />
            </Box>
          )}
          {popups[3] && (
            <Box w="100%">
              <PopupCard
                popup={popups[3]}
                titleTextStyle="ko-heading-2"
                height="424px"
                onLikeClick={() => {
                  onChangePopupLike(popups[3].popupId, !popups[3].isLike, {})
                }}
              />
            </Box>
          )}
        </VStack>

        {/* Column 3 */}
        <VStack gap="32px" align="start" flex="1">
          {popups[4] && (
            <Box w="100%">
              <PopupCard
                popup={popups[4]}
                titleTextStyle="ko-heading-2"
                height={'506px'}
                onLikeClick={() => {
                  onChangePopupLike(popups[4].popupId, !popups[4].isLike, {})
                }}
              />
            </Box>
          )}
          {popups[5] && (
            <Box w="100%">
              <PopupCard
                popup={popups[5]}
                titleTextStyle="ko-heading-2"
                height={'506px'}
                onLikeClick={() => {
                  onChangePopupLike(popups[5].popupId, !popups[5].isLike, {})
                }}
              />
            </Box>
          )}
        </VStack>
      </Flex>
    </Box>
  )
}
