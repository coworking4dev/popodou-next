import {
  GetPopupListParamsStatusEnumType,
  LoungeFeedDtoType,
} from '@/generated/apis/@types/data-contracts'

export const getFeedItemBadgeStyle = (type: LoungeFeedDtoType['type']) => {
  if (type === 'LOUNGE')
    return {
      color: 'primary.4',
      bg: 'primary.1',
      label: 'Lounge',
    }

  if (type === 'MAGAZINE_COMMENT')
    return {
      color: 'accent.lime3',
      bg: 'accent.lime1',
      label: 'Journal',
    }

  if (type === 'POPUP_COMMENT')
    return {
      color: 'accent.pink2',
      bg: 'accent.pink1',
      label: 'Pop-ups',
    }

  return {
    color: 'grey.600',
    bg: 'grey.100',
    label: 'Other',
  }
}

export const getStatusBadgeStyle = (
  status: GetPopupListParamsStatusEnumType,
) => {
  switch (status) {
    case 'IN_PROGRESS':
      return {
        label: 'In Progress',
        bg: 'primary.2',
        color: 'primary.5',
      }
    case 'UPCOMING':
      return {
        label: 'Upcoming',
        bg: 'primary.2',
        color: 'primary.5',
      }
    case 'ENDED':
      return {
        label: 'Ended',
        bg: 'primary.2',
        color: 'primary.5',
      }
    default:
      return {
        label: 'In Progress',
        bg: 'primary.2',
        color: 'primary.5',
      }
  }
}
