import { useState } from 'react'

import { HStack, Input } from '@chakra-ui/react'

import { Controller, useForm } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { InputGroup } from '@/components/ui/input-group'

export const EmailEditInput = ({ email }: { email: string }) => {
  const [editMode, setEditMode] = useState(false)

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<{
    email: string
  }>({
    defaultValues: {
      email,
    },
  })

  console.log(email)

  return (
    <HStack w={'100%'} align={'center'}>
      <FormHelper
        label={'Email Address'}
        isRequired
        message={{
          error: errors.email?.message,
        }}
      >
        <HStack w={'100%'} gap={'6px'}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <InputGroup clearable w={'100%'}>
                <Input
                  {...field}
                  placeholder={'hello@popodou.com'}
                  size={'lg'}
                  disabled={!editMode}
                />
              </InputGroup>
            )}
          />
        </HStack>
      </FormHelper>
    </HStack>
  )
}
