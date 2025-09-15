import { HStack, Separator, Text } from '@chakra-ui/react'

interface Props {
  label: string
  separatorColor?: string

  children?: React.ReactNode
}

export const SeperatorLabel = ({
  label,
  children,
  separatorColor = 'border.basic.1',
}: Props) => {
  return (
    <HStack w={'100%'}>
      <Separator flex="1" color={separatorColor} borderColor={separatorColor} />
      {children ?
        children
      : <Text textStyle={'pre-body-7'} color={'grey.7'}>
          {label}
        </Text>
      }
      <Separator flex="1" color={separatorColor} borderColor={separatorColor} />
    </HStack>
  )
}
