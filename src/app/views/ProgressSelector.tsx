import { CustomSelect } from '@/components/CustomSelect'
import { GetPopupListParamsStatusEnumType } from '@/generated/apis/@types/data-contracts'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export const ProgressSelector = ({ value, onChange }: Props) => {
  const options: Record<GetPopupListParamsStatusEnumType, string> = {
    IN_PROGRESS: 'In Progress',
    ENDED: 'Ended',
    UPCOMING: 'Upcoming',
  }

  return (
    <CustomSelect
      clearable={false}
      display={'flex'}
      minW={{ base: '110px', sm: '140px' }}
      options={Object.entries(options).map(([value, label]) => ({
        label,
        value,
      }))}
      textStyle={'ko-body-6'}
      value={value ? [value] : undefined}
      placeholder="In progress"
      onValueChange={(e) => {
        onChange?.(e.value[0] as string)
      }}
    />
  )
}
