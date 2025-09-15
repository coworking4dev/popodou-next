import { defineRecipe } from '@chakra-ui/react'

import { textStyles } from '@/generated/tokens/text-styles'

export const buttonRecipe = defineRecipe({
  className: 'chakra-button',
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    _disabled: {
      cursor: 'disabled',
    },
  },

  variants: {
    size: {
      lg: {
        h: '48px',
        borderRadius: '10px',
        px: '24px',
        gap: '8px',
        ...textStyles['eng-body-5'].value,
      },
      md: {
        h: '40px',
        borderRadius: '8px',
        px: '16px',
        gap: '6px',
        ...textStyles['eng-body-5'].value,
      },
      sm: {
        h: '32px',
        borderRadius: '8px',
        px: '12px',
        gap: '4px',
        ...textStyles['eng-caption-2'].value,
      },
      'capsule-lg': {
        h: '48px',
        borderRadius: 'full',
        px: '28px',
        gap: '8px',
        ...textStyles['eng-body-5'].value,
      },
      'capsule-md': {
        h: '40px',
        borderRadius: 'full',
        px: '20px',
        gap: '6px',
        ...textStyles['eng-body-5'].value,
      },
      'capsule-sm': {
        h: '32px',
        borderRadius: 'full',
        px: '16px',
        gap: '4px',
        ...textStyles['eng-body-5'].value,
      },
    },
    variant: {
      'solid-primary': {
        bg: 'primary.5',
        color: 'grey.0',
        _hover: {
          bg: 'primary.5',
        },
        _pressed: {
          bg: 'primary.5',
        },
        _disabled: {
          opacity: 0.4,
        },
      },
      'solid-grey': {
        bg: 'grey.2',
        _hover: {
          bg: 'grey.3',
        },
        _pressed: {
          bg: 'grey.3',
        },
        _disabled: {
          opacity: 0.4,
        },
      },
      'solid-red': {
        bg: 'accent.red3',
        _hover: {
          bg: 'accent.red4',
        },
        _pressed: {
          bg: 'accent.red4',
        },
        _disabled: {
          opacity: 0.4,
        },
      },
      'outline-primary': {
        border: '1px solid',
        borderColor: 'primary.5',
        color: 'primary.5',
        bg: 'grey.0',
        _hover: {
          bg: 'primary.1',
        },
        _pressed: {
          bg: 'primary.1',
        },
        _disabled: {
          opacity: 0.4,
        },
      },
      'outline-grey': {
        border: '1px solid',
        borderColor: 'grey.2',
        color: 'grey.8',
        bg: 'grey.0',
        _hover: {
          bg: 'grey.1',
        },
        _pressed: {
          bg: 'grey.1',
        },
        _disabled: {
          opacity: 0.4,
        },
      },
      'outline-red': {
        border: '1px solid',
        borderColor: 'accent.red2',
        color: 'accent.red2',
        bg: 'grey.0',
        _hover: {
          bg: 'accent.red1',
        },
        _pressed: {
          bg: 'accent.red1',
        },
        _disabled: {
          opacity: 0.4,
        },
      },
      'ghost-primary': {
        color: 'primary.5',
        _hover: {
          bg: 'grey-transparent.100',
        },
        _pressed: {
          bg: 'grey-transparent.100',
        },
        _disabled: {
          opacity: 0.4,
        },
      },
      'ghost-grey': {
        color: 'grey.8',
        _hover: {
          bg: 'grey-transparent.100',
        },
        _pressed: {
          bg: 'grey-transparent.100',
        },
        _disabled: {
          opacity: 0.4,
        },
      },
      'ghost-red': {
        color: 'accent.red3',
        _hover: {
          bg: 'grey-transparent.100',
        },
        _pressed: {
          bg: 'grey-transparent.100',
        },
        _disabled: {
          opacity: 0.4,
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid-primary',
  },
})
