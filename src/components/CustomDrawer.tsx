import { Drawer, Portal } from '@chakra-ui/react'

interface CustomDrawerProps {
  trigger?: React.ReactNode

  header?: React.ReactNode

  body?: React.ReactNode

  footer?: React.ReactNode

  open?: boolean
  onClose?: () => void
}

export const CustomDrawer = ({
  trigger,
  header,
  body,
  footer,
  open,
  onClose,
}: CustomDrawerProps) => {
  return (
    <Drawer.Root open={open} onOpenChange={onClose}>
      {trigger && <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>}
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg={'white'}>
            {header && <Drawer.Header>{header}</Drawer.Header>}
            {body && <Drawer.Body>{body}</Drawer.Body>}
            {footer && <Drawer.Footer>{footer}</Drawer.Footer>}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
