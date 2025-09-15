import { CategoryInfoType } from '@/generated/apis/@types/data-contracts'

export const getCategoryBadgeStyle = (category: CategoryInfoType) => {
  let style = {}

  if (category.color === 'RED') {
    style = { bg: 'accent.red1', color: 'accent.red2' }
  }

  if (category.color === 'BLUE') {
    style = {
      bg: 'accent.skyblue1',
      color: 'accent.skyblue2',
    }
  }

  if (category.color === 'LIME') {
    style = {
      bg: 'accent.lime1',
      color: 'accent.lime3',
    }
  }

  if (category.color === 'GRAY') {
    style = {
      bg: 'grey.2',
      color: 'grey.7',
    }
  }

  return {
    label: category.categoryName || 'Etc.',
    bg: 'grey.2',
    color: 'grey.7',
    ...style,
  }
}
