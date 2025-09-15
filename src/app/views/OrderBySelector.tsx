import { CustomSelect } from '@/components/CustomSelect'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export const OrderBySelector = ({ value, onChange }: Props) => {
  const options = [
    {
      label: 'Recently',
      value: 'RECENTLY',
    },
    {
      label: 'Most Like',
      value: 'MOST_LIKE',
    },
  ]

  return (
    <CustomSelect
      clearable={false}
      minW={{ base: '100px', sm: '140px' }}
      display={'flex'}
      options={options}
      placeholder="Recently"
      onValueChange={(e) => {
        onChange?.(e.value[0] as string)
      }}
      value={value ? [value] : undefined}
    />
  )
}
