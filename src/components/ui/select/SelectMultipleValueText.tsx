import { Box, Select as ChakraSelect, HStack } from '@chakra-ui/react'
import { useSelectContext } from '@chakra-ui/react'

import { XIcon } from '@/generated/icons/MyIcons'

const ChipItem = ({
  item,
}: {
  item: { value: string; label: string } | undefined
}) => {
  const { value, setValue } = useSelectContext()

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation()
        setValue(value.filter((v) => v !== item?.value))
      }}
      display="flex"
      gap="4px"
      alignItems="center"
      px="6px"
      py="2px"
      borderRadius="6px"
      bg="grey.2"
      textStyle={'ko-caption-1'}
    >
      {item?.label}
      <XIcon boxSize="12px" fontWeight={'bold'} />
    </Box>
  )
}

export const SelectMultipleValueText = () => {
  const { value, collection } = useSelectContext()
  if (value.length === 0) {
    return <ChakraSelect.ValueText placeholder="Select framework" />
  }

  return (
    <ChakraSelect.ValueText>
      <HStack>
        {value.map((v) => {
          const item = collection.items.find((item) => item.value === v)
          return <ChipItem item={item} key={v} />
        })}
      </HStack>
    </ChakraSelect.ValueText>
  )
}
