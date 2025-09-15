import { Text, VStack } from '@chakra-ui/react'

interface Props {
  title: string
  children: React.ReactNode
}

export const SignupStepFormContent = ({ title, children }: Props) => {
  return (
    <VStack
      w={'100%'}
      p={'36px 32px'}
      pb={'56px'}
      px={{ base: '16px', sm: '32px' }}
      pt={{ base: '28px', sm: '36px' }}
      gap={'40px'}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
    >
      <Text textStyle={'ko-heading-1'}>{title}</Text>
      {children}
    </VStack>
  )
}
