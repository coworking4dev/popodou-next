import { useMemo } from 'react'

import { HStack } from '@chakra-ui/react'

import { CustomSelect } from '@/components/CustomSelect'

// 2월 , 30일, 31일 경우 처리

interface BirthInputProps {
  value: string
  disabled?: boolean
  onChange: (value: string) => void
}

export const BirthInput = ({
  value = '',
  disabled = false,
  onChange,
}: BirthInputProps) => {
  const [year, month, day] = value.split('-')

  const yearOptions = Array.from({ length: 100 }, (_, index) => ({
    label: (2025 - index).toString(),
    value: (2025 - index).toString(),
  }))

  const monthOptions = Array.from({ length: 12 }, (_, index) => ({
    label: (index + 1).toString().padStart(2, '0'),
    value: (index + 1).toString().padStart(2, '0'),
  }))

  const dayOptions = useMemo(() => {
    let length = 31

    if (month === '02') {
      length = 28
    } else if (
      month === '04' ||
      month === '06' ||
      month === '09' ||
      month === '11'
    ) {
      length = 30
    }

    return Array.from({ length }, (_, index) => ({
      label: (index + 1).toString().padStart(2, '0'),
      value: (index + 1).toString().padStart(2, '0'),
    }))
  }, [month])

  const handleMonthChange = (value: string) => {
    if (value === '02') {
      if (day > '28') {
        onChange(`${year ?? ''}-${value}-28`)
        return
      }
    }

    if (value === '04' || value === '06' || value === '09' || value === '11') {
      if (day > '30') {
        onChange(`${year ?? ''}-${value}-30`)
        return
      }
    }

    onChange(`${year ?? ''}-${value}-${day}`)
  }

  return (
    <HStack w={'100%'} gap={'6px'}>
      <CustomSelect
        size={'lg'}
        placeholder={'Year'}
        disabled={disabled}
        value={year ? [year] : undefined}
        options={yearOptions}
        onValueChange={(value) => {
          onChange(`${value.value[0]}-${month ?? ''}-${day ?? ''}`)
        }}
      />
      <CustomSelect
        placeholder={'Month'}
        size={'lg'}
        disabled={disabled}
        value={month ? [month] : undefined}
        options={monthOptions}
        onValueChange={(value) => handleMonthChange(value.value[0])}
      />
      <CustomSelect
        placeholder={'Day'}
        size={'lg'}
        disabled={disabled}
        options={dayOptions}
        value={day ? [day] : undefined}
        onValueChange={(value) =>
          onChange(`${year ?? ''}-${month ?? ''}-${value.value[0]}`)
        }
      />
    </HStack>
  )
}
