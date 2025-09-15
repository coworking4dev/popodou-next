import { useState } from 'react'

import { HStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import dayjs from 'dayjs'
import { useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'

import { BirthInput } from '@/app/signup/_source/component/BirthInput'
import { FormHelper } from '@/components/form-helper'

import { EditTriggerButton } from './EditTriggerButton'

export const BirthEditInput = ({ birthDate }: { birthDate: string }) => {
  const [editMode, setEditMode] = useState(false)

  const {
    setValue,
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<{
    birthDate: string
  }>({
    resolver: yupResolver(
      yup.object({
        birthDate: yup
          .string()
          .test('is-valid-date', 'Invalid date', (value) => {
            if (!value) return false
            const [year, month, day] = value.split('-').map(Number)

            if (year && month && day) {
              return dayjs(`${year}-${month}-${day}`).isValid()
            }

            return false
          })
          .required('Birth Date is required'),
      }),
    ),
    defaultValues: {
      birthDate,
    },
  })

  const birthDateWatch = useWatch({
    control,
    name: 'birthDate',
  })

  return (
    <FormHelper
      label={'Date of Birth'}
      isRequired
      message={{
        error: errors.birthDate?.message,
      }}
    >
      <HStack
        w={'100%'}
        gap={'6px'}
        flexDirection={{ base: 'column', sm: 'row' }}
        alignItems={{ base: 'end' }}
      >
        <BirthInput
          disabled={!editMode}
          value={birthDateWatch ?? ''}
          onChange={(value) => {
            setValue('birthDate', value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }}
        />
        <EditTriggerButton
          isEditMode={editMode}
          isDirty={isDirty}
          toggleEditMode={setEditMode}
          onSubmit={handleSubmit}
        />
      </HStack>
    </FormHelper>
  )
}
