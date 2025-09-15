'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import {
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'

import { ROUTES } from '@/constants/routes'
import { MagazineListInfoType } from '@/generated/apis/@types/data-contracts'

export const MagazineItem = ({ item }: { item: MagazineListInfoType }) => {
  const router = useRouter()

  const iconSize = useBreakpointValue({ base: 36, sm: 72, md: 48 })

  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="8px"
      w="100%"
      cursor={'pointer'}
      onClick={() => {
        router.push(
          ROUTES.JOURNAL_DETAIL.replace(
            '[journalId]',
            item.magazineId?.toString() ?? '',
          ),
          {
            scroll: true,
          },
        )
      }}
    >
      {item.thumbnail && (
        <Image
          src={item.thumbnail.url || ''}
          alt={item.title || ''}
          width={1440} // 원본 가로(px)
          height={810} // 원본 세로(px) → 비율 정보
          unoptimized // Next의 리사이즈/변환 비활성화(= 최대한 원본 그대로)
          sizes="100vw"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
          }}
        />
      )}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        background="linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.75) 99.78%)"
        p="40px 20px 20px 20px"
        color="white"
      >
        <HStack
          justify={'space-between'}
          align={'end'}
          gap={{ base: '24px', sm: '48px', md: '32px' }}
        >
          <Text textStyle={'ko-heading-1'}>{item.title}</Text>
          <IconButton
            minW={iconSize + 'px'}
            minH={iconSize + 'px'}
            variant="ghost-grey"
            color={'grey.0'}
          >
            <ArrowUpRightIcon size={iconSize} />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  )
}
