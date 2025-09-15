import { Center } from '@chakra-ui/react'

import { PageLayout } from '@/components/@layout/page-layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      <Center w={'100%'} h={'100%'} display={'flex'} flex={1} pb={'120px'}>
        {children}
      </Center>
    </PageLayout>
  )
}
