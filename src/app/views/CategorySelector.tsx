import { useMemo } from 'react'

import { CustomSelect } from '@/components/CustomSelect'
import { useGetCategoriesQuery } from '@/generated/apis/CategoryApi/CategoryApi.query'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export const CategorySelector = ({ value, onChange }: Props) => {
  const { data } = useGetCategoriesQuery()

  const options = useMemo(() => {
    const categories =
      data?.data?.map((v) => {
        return {
          label: v.categoryName || '',
          value: v.categoryId?.toString() || '',
        }
      }) || []

    categories.unshift({
      label: 'All',
      value: '',
    })

    return categories
  }, [data])

  return (
    <CustomSelect
      clearable={false}
      display={'flex'}
      minW={{ base: '100px', sm: '140px' }}
      options={options}
      textStyle={'ko-body-6'}
      placeholder="All"
      onValueChange={(e) => {
        onChange?.(e.value[0] as string)
      }}
      value={value ? [value] : undefined}
    />
  )
}
