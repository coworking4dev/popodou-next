import {
  Drawer,
  DrawerRootProps,
  Portal,
  SystemStyleObject,
} from '@chakra-ui/react'

interface DrawerBasisProps extends Omit<DrawerRootProps, 'children'> {
  trigger?: React.ReactNode
  content?: React.ReactNode
  title?: string
  footer?: React.ReactNode
  styles?: {
    content?: SystemStyleObject
    header?: SystemStyleObject
    body?: SystemStyleObject
    footer?: SystemStyleObject
  }
}
export const DrawerBasis = ({
  trigger,
  content,
  title,
  footer,
  styles,
  ...props
}: DrawerBasisProps) => {
  return (
    <Drawer.Root {...props}>
      {trigger && <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>}
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="background.basic.1" {...styles?.content}>
            {title && (
              <Drawer.Header>
                <Drawer.Title>{title}</Drawer.Title>
              </Drawer.Header>
            )}

            {content && <Drawer.Body {...styles?.body}>{content}</Drawer.Body>}

            {footer && (
              <Drawer.Footer {...styles?.footer}>{footer}</Drawer.Footer>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
