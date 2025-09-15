import { useEffect, useState } from 'react'

import { HStack, Input } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FormHelper } from '@/components/form-helper'

import { EditTriggerButton } from './EditTriggerButton'

export const NicknameEditInput = ({ nickname }: { nickname: string }) => {
  const [editMode, setEditMode] = useState(false)

  const {
    control,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<{
    nickname: string
  }>({
    resolver: yupResolver(
      yup.object({
        nickname: yup
          .string()
          .trim()
          .max(20, 'Nickname must be less than 20 characters')
          .required('Nickname is required'),
      }),
    ),
  })

  useEffect(() => {
    reset({
      nickname,
    })
  }, [nickname])

  return (
    <HStack w={'100%'} align={'center'}>
      <FormHelper
        label={'Nickname'}
        isRequired
        message={{
          error: errors.nickname?.message,
        }}
      >
        <HStack w={'100%'} gap={'6px'}>
          <Controller
            control={control}
            name="nickname"
            render={({ field }) => (
              <Input
                placeholder={'Enter your nickname'}
                size={'lg'}
                {...field}
                disabled={!editMode}
              />
            )}
          />
          <EditTriggerButton
            isEditMode={editMode}
            isDirty={isDirty}
            toggleEditMode={setEditMode}
            onSubmit={handleSubmit}
          />
        </HStack>
      </FormHelper>
    </HStack>
  )
}
