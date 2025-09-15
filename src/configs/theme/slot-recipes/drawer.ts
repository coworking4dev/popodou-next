import { defineSlotRecipe } from '@chakra-ui/react'

export const drawerSlotRecipe = defineSlotRecipe({
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
  className: 'chakra-drawer',
  base: {
    backdrop: {
      bg: 'grey-transparent.400',
      pos: 'fixed',
      insetInlineStart: 0,
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
      insetInlineStart: 0,
      top: 0,
      zIndex: 'modal',
      overscrollBehaviorY: 'none',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '560px',
      p: '40px 48px',
      outline: 0,
      zIndex: 'modal',
      maxH: '100dvh',
      color: 'inherit',

      _open: {
        animationDuration: 'slowest',
        animationTimingFunction: 'ease-in-smooth',
      },
      _closed: {
        animationDuration: 'slower',
        animationTimingFunction: 'ease-in-smooth',
      },
    },
    header: {
      flex: 0,
      p: '0px',
    },
    body: {
      p: '0px',
      flex: '1',
      overflow: 'auto',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '3',
      p: '0px',
    },
    title: {
      textStyle: 'lg',
      fontWeight: 'semibold',
    },
    description: {
      color: 'fg.muted',
    },
  },
  variants: {
    size: {},
    placement: {
      start: {
        positioner: {
          justifyContent: 'flex-start',
        },
        content: {
          _open: {
            animationName: {
              base: 'slide-from-left-full, fade-in',
              _rtl: 'slide-from-right-full, fade-in',
            },
          },
          _closed: {
            animationName: {
              base: 'slide-to-left-full, fade-out',
              _rtl: 'slide-to-right-full, fade-out',
            },
          },
        },
      },
      end: {
        positioner: {
          justifyContent: 'flex-end',
        },
        content: {
          _open: {
            animationName: {
              base: 'slide-from-right-full, fade-in',
              _rtl: 'slide-from-left-full, fade-in',
            },
          },
          _closed: {
            animationName: {
              base: 'slide-to-right-full, fade-out',
              _rtl: 'slide-to-right-full, fade-out',
            },
          },
        },
      },
      top: {
        positioner: {
          alignItems: 'flex-start',
        },
        content: {
          _open: {
            animationName: 'slide-from-top-full, fade-in',
          },
          _closed: {
            animationName: 'slide-to-top-full, fade-out',
          },
        },
      },
      bottom: {
        positioner: {
          alignItems: 'flex-end',
        },
        content: {
          _open: {
            animationName: 'slide-from-bottom-full, fade-in',
          },
          _closed: {
            animationName: 'slide-to-bottom-full, fade-out',
          },
        },
      },
    },
    contained: {
      true: {
        positioner: {
          padding: '4',
        },
        content: {
          borderRadius: 'l3',
        },
      },
    },
  },
  defaultVariants: {
    placement: 'end',
  },
})
