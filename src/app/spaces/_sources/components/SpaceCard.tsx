import Image from 'next/image'
import Link from 'next/link'

import { Box, Text, VStack } from '@chakra-ui/react'

import { getCategoryBadgeStyle } from '@/app/_source/helper/category'
import { CustomBadge } from '@/components/CustomBadge'
import { ROUTES } from '@/constants/routes'
import { GetAllPlaceResponseDtoType } from '@/generated/apis/@types/data-contracts'

interface Props {
  space: GetAllPlaceResponseDtoType
}

// Badge 컴포넌트 구현

export const BigSpaceCard = ({ space }: Props) => {
  return (
    <Link
      style={{
        width: '100%',
        height: '100%',
      }}
      href={ROUTES.SPACE_DETAIL.replace('[spaceId]', space.placeId.toString())}
    >
      <Box
        position="relative"
        borderRadius="8px"
        overflow="hidden"
        width="100%"
        minH={'500px'}
        h={'fit-content'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-end'}
      >
        {space.thumbnail?.url && (
          <Image
            src={space.thumbnail?.url}
            alt={space.title || ''}
            width={1440}
            height={810}
            sizes="100vw"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        <Box
          background="linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.75) 99.784%)"
          display="flex"
          position={'relative'}
          width={'100%'}
          height={'100%'}
          flexDirection="column"
          justifyContent="flex-end"
          padding="40px 20px 28px"
        >
          <Box display="flex" flexDirection="column" gap="20px" width="100%">
            {/* 카테고리 배지와 제목 */}
            <Box display="flex" flexDirection="column" gap="6px" width="100%">
              <CustomBadge {...getCategoryBadgeStyle(space.category)} />
              <Text textStyle="ko-display-4" color="common-white" width="100%">
                {space.title}
              </Text>
            </Box>

            {/* 위치 정보 */}
            <Box display="flex" alignItems="center" gap="6px">
              <Text textStyle="ko-body-4" color="common-white">
                {`${space.city}, ${space.country}`}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

export const SmallSpaceCard = ({ space }: Props) => {
  return (
    <Link
      href={ROUTES.SPACE_DETAIL.replace('[spaceId]', space.placeId.toString())}
      style={{
        width: '100%',
      }}
    >
      <Box display="flex" flexDirection="column" gap="12px" width="100%">
        <Box
          position="relative"
          width="100%"
          borderRadius="8px"
          overflow="hidden"
        >
          {space.thumbnail?.url && (
            <Image
              src={space.thumbnail?.url}
              alt={space.title || ''}
              width={0}
              height={0}
              sizes="348px"
              objectFit="cover"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </Box>
        <Box display="flex" flexDirection="column" gap="20px" width="100%">
          <Box display="flex" flexDirection="column" gap="6px">
            <CustomBadge {...getCategoryBadgeStyle(space.category)} />

            <VStack gap={'12px'}>
              <Text textStyle="ko-heading-2" color="grey.10" width="100%">
                {space.title}
              </Text>
              <Text textStyle="ko-body-4" color="grey.9" width="100%">
                {space.subTitle}
              </Text>
            </VStack>
          </Box>
          <Box display="flex" flexDirection="column" gap="6px">
            <Text textStyle="ko-body-6" color="grey.8" letterSpacing="-0.28px">
              {`${space.city}, ${space.country}`}
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
