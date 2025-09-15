import { defineRecipe } from '@chakra-ui/react'

import { textStyles } from '@/generated/tokens/text-styles'

export const badgeRecipe = defineRecipe({
  className: 'chakra-badge',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    ...textStyles['ko-caption-1'].value,
  },
  variants: {
    variant: {
      solid: {
        color: 'white',
      },
      subtle: {
        color: 'inherit',
      },
    },
    color: {
      primary: {
        bg: 'primary.4',
      },
      grey: {
        bg: 'grey.5',
      },
      green: {
        bg: 'accent.green3',
      },
      yellow: {
        bg: 'accent.yellow3',
      },
      blue: {
        bg: 'accent.blue3',
      },
      red: {
        bg: 'accent.red3',
      },
      pink: {
        bg: 'accent.pink3',
      },
      violet: {
        bg: 'accent.violet3',
      },
    },
    size: {
      sm: {
        height: '24px',
        px: '6px',
        gap: '2px',
      },
      md: {
        height: '28px',
        px: '10px',
        gap: '4px',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'subtle',
      color: 'primary',
      css: {
        bg: 'primary.1',
        color: 'primary.4',
      },
    },
    {
      variant: 'subtle',
      color: 'grey',
      css: {
        bg: 'grey.1',
        color: 'grey.6',
      },
    },
    {
      variant: 'subtle',
      color: 'green',
      css: {
        bg: 'accent.green1',
        color: 'accent.green3',
      },
    },
    {
      variant: 'subtle',
      color: 'yellow',
      css: {
        bg: 'accent.yellow1',
        color: 'accent.yellow4',
      },
    },
    {
      variant: 'subtle',
      color: 'blue',
      css: {
        bg: 'accent.blue1',
        color: 'accent.blue3',
      },
    },
    {
      variant: 'subtle',
      color: 'red',
      css: {
        bg: 'accent.red1',
        color: 'accent.red3',
      },
    },
    {
      variant: 'subtle',
      color: 'pink',
      css: {
        bg: 'accent.pink1',
        color: 'accent.pink3',
      },
    },
    {
      variant: 'subtle',
      color: 'violet',
      css: {
        bg: 'accent.violet1',
        color: 'accent.violet3',
      },
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
})
