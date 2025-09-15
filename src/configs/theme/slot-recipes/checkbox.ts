import { defineSlotRecipe } from '@chakra-ui/react'

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: ['root', 'label', 'control', 'indicator', 'group'],
  className: 'chakra-checkbox',
  base: {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '6px',
    },
    control: {
      border: '1.5px solid',
      borderColor: 'grey.3',
      color: 'grey.3',
      borderRadius: '3px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      '&:is([data-state=checked], [data-state=indeterminate])': {
        bg: 'primary.4',
        color: 'white',
        borderColor: 'primary.4',
      },
      _disabled: {
        opacity: '0.4',
      },
    },
    label: {},
  },
  variants: {
    size: {
      sm: {
        control: {
          boxSize: '16px',
          '& > svg': {
            w: '10px',
            h: '10px',
          },
        },
      },
      md: {
        control: {
          boxSize: '20px',
          '& > svg': {
            w: '12px',
            h: '12px',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
