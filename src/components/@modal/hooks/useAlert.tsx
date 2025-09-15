import { PropsWithChildren, useCallback } from 'react'

import { ButtonProps } from '@chakra-ui/react'

import { overlay } from 'overlay-kit'

import { Alert } from '../alert'

export interface AlertProps extends PropsWithChildren {
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  confirmColor?: ButtonProps['bg']
  loading?: boolean

  onConfirm?: () => Promise<void>
  onCancel?: () => void
}

export const useAlert = () => {
  const openAlert = useCallback((props: AlertProps) => {
    overlay.open(({ close, isOpen }) => (
      <Alert {...props} close={close} isOpen={isOpen} width="320px" />
    ))
  }, [])

  return {
    openAlert,
  }
}

export type BaseModalProps<T = unknown> = T & {
  width?: string
  height?: string
  isOpen: boolean
  close: () => void
}
