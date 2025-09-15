import { Container } from '@chakra-ui/react'

import { MagazineList } from './_source/components/MagazineList'

export default function MagazinePage() {
  return (
    <Container
      maxW={'1440px'}
      height={'100%'}
      flex={1}
      display={'flex'}
      flexDirection={'column'}
    >
      <MagazineList />
    </Container>
  )
}
