import { useState } from 'react'

import { HStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'

import { BirthInput } from '@/app/signup/_source/component/BirthInput'
import { FormHelper } from '@/components/form-helper'
import { birthDateSchema } from '@/yup/yup-common'

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
        birthDate: birthDateSchema,
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
