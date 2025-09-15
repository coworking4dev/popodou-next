import { Text, VStack } from '@chakra-ui/react'

interface Props {
  title: string
  description?: string
  children: React.ReactNode
}

export const SignupStepFormContent = ({
  title,
  description,
  children,
}: Props) => {
  return (
    <VStack
      w={'100%'}
      p={'36px 32px'}
      pb={'56px'}
      gap={'40px'}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
    >
      <VStack gap={'6px'} alignItems={'flex-start'}>
        <Text textStyle={'ko-heading-1'}>{title}</Text>
        {description && (
          <Text textStyle={'ko-body-6'} color={'grey.7'}>
            {description}
          </Text>
        )}
      </VStack>
      {children}
    </VStack>
  )
}
