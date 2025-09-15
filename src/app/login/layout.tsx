import { Center } from '@chakra-ui/react'

import { PageLayout } from '@/components/@layout/page-layout'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageLayout hideFooter>
      <Center w={'100%'} h={'100%'} display={'flex'} flex={1}>
        {children}
      </Center>
    </PageLayout>
  )
}
