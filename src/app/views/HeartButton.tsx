import { HeartIcon } from '@phosphor-icons/react/dist/ssr'
import { PropsOf } from '@toktokhan-dev/react-universal'

import { clientCookie } from '@/stores/cookie/store'

interface Props extends PropsOf<typeof HeartIcon> {
  isLike?: boolean
  onClick: () => void
  size?: number
}

export const HeartIconButton = ({
  isLike,
  onClick,
  size = 24,
  ...props
}: Props) => {
  const isLoggedIn = clientCookie.get('accessToken')

  return (
    <HeartIcon
      size={size}
      cursor={'pointer'}
      weight={isLike ? 'fill' : 'regular'}
      color={isLike ? 'red' : 'grey.3'}
      {...props}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}
    />
  )
}
