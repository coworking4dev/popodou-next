import { ReactNode } from 'react'

import { Button, Dialog, HStack, Portal, VStack } from '@chakra-ui/react'

interface CustomDialogProps {
  title?: string
  description?: string
  body?: ReactNode
  footer?: ReactNode
  trigger?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  action: {
    label: string
    onClick: () => void
    disabled?: boolean
    loading?: boolean
  }
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onCancel?: () => void
}

export const CustomDialog = ({
  title,
  description,
  body,
  footer,
  trigger,
  size = 'md',
  action,
  onCancel,
  open,
  onOpenChange,
}: CustomDialogProps) => {
  return (
    <Dialog.Root
      size={size}
      open={open}
      onOpenChange={onOpenChange ? ({ open }) => onOpenChange(open) : undefined}
    >
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {(title || description) && (
              <Dialog.Header>
                {title && <Dialog.Title>{title}</Dialog.Title>}
                {description && (
                  <Dialog.Description
                    whiteSpace={'pre-line'}
                    textAlign={'center'}
                  >
                    {description}
                  </Dialog.Description>
                )}
              </Dialog.Header>
            )}
            {body && <Dialog.Body>{body}</Dialog.Body>}
            <Dialog.Footer>
              <VStack w={'100%'} gap={'16px'}>
                {footer}
                <HStack w={'100%'}>
                  {(trigger || onCancel) && (
                    <Dialog.CloseTrigger asChild>
                      <Button
                        w={'100%'}
                        variant={'outline-grey'}
                        size={'lg'}
                        onClick={onCancel}
                      >
                        취소
                      </Button>
                    </Dialog.CloseTrigger>
                  )}
                  <Button
                    w={'100%'}
                    variant={'solid-primary'}
                    size={'lg'}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    loading={action.loading}
                  >
                    {action.label}
                  </Button>
                </HStack>
              </VStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
