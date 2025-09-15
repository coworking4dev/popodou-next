import { Center } from '@chakra-ui/react'

import { LoginBox } from './_source/LoginBox'

export default function LoginPage() {
  return (
    <Center
      w={'100%'}
      h={'100%'}
      display={'flex'}
      flex={1}
      px={{ base: '16px', sm: '0px' }}
      py={{ base: '20px 80px', sm: '0px' }}
      alignItems={{ base: 'start', sm: 'center' }}
      overflowY={'hidden'}
    >
      <LoginBox />
    </Center>
  )
}
