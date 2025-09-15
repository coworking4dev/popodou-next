import { Center, Dialog, HStack, Text } from '@chakra-ui/react'

import { Button } from '@/components/ui/button'

import { AlertProps, BaseModalProps } from './hooks/useAlert'

export const Alert = ({
  width,
  height,
  isOpen,
  title,
  description,
  loading,
  confirmLabel = '확인',
  cancelLabel = '취소',
  confirmColor,
  onConfirm,
  onCancel,
  close,
}: BaseModalProps<AlertProps>) => {
  console.log(confirmColor)
  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          p={'32px 24px 24px'}
          borderRadius={'20px'}
          bg="background.basic.1"
          w={width}
          h={height}
        >
          <Dialog.Body p={'0px'}>
            <Center flexDirection={'column'} gap={'8px'}>
              <Text
                textStyle={'ko-heading-4'}
                color={'grey.10'}
                textAlign={'center'}
              >
                {title}
              </Text>
              <Text
                color={'grey.7'}
                textStyle={'ko-body-6'}
                whiteSpace={'pre-line'}
                textAlign={'center'}
              >
                {description}
              </Text>
            </Center>
            <HStack w={'100%'} gap={'12px'} mt={'24px'}>
              <Button
                w={'100%'}
                key={cancelLabel}
                size={'lg'}
                onClick={() => {
                  onCancel?.()
                  close()
                }}
                color={'grey.8'}
                variant={'solid-grey'}
              >
                {cancelLabel}
              </Button>
              <Button
                w={'100%'}
                variant={'solid-primary'}
                key={confirmLabel}
                size={'lg'}
                onClick={async () => {
                  await onConfirm?.()
                  close()
                }}
                bg={confirmColor}
                textStyle={'ko-body-5'}
                loading={loading}
              >
                {confirmLabel}
              </Button>
            </HStack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
