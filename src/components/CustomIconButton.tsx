import { Button, ButtonProps } from '@chakra-ui/react'

const SIZE_MAP = {
  sm: '32px',
  md: '40px',
  lg: '48px',
}

const BORDER_RADIUS_MAP = {
  sm: '6px',
  md: '8px',
  lg: '10px',
}

interface CustomIconButtonProps extends ButtonProps {
  size?: 'sm' | 'md' | 'lg'
}

export const CustomIconButton = ({
  children,
  size = 'md',
  ...props
}: CustomIconButtonProps) => {
  const currentSize = SIZE_MAP[size]
  const currentBorderRadius = BORDER_RADIUS_MAP[size]

  return (
    <Button
      {...props}
      w={currentSize}
      h={currentSize}
      rounded={currentBorderRadius}
    >
      {children}
    </Button>
  )
}

export const CapsuleIconButton = ({
  children,
  size = 'md',
  ...props
}: CustomIconButtonProps) => {
  const currentSize = SIZE_MAP[size]

  return (
    <Button {...props} w={currentSize} h={currentSize} rounded={'full'}>
      {children}
    </Button>
  )
}
