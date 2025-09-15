import { defineSlotRecipe } from '@chakra-ui/react'

import { colors } from '@/generated/tokens/colors'
import { textStyles } from '@/generated/tokens/text-styles'

export const selectSlotRecipe = defineSlotRecipe({
  className: 'chakra-select',
  slots: [
    'label',
    'positioner',
    'trigger',
    'indicator',
    'clearTrigger',
    'item',
    'itemText',
    'itemIndicator',
    'itemGroup',
    'itemGroupLabel',
    'list',
    'content',
    'root',
    'control',
    'valueText',
    'indicatorGroup',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
      flex: 1,
      minW: 0,
    },
    clearTrigger: {
      pointerEvents: 'auto',
      focusVisibleRing: 'inside',
      focusRingWidth: '2px',
    },

    trigger: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
      borderRadius: '10px',
      userSelect: 'none',
      textAlign: 'start',
      focusVisibleRing: 'inside',
      _placeholderShown: {
        color: colors['grey.5'].value,
      },

      _disabled: {
        layerStyle: 'disabled',
      },
      _invalid: {
        borderColor: colors['accent.red2'].value,
      },
    },
    indicatorGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '1',
      pos: 'absolute',
      right: '12px',
      top: '0',
      bottom: '0',
      pointerEvents: 'none',
    },

    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 0,
      flexShrink: 0,
      _readOnly: {
        display: 'none',
      },
    },
    content: {
      maxH: '200px',
      background: 'bg.panel',
      bg: 'white',
      boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 'popover',
      borderRadius: '10px',
      border: '1px solid',
      borderColor: colors['grey.2'].value,
      outline: 0,
      gap: '8px',
      overflowY: 'auto',
      _open: {
        animationStyle: 'slide-fade-in',
        animationDuration: 'fast',
      },
      _closed: {
        animationStyle: 'slide-fade-out',
        animationDuration: 'fastest',
      },
    },

    item: {
      position: 'relative',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      justifyContent: 'space-between',
      flex: '1',
      textAlign: 'start',
      p: '10px 12px',

      _hover: {
        bg: colors['grey.1'].value,
      },

      _selected: {
        // 이 값 안먹음
        // bg: colors['background.basic.3'].value,
        bg: '#1b1c1d0d',
      },

      _disabled: {
        pointerEvents: 'none',
        opacity: 0.4,
      },
    },
    control: {
      pos: 'relative',
    },
    itemText: {
      flex: '1',
    },
    itemGroup: {
      mb: '0px',
    },
    itemGroupLabel: {
      px: '12px',
      pt: '10px',
      ...textStyles['ko-caption-1'].value,
      color: colors['grey.5'].value,
      mt: '2px',
    },
    label: {
      fontWeight: 'medium',
      userSelect: 'none',
      textStyle: 'sm',
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    valueText: {
      lineClamp: '1',
      maxW: '80%',
    },
  },

  variants: {
    variant: {
      solid: {
        trigger: {
          color: colors['grey.8'].value,
          bg: colors['grey.1'].value,
          borderRadius: '10px',

          _open: {
            bg: colors['primary.1'].value,
            outline: '1px solid',
            outlineColor: colors['primary.4'].value,
          },

          _invalid: {
            border: '1px solid',
            bg: colors['accent.red2'].value,
          },

          _disabled: {
            opacity: 0.64,
            bg: colors['grey.1'].value,
          },

          _expanded: {
            borderColor: colors['primary.4'].value,
          },
        },
      },
      outline: {
        trigger: {
          border: '1px solid',
          borderColor: colors['grey.2'].value,
          bg: colors['grey.0'].value,
          borderRadius: '10px',

          _placeholder: {
            color: colors['grey.5'].value,
          },

          _typed: {
            color: colors['grey.8'].value,
          },

          _open: {
            border: '1px solid',
            borderColor: colors['primary.4'].value,
            bg: colors['grey.0'].value,
          },

          _invalid: {
            border: '1px solid',
            bg: colors['grey.0'].value,
          },

          _disabled: {
            border: '1px solid',
            borderColor: colors['grey.2'].value,
            opacity: 0.64,
            bg: colors['background.basic.2'].value,
          },
        },
      },
      flushed: {
        indicatorGroup: {
          right: 0,
        },
        trigger: {
          borderRadius: '0',
          borderBottom: '1px solid',
          borderBottomColor: colors['grey.2'].value,
          bg: 'transparent',

          px: '0',

          _placeholder: {
            color: colors['grey.5'].value,
          },
          _typed: {
            color: colors['grey.8'].value,
          },

          _open: {
            borderBottom: '1px solid',
            borderBottomColor: colors['primary.4'].value,
          },

          _invalid: {
            borderBottomColor: colors['accent.red2'].value,
          },

          _disabled: {
            borderBottom: '1px solid',
            borderBottomColor: colors['grey.2'].value,
            opacity: 0.64,
          },
        },
      },
    },
    size: {
      sm: {
        trigger: {
          height: '32px',
          padding: '0 8px',
          ...textStyles['ko-caption-2'].value,
        },
        indicator: {
          _icon: {
            width: '4',
            height: '4',
          },
        },
        item: {
          padding: '4px 8px',
          gap: '4px',
          ...textStyles['ko-caption-2'].value,
        },
      },
      md: {
        item: {
          gap: '6px',
          padding: '8px 10px',
          ...textStyles['ko-body-6'].value,
        },

        itemIndicator: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },

        trigger: {
          height: '40px',
          padding: '0 10px',
          ...textStyles['ko-body-6'].value,
        },

        indicator: {
          _icon: {
            width: '4',
            height: '4',
          },
        },
      },
      lg: {
        trigger: {
          height: '48px',
          padding: '0 12px',
          ...textStyles['ko-body-6'].value,
        },

        indicator: {
          _icon: {
            width: '5',
            height: '5',
          },
        },
        item: {
          display: 'flex',
          padding: '10px 12px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '8px',
          ...textStyles['ko-body-6'].value,
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})
