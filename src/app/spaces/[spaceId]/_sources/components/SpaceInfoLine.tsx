import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  LinkIcon,
  MapPinIcon,
  ShareNetworkIcon,
} from '@phosphor-icons/react/dist/ssr'

import { getCategoryBadgeStyle } from '@/app/_source/helper/category'
import { CustomBadge } from '@/components/CustomBadge'
import { showToast } from '@/components/ui/toaster'
import { GetPlaceResponseDtoType } from '@/generated/apis/@types/data-contracts'

interface Props {
  space: GetPlaceResponseDtoType
}

export const SpaceInfoLine = ({ space }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Box>
      <VStack gap={{ base: '28px', sm: '32px' }} align="stretch">
        <VStack gap="8px" align="stretch">
          <CustomBadge
            textStyle={'ko-body-3'}
            {...getCategoryBadgeStyle({
              categoryId: space.categoryId,
              categoryName: space.categoryName,
              color: 'GRAY',
            })}
          />

          <Text textStyle="ko-display-4" color="grey.10">
            {space.title}
          </Text>

          <Text textStyle="ko-body-2" color="grey.10">
            {space.subTitle}
          </Text>
        </VStack>

        {/* 위치 정보와 액션 버튼 */}
        <HStack
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
          flexDir={{ base: 'column', md: 'row' }}
          gap={{ base: '28px', sm: '32px', md: '0px' }}
        >
          <HStack gap="8px" align="start">
            <Box width="28px" height="28px">
              <MapPinIcon size={28} />
            </Box>
            <Text textStyle="ko-heading-3" color="grey.10" fontSize={'20px'}>
              {`${space.addressLine},${space.city},${space.country}`}
            </Text>
          </HStack>

          <HStack gap="12px" width={{ base: '100%', md: 'auto' }}>
            <Button
              bg="primary.5"
              color="white"
              size="lg"
              width={{ base: '100%', md: 'auto' }}
              onClick={() => {
                window.open('https://forms.gle/AtBQjPwRqdcG4FLfA', '_blank')
              }}
            >
              Join Inquiry
            </Button>
            <IconButton
              size="lg"
              minWidth="48px"
              minHeight="48px"
              onClick={() => {
                if (
                  isMobile &&
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
              {isMobile ?
                <ShareNetworkIcon size={24} />
              : <LinkIcon size={24} />}
            </IconButton>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  )
}
