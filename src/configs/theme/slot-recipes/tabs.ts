import { defineSlotRecipe } from '@chakra-ui/react'

import { colors } from '@/generated/tokens/colors'
import { textStyles } from '@/generated/tokens/text-styles'

export const tabsSlotRecipe = defineSlotRecipe({
  slots: ['root', 'trigger', 'list', 'content', 'contentGroup', 'indicator'],
  className: 'chakra-tabs',
  base: {
    root: {
      '--tabs-trigger-radius': 'radii.l2',
      position: 'relative',
      _horizontal: {
        display: 'block',
      },
      _vertical: {
        display: 'flex',
      },
    },
    list: {
      display: 'inline-flex',
      position: 'relative',
      isolation: 'isolate',
      '--tabs-indicator-shadow': 'shadows.xs',
      '--tabs-indicator-bg': 'colors.bg',
      minH: 'var(--tabs-height)',
      _horizontal: {
        flexDirection: 'row',
      },
      _vertical: {
        flexDirection: 'column',
      },
    },
    trigger: {
      outline: '0',
      minW: 'var(--tabs-height)',
      height: 'var(--tabs-height)',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'medium',
      position: 'relative',
      cursor: 'button',
      gap: '2',
      _focusVisible: {
        zIndex: 1,
        outline: '2px solid',
        outlineColor: 'colorPalette.focusRing',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    content: {
      focusVisibleRing: 'inside',
      _horizontal: {
        width: '100%',
      },
      _vertical: {
        height: '100%',
      },
    },
    indicator: {
      width: 'var(--width)',
      height: 'var(--height)',
      borderRadius: 'var(--tabs-indicator-radius)',
      bg: 'var(--tabs-indicator-bg)',
      shadow: 'var(--tabs-indicator-shadow)',
      zIndex: -1,
    },
  },
  variants: {
    fitted: {
      true: {
        list: {
          display: 'flex',
        },
        trigger: {
          flex: 1,
          textAlign: 'center',
          justifyContent: 'center',
        },
      },
    },
    justify: {
      start: {
        list: {
          justifyContent: 'flex-start',
        },
      },
      center: {
        list: {
          justifyContent: 'center',
        },
      },
      end: {
        list: {
          justifyContent: 'flex-end',
        },
      },
    },
    size: {
      sm: {
        root: {
          '--tabs-height': '32px',
          '--tabs-content-padding': 'spacing.3',
        },
        trigger: {
          px: '12px',
          gap: '4px',
          ...textStyles['ko-caption-1'].value,
        },
      },
      md: {
        root: {
          '--tabs-height': '40px',
          '--tabs-content-padding': 'spacing.4',
        },
        trigger: {
          px: '16px',
          gap: '6px',
          ...textStyles['ko-body-5'].value,
        },
      },
      lg: {
        root: {
          '--tabs-height': '48px',
          '--tabs-content-padding': 'spacing.4.5',
        },
        trigger: {
          px: '16px',
          gap: '8px',
          ...textStyles['ko-body-1'].value,
        },
      },
    },
    variant: {
      line: {
        list: {
          display: 'flex',
          borderColor: colors['grey.2'].value,
          _horizontal: {
            borderBottomWidth: '1px',
          },
          _vertical: {
            borderEndWidth: '1px',
          },
        },
        trigger: {
          color: colors['grey.3'].value,
          _disabled: {
            _active: {
              bg: 'initial',
            },
          },
          _selected: {
            color: colors['grey.10'].value,
            _horizontal: {
              layerStyle: 'indicator.bottom',
              '--indicator-offset-y': '-1px',
              '--indicator-color': colors['grey.10'].value,
            },
            _vertical: {
              layerStyle: 'indicator.end',
              '--indicator-offset-x': '-1px',
            },
          },
        },
      },

      subtle: {
        list: {
          gap: '4px',
        },
        trigger: {
          borderRadius: '10px',
          ...textStyles['ko-body-6'].value,

          color: colors['grey.7'].value,
          border: '1px solid',

          borderColor: colors['border.basic.1'].value,

          _disabled: {
            border: 'none',
            bg: 'transparent',
          },

          _selected: {
            color: colors['grey.0'].value,
            bg: colors['primary.4'].value,
            borderColor: colors['primary.4'].value,
          },
        },
      },

      enclosed: {
        list: {
          display: 'flex',
          gap: '4px',
          padding: '4px',
          borderRadius: '12px',
          bg: colors['grey.1'].value,
        },

        trigger: {
          borderRadius: '10px',
          ...textStyles['ko-body-5'].value,

          color: colors['grey.7'].value,
          bg: 'transparent',

          _disabled: {
            border: 'none',
            bg: 'transparent',
          },

          _selected: {
            color: colors['grey.0'].value,
            bg: colors['primary.4'].value,
          },
        },
      },

      outline: {
        list: {
          '--line-thickness': '1px',
          '--line-offset': 'calc(var(--line-thickness) * -1)',
          borderColor: 'border',
          display: 'flex',
          _horizontal: {
            _before: {
              content: '""',
              position: 'absolute',
              bottom: '0px',
              width: '100%',
              borderBottomWidth: 'var(--line-thickness)',
              borderBottomColor: 'border',
            },
          },
          _vertical: {
            _before: {
              content: '""',
              position: 'absolute',
              insetInline: 'var(--line-offset)',
              height: 'calc(100% - calc(var(--line-thickness) * 2))',
              borderEndWidth: 'var(--line-thickness)',
              borderEndColor: 'border',
            },
          },
        },
        trigger: {
          color: 'fg.muted',
          borderWidth: '1px',
          borderColor: 'transparent',
          _selected: {
            bg: 'currentBg',
            color: 'colorPalette.fg',
          },
          _horizontal: {
            borderTopRadius: 'var(--tabs-trigger-radius)',
            marginBottom: 'var(--line-offset)',
            marginEnd: {
              _notLast: 'var(--line-offset)',
            },
            _selected: {
              borderColor: 'border',
              borderBottomColor: 'transparent',
            },
          },
          _vertical: {
            borderStartRadius: 'var(--tabs-trigger-radius)',
            marginEnd: 'var(--line-offset)',
            marginBottom: {
              _notLast: 'var(--line-offset)',
            },
            _selected: {
              borderColor: 'border',
              borderEndColor: 'transparent',
            },
          },
        },
      },
      plain: {
        trigger: {
          color: 'fg.muted',
          _selected: {
            color: 'colorPalette.fg',
          },
          borderRadius: 'var(--tabs-trigger-radius)',
          '&[data-selected][data-ssr]': {
            bg: 'var(--tabs-indicator-bg)',
            shadow: 'var(--tabs-indicator-shadow)',
            borderRadius: 'var(--tabs-indicator-radius)',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'line',
  },
})
