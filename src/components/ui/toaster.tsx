'use client'

import {
  Toaster as ChakraToaster,
  HStack,
  Portal,
  Text,
  Toast,
  createToaster,
} from '@chakra-ui/react'

import {
  CheckCircleFillIcon,
  InfoFillIcon,
  WarningCircleFillIcon,
  XCircleFillIcon,
} from '@/generated/icons/MyIcons'

const TYPE_TO_ICON = {
  success: <CheckCircleFillIcon boxSize={'24px'} />,
  warning: <WarningCircleFillIcon boxSize={'24px'} />,
  error: <XCircleFillIcon boxSize={'24px'} color={'red'} />,
  info: <InfoFillIcon boxSize={'24px'} />,
} as const

const toaster = createToaster({
  placement: 'bottom',
  pauseOnPageIdle: true,
  duration: 2000,
})

interface ToastOptions {
  type?: 'success' | 'warning' | 'error' | 'info'
  description?: string
  action?: { label: string; onClick: () => void }
  closeButton?: boolean
}

export const showToast = ({
  type,
  description,
  action,
  closeButton = true,
}: ToastOptions) => {
  toaster.create({
    type: type || '',
    description,
    action,
    meta: {
      closeButton,
    },
  })
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root
            w={{ base: '100%', sm: 'fit-content' }}
            p={'12px 16px'}
            bg={'grey.transparent.6'}
            borderRadius={'8px'}
            minH={'fit-content'}
            flexDir={{ base: 'column', sm: 'row' }}
            gap={{ base: '0px', sm: '12px' }}
          >
            <HStack
              gap={{ base: '8px', sm: '1' }}
              flex="1"
              maxWidth="100%"
              align={'center'}
              justify={'center'}
            >
              {toast.type &&
                TYPE_TO_ICON[toast.type as keyof typeof TYPE_TO_ICON] &&
                TYPE_TO_ICON[toast.type as keyof typeof TYPE_TO_ICON]}

              {toast.description && (
                <Text
                  htmlTranslate="yes"
                  textStyle={'ko-body-6'}
                  color={'grey.0'}
                  textAlign={{ base: 'start', sm: 'center' }}
                >
                  {toast.description}
                </Text>
              )}
            </HStack>
            {toast.meta?.closeButton && (
              <Text
                as="button"
                w={{ base: '100%', sm: 'auto' }}
                htmlTranslate="yes"
                textStyle={'ko-body-5'}
                color={'grey.0'}
                cursor={'pointer'}
                textAlign={{ base: 'end', sm: 'start' }}
                onClick={() => {
                  toaster.dismiss(toast.id)
                }}
              >
                Close
              </Text>
            )}
            {toast.action && (
              <Text
                as="button"
                w={{ base: '100%', sm: 'auto' }}
                cursor={'pointer'}
                textAlign={'end'}
                htmlTranslate="yes"
                textStyle={'ko-body-5'}
                color={'grey.0'}
                onClick={() => {
                  toast.action?.onClick?.()
                }}
              >
                {toast.action.label}
              </Text>
            )}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
