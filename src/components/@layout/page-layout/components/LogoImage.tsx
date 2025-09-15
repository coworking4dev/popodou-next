import Link from 'next/link'

import { Image } from '@chakra-ui/react'

import { ROUTES } from '@/constants/routes'

export const LogoLinkButton = () => {
  return (
    <Link href={ROUTES.MAIN}>
      <Image src={'/images/Logo.svg'} alt={'popodou'} />
    </Link>
  )
}
