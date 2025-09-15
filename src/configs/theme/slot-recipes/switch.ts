import { defineSlotRecipe } from '@chakra-ui/react'

export const switchSlotRecipe = defineSlotRecipe({
  slots: ['root', 'label', 'control', 'thumb', 'indicator'],
  className: 'chakra-switch',
  base: {
    root: {
      display: 'inline-flex',
      gap: '2.5',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
    },
    label: {
      lineHeight: '1',
      userSelect: 'none',
      fontSize: 'sm',
      fontWeight: 'medium',
      _disabled: {
        opacity: '0.5',
      },
    },
    control: {
      display: 'inline-flex',
      gap: '0.5rem',
      flexShrink: 0,
      justifyContent: 'flex-start',
      cursor: 'switch',
      borderRadius: 'full',
      position: 'relative',
      bg: 'grey.3',
      _disabled: {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
      _invalid: {
        outline: '2px solid',
        outlineColor: 'border.error',
        outlineOffset: '2px',
      },
      _checked: {
        bg: 'primary.4',
      },
      focusVisibleRing: 'outside',
    },
    thumb: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transitionProperty: 'translate',
      transitionDuration: 'fast',
      borderRadius: 'full',
      bg: 'white',
      boxShadow: 'sm',
      _checked: {
        translate: '100%',
      },
    },
    indicator: {
      position: 'absolute',
      fontSize: 'var(--switch-indicator-font-size)',
      fontWeight: 'medium',
      flexShrink: 0,
      userSelect: 'none',
      display: 'grid',
      placeContent: 'center',
      transition: 'inset-inline-start 0.12s ease',
      insetInlineStart: 'calc(var(--switch-x) - 2px)',
      _checked: {
        insetInlineStart: '2px',
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          w: '42px',
          h: '24px',
        },
        control: {
          w: '100%',
          h: '100%',
          p: '3px',
        },
        thumb: {
          w: '18px',
          h: '18px',
        },
      },
      md: {
        root: {
          w: '56px',
          h: '32px',
        },
        control: {
          w: '100%',
          h: '100%',
          p: '4px',
        },
        thumb: {
          w: '24px',
          h: '24px',
        },
      },
      lg: {
        root: {
          w: '72px',
          h: '40px',
        },
        control: {
          w: '100%',
          h: '100%',
          p: '5px',
        },
        thumb: {
          w: '30px',
          h: '30px',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
