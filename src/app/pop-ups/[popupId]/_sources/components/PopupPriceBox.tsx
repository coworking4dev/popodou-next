import { Box, Button, Text, VStack } from '@chakra-ui/react'

import { euroFormat } from '@/app/_source/utils/price'
import { usePopupModals } from '@/components/@modal/popup/usePopupModals'
import { GetPopupResponseDtoType } from '@/generated/apis/@types/data-contracts'

interface Props {
  popup?: GetPopupResponseDtoType
}

export const PopupPriceBox = ({ popup }: Props) => {
  const priceRange = (popup?.optionsList || [])?.reduce<[number, number]>(
    (acc, curr) => {
      if (curr.price) {
        return [Math.min(acc[0], curr.price), Math.max(acc[1], curr.price)]
      }
      return acc
    },
    [0, 0],
  )

  const priceText = (() => {
    if (priceRange[0] === priceRange[1]) {
      if (priceRange[0] === 0) {
        return 'Free'
      }

      return euroFormat(priceRange[0])
    }

    return `${euroFormat(priceRange[0])} ~ ${euroFormat(12000)}`
  })()

  const { openProgramSelectionModal } = usePopupModals()
  return (
    <Box
      p={{ md: '20px', sm: '16px 20px', base: '16px' }}
      bg={'secondary.2'}
      borderRadius={'8px'}
      minW={{ base: '100%', md: '355px' }}
      w={{ base: '100%', md: '355px' }}
    >
      <VStack gap={'20px'} align={'start'}>
        <VStack align={'start'} gap={'4px'}>
          <Text textStyle={'ko-heading-5'}>Price</Text>
          <Text textStyle={'ko-heading-1'}>{priceText}</Text>
        </VStack>
        <Button
          width={'100%'}
          size={'lg'}
          onClick={() => {
            if (!popup?.optionsList || popup?.optionsList.length === 0) {
              window.open(popup?.reservationFormUrl, '_blank')
            } else {
              openProgramSelectionModal(popup?.optionsList || [], () => {
                window.open(popup?.reservationFormUrl, '_blank')
              })
            }
          }}
        >
          Book Now
        </Button>
      </VStack>
    </Box>
  )
}
