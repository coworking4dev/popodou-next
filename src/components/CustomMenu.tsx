import type { SystemStyleObject } from '@chakra-ui/react'
import { Menu, Portal, Text, chakra } from '@chakra-ui/react'

interface CustomMenuProps {
  trigger: React.ReactNode
  title?: string
  items: {
    label: string
    value: string
    onClick: () => void
    style?: SystemStyleObject
  }[]
  styles?: {
    content?: SystemStyleObject
    trigger?: SystemStyleObject
    item?: SystemStyleObject
  }
}

export const CustomMenu = ({
  trigger,
  title,
  items,
  styles,
}: CustomMenuProps) => {
  const StyledContent = chakra(Menu.Content)
  const StyledItem = chakra(Menu.Item)
  return (
    <Menu.Root>
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <StyledContent {...(styles?.content ?? {})}>
            {title && (
              <Text
                w={'100%'}
                textStyle={'pre-caption-1'}
                textAlign={'left'}
                color={'grey.5'}
                p={'10px 12px 2px 12px'}
              >
                {title}
              </Text>
            )}
            {items.map((item) => (
              <StyledItem
                key={item.value}
                value={item.value}
                onClick={item.onClick}
                {...(styles?.item ?? {})}
                {...(item.style ?? {})}
              >
                {item.label}
              </StyledItem>
            ))}
          </StyledContent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
