import { defineRecipe } from '@chakra-ui/react'

import { colors } from '@/generated/tokens/colors'
import { textStyles } from '@/generated/tokens/text-styles'

export const inputRecipe = defineRecipe({
  className: 'chakra-input',
  base: {
    width: '100%',
    minWidth: '0',
    outline: '0',
    position: 'relative',
    appearance: 'none',
    textAlign: 'start',
    border: '1px solid',

    _placeholder: {
      color: 'grey.5',
    },

    _readOnly: {
      bg: colors['grey.1'].value,
      pointerEvents: 'none',
    },

    _invalid: {
      borderColor: colors['accent.red2'].value,
    },

    _disabled: {
      layerStyle: 'disabled',
    },

    height: 'var(--input-height)',
    minW: 'var(--input-height)',
  },
  variants: {
    size: {
      sm: {
        '--input-height': '32px',
        borderRadius: '6px',
        ...textStyles['ko-caption-2'].value,
        px: '8px',
      },
      md: {
        '--input-height': '40px',
        px: '10px',
        borderRadius: '8px',
        ...textStyles['ko-caption-1'].value,
      },
      lg: {
        '--input-height': '48px',
        px: '12px',
        borderRadius: '10px',
        ...textStyles['ko-body-6'].value,
        _placeholder: {
          ...textStyles['ko-body-6'].value,
        },
      },
    },
    variant: {
      solid: {
        bg: colors['grey.1'].value,
        borderWidth: '1px solid',
        borderColor: 'transparent',
        ringColor: colors['grey.6'].value,

        _focus: {
          bg: colors['primary.1'].value,
          borderColor: colors['grey.6'].value,
        },

        _invalid: {
          bg: colors['accent.red2'].value,
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: colors['grey.2'].value,
        bg: 'white',

        _focus: {
          borderColor: colors['grey.6'].value,
        },
      },
      flushed: {
        bg: 'transparent !important',
        border: 'none',
        borderBottom: '1px solid',
        borderBottomColor: colors['grey.2'].value,
        borderRadius: '0',
        px: '0',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})
