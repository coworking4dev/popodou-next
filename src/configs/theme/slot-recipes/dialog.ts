import { defineSlotRecipe } from '@chakra-ui/react'

export const dialogSlotRecipe = defineSlotRecipe({
  slots: [
    'trigger',
    'backdrop',
    'positioner',
    'content',
    'title',
    'description',
    'closeTrigger',
    'header',
    'body',
    'footer',
    'backdrop',
  ],
  className: 'chakra-dialog',
  base: {
    backdrop: {
      bg: 'grey-transparent.400',
      pos: 'fixed',
      left: 0,
      top: 0,
      w: '100vw',
      h: '100dvh',
      zIndex: 'modal',
      _open: {
        animationName: 'fade-in',
        animationDuration: 'slow',
      },
      _closed: {
        animationName: 'fade-out',
        animationDuration: 'moderate',
      },
    },
    positioner: {
      display: 'flex',
      width: '100vw',
      height: '100dvh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 'modal',
      justifyContent: 'center',
      overscrollBehaviorY: 'none',
      alignItems: 'center',
    },
    content: {
      p: '32px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      outline: 0,
      borderRadius: '20px',
      bg: 'white',
      my: 'var(--dialog-margin, var(--dialog-base-margin))',
      '--dialog-z-index': 'zIndex.modal',
      zIndex: 'calc(var(--dialog-z-index) + var(--layer-index, 0))',
      boxShadow:
        '2px 4px 80px 0 rgba(27, 28, 29, 0.04), 1px 2px 10px 0 rgba(27, 28, 29, 0.04)',
      _open: {
        animationDuration: 'moderate',
      },
      _closed: {
        animationDuration: 'faster',
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'stretch',
      gap: '8px',
      p: '16px 20px',
    },
    body: {
      flex: '1',
      p: '20px',
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      gap: '8px',
      p: '20px',
    },
    title: {
      textStyle: 'pre-heading-4',
      color: 'grey.10',
    },
    description: {
      textStyle: 'ko-caption-2',
      color: 'grey.5',
    },
  },
  variants: {
    size: {
      sm: {
        content: {
          maxW: '320px',
        },
      },
      md: {
        content: {
          maxW: '400px',
        },
      },
      lg: {
        content: {
          maxW: '600px',
        },
      },
    },
    motionPreset: {},
  },
  defaultVariants: {
    size: 'md',
  },
})
