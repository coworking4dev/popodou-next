import { useEffect, useState } from 'react'

import { HStack, Input } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FormHelper } from '@/components/form-helper'

import { EditTriggerButton } from './EditTriggerButton'

export const NameEditInput = ({
  firstName,
  lastName,
}: {
  firstName: string
  lastName: string
}) => {
  const [editMode, setEditMode] = useState(false)

  const {
    control,
    reset,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<{
    firstName: string
    lastName: string
  }>({
    resolver: yupResolver(
      yup.object({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
      }),
    ),
    defaultValues: {
      firstName,
      lastName,
    },
  })

  useEffect(() => {
    reset({
      firstName,
      lastName,
    })
  }, [firstName, lastName])

  return (
    <HStack w={'100%'} align={'center'}>
      <FormHelper
        label={'Name'}
        isRequired
        message={{
          error:
            errors.firstName?.message || (errors.lastName?.message as string),
        }}
      >
        <HStack
          w={'100%'}
          gap={'6px'}
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems={{ base: 'end' }}
        >
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <Input
                placeholder={'First Name'}
                size={'lg'}
                {...field}
                disabled={!editMode}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <Input
                placeholder={'Last Name'}
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
