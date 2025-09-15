import * as React from 'react'

import { Switch as ChakraSwitch } from '@chakra-ui/react'

export interface SwitchProps extends ChakraSwitch.RootProps {
  size?: 'sm' | 'md' | 'lg'
}

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(
  function Switch(props, ref) {
    const { size = 'md', children, ...rest } = props
    return (
      <ChakraSwitch.Root ref={ref} size={size} {...rest}>
        <ChakraSwitch.HiddenInput />
        <ChakraSwitch.Control />
        {/* <ChakraSwitch.Thumb /> */}
        {children != null && (
          <ChakraSwitch.Label>{children}</ChakraSwitch.Label>
        )}
      </ChakraSwitch.Root>
    )
  },
)
