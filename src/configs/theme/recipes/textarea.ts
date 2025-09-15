import { defineRecipe } from '@chakra-ui/react'

import { textStyles } from '@/generated/tokens/text-styles'

export const textareaRecipe = defineRecipe({
  className: 'chakra-textarea',
  base: {
    width: '100%',
    outline: '0',
    appearance: 'none',
    textAlign: 'start',
    resize: 'none',
    _disabled: {
      opacity: '0.4',
      cursor: 'not-allowed',
    },
    _placeholder: {
      color: 'grey.5',
    },
    _readOnly: {
      _focusVisible: {
        borderColor: 'grey.1',
        cursor: 'default',
      },
      borderColor: 'grey.1',
      cursor: 'default',
    },
    _invalid: {
      borderColor: 'accent.red2',
      _focusVisible: {
        borderColor: 'accent.red2',
      },
    },
  },
  variants: {
    size: {
      sm: {
        borderRadius: '6px',
        p: '4px 8px',
        h: '60px',
        ...textStyles['ko-caption-2'].value,
      },
      md: {
        borderRadius: '8px',
        p: '6px 10px',
        h: '80px',
        ...textStyles['ko-body-6'].value,
      },
      lg: {
        borderRadius: '10px',
        p: '8px 12px',
        h: '80px',
        ...textStyles['ko-body-6'].value,
      },
    },
    variant: {
      outline: {
        bg: 'white',
        borderWidth: '1px',
        borderColor: 'grey.2',
        _focusVisible: {
          borderColor: 'grey.4',
        },
      },
      solid: {
        bg: 'grey.1',
        borderWidth: '1px',
        borderColor: 'transparent',
        _focus: {
          _readOnly: {
            bg: 'grey.1',
          },
          bg: 'accent.blue1',
          borderColor: 'grey.6',
        },
        _invalid: {
          bg: 'accent.red1',
          borderColor: 'accent.red2',
        },
      },
      flushed: {
        bg: 'transparent',
        borderBottomWidth: '1px',
        borderBottomColor: 'grey.2',
        borderRadius: '0',
        p: '0',
        _focusVisible: {
          borderBottomColor: 'grey.4',
        },
        _invalid: {
          borderBottomColor: 'accent.red2',
          _focusVisible: {
            borderBottomColor: 'accent.red2',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})
