'use client'

import { Fragment, useEffect } from 'react'

import {
  Accordion,
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { HeadsetIcon } from '@phosphor-icons/react/dist/ssr'

import dayjs from 'dayjs'
import { useInView } from 'react-intersection-observer'

import {
  getInquiryTypeLabel,
  getStatusLabel,
  getStatusStyle,
} from '@/app/_source/helper/my-page'
import { useInquiryModals } from '@/components/@modal/Inquiry/useInquiryModal'
import { LoadingWrapper } from '@/components/LoadingWrapper'
import { MyInquiryResponseDtoType } from '@/generated/apis/@types/data-contracts'
import { useGetMyInquiryListInfiniteQuery } from '@/generated/apis/InquiryApi/InquiryApi.query'

export const InquiryButton = () => {
  const { openInquiryModal } = useInquiryModals()
  return <Button onClick={() => openInquiryModal()}>Inquiry</Button>
}

export const InquiryTab = () => {
  const isBase = useBreakpointValue({ base: true, sm: false }) ?? false
  const { ref, inView } = useInView()

  const {
    data: inquiries,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyInquiryListInfiniteQuery<MyInquiryResponseDtoType[]>({
    options: {
      select: (data) => {
        return data?.pages.flatMap((page) => page.data.data)
      },
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <VStack
      align={'start'}
      bg="white"
      borderRadius="20px"
      py={{ base: '20px', sm: '28px' }}
      px={{ base: '16px', sm: '28px' }}
      gap={'28px'}
      height={'100%'}
    >
      {isBase ?
        <VStack w="100%" align="start" gap={'6px'}>
          <HStack w="100%" justify="space-between">
            <Text textStyle="ko-heading-2" color="grey.10">
              1:1 Inquiry
            </Text>
            <InquiryButton />
          </HStack>
          <Text textStyle="ko-body-4" color="grey.9">
            We&apos;ll review your inquiry and send the response by email.
          </Text>
        </VStack>
      : <HStack
          w="100%"
          justify="space-between"
          align={{ base: 'start', sm: 'center' }}
          flexDirection={{ base: 'column', sm: 'row' }}
          gap={{ base: '20px', sm: '0' }}
        >
          <VStack align="start" gap="6px">
            <Text textStyle="ko-heading-2" color="grey.10">
              1:1 Inquiry
            </Text>
            <Text textStyle="ko-body-4" color="grey.9">
              We&apos;ll review your inquiry and send the response by email.
            </Text>
          </VStack>
          <InquiryButton />
        </HStack>
      }
      <LoadingWrapper loading={isLoading}>
        <InquiryTabContent
          inquiries={inquiries || []}
          itemRef={ref}
          isFetchingNextPage={isFetchingNextPage}
        />
      </LoadingWrapper>
    </VStack>
  )
}

const InquiryTabContent = ({
  inquiries,
  isFetchingNextPage,
  itemRef,
}: {
  inquiries: MyInquiryResponseDtoType[]
  isFetchingNextPage: boolean
  itemRef: (node: Element | null) => void
}) => {
  if (inquiries.length === 0) {
    return (
      <Center w="100%" h="100%" flexDirection="column" gap="24px">
        <Box w="54px" h="54px" color="primary.4">
          <HeadsetIcon size={54} />
        </Box>
        <Text textStyle="ko-body-4" color="grey.7">
          You have no 1:1 inquiry history.
        </Text>
      </Center>
    )
  }

  return (
    <VStack gap="12px" align="stretch" w={'100%'}>
      {inquiries?.map((inquiry, index) => (
        <Fragment key={inquiry.id}>
          <InquiryItem inquiry={inquiry} key={inquiry.id} />
          {index < inquiries.length - 1 && (
            <Box h="1px" bg="grey.2" w="100%" key={`${inquiry.id}-divider`} />
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

const InquiryItem = ({ inquiry }: { inquiry: MyInquiryResponseDtoType }) => {
  const statusStyle = getStatusStyle(inquiry.status)

  return (
    <Accordion.Root collapsible>
      <Accordion.Item value={inquiry.id.toString()} border="none">
        <Accordion.ItemTrigger
          p={0}
          overflow="hidden"
          borderRadius="8px"
          _hover={{ bg: inquiry.reply ? 'grey.0' : 'transparent' }}
          transition="background-color 0.2s"
          cursor={'pointer'}
          _open={{ bg: 'grey.0' }}
        >
          <HStack
            w="100%"
            align="center"
            justify="start"
            gap={{ base: '12px', sm: '0' }}
          >
            {/* 번호 */}
            <Box
              w="50px"
              h="50px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Text textStyle="ko-body-4" color="grey.9" textAlign="center">
                {inquiry.id}
              </Text>
            </Box>

            {/* 문의 타입 */}
            <Box
              px={{ base: '8px', sm: '16px' }}
              py="12px"
              flexShrink={0}
              minW={'128px'}
              display={{ base: 'none', sm: 'flex' }}
            >
              <Text textStyle="ko-body-4" color="grey.9">
                {getInquiryTypeLabel(inquiry.type)}
              </Text>
            </Box>

            {/* 문의 날짜 */}
            <Box
              px={{ base: '8px', sm: '16px' }}
              py="12px"
              flexShrink={0}
              display={{ base: 'none', sm: 'flex' }}
            >
              <Text textStyle="ko-body-4" color="grey.9" textAlign="center">
                {dayjs(inquiry.inquiredAt).format('MMMM DD[th], YYYY')}
              </Text>
            </Box>

            {/* 제목 */}
            <Box
              flex={1}
              pl={'8px'}
              pr={'20px'}
              py="12px"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="start"
            >
              <Text
                textStyle="ko-body-4"
                color="grey.9"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                maxW="100%"
              >
                {inquiry.title}
              </Text>
            </Box>

            <HStack gap="8px" align="center" justify="center" flexShrink={0}>
              <Box
                bg={statusStyle.bg}
                color={statusStyle.color}
                px="6px"
                py="0"
                borderRadius="6px"
                display="flex"
                alignItems="center"
                justifyContent="start"
              >
                <Text textStyle="ko-body-5" color={statusStyle.color}>
                  {getStatusLabel(inquiry.status)}
                </Text>
              </Box>
            </HStack>
          </HStack>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Box bg="grey.1" px="20px" py="12px" borderRadius="8px" mt="8px">
            <Text
              textStyle="ko-body-4"
              color="grey.9"
              lineHeight="1.6"
              wordBreak="break-word"
            >
              {inquiry.reply}
            </Text>
          </Box>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
