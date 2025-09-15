import { defineSlotRecipe } from '@chakra-ui/react'

import { textStyles } from '../text-styles'

export const radioGroupSlotRecipe = defineSlotRecipe({
  className: 'chakra-radio-group',
  slots: [
    'root',
    'label',
    'item',
    'itemText',
    'itemControl',
    'indicator',
    'itemAddon',
    'itemIndicator',
  ],
  base: {
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      fontWeight: 'medium',
      _disabled: {
        cursor: 'disabled',
      },
      ...textStyles['ko-body-5'].value,
      gap: '8px',
    },
    itemControl: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      verticalAlign: 'top',
      border: '1px solid',
      borderColor: 'grey.4',
      borderWidth: '1px',
      borderRadius: 'full',
      cursor: 'radio',
      '&:is([data-state=checked])': {
        bg: 'primary.4',
        borderColor: 'primary.4',
      },
      '& .dot': {
        height: '100%',
        width: '100%',
        borderRadius: 'full',
        bg: 'white',
        scale: '0.4',
      },
      _disabled: {
        '&:not([data-state=checked])': {
          borderColor: 'grey.3',
          bg: 'grey.2',
        },
        opacity: '0.4',
      },
    },
  },
  variants: {
    size: {
      sm: {
        itemControl: {
          boxSize: '16px',
        },
      },
      md: {
        itemControl: {
          boxSize: '20px',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
