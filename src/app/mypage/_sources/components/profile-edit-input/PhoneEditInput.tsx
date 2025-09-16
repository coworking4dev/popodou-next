import { useEffect, useState } from 'react'

import { Box, HStack, Input, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'

import { getCountryPhoneCodeOptions } from '@/app/_source/helper/options'
import { CustomSelect } from '@/components/CustomSelect'
import { FormHelper } from '@/components/form-helper'
import { phoneNumberSchema } from '@/yup/yup-common'

import { EditTriggerButton } from './EditTriggerButton'

const countryPhoneCodeOptions = getCountryPhoneCodeOptions()

export const PhoneEditInput = ({
  defaultPhoneCountryCode,
  defaultPhoneNumber,
}: {
  defaultPhoneCountryCode: string
  defaultPhoneNumber: string
}) => {
  const [editMode, setEditMode] = useState(false)
  const [isCustomPhoneCode, setIsCustomPhoneCode] = useState(false)

  const {
    control,
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<{
    phoneNumber: string
    phoneCountryCode: string
  }>({
    defaultValues: {
      phoneNumber: defaultPhoneNumber,
      phoneCountryCode: defaultPhoneCountryCode,
    },
    resolver: yupResolver(
      yup.object({
        phoneCountryCode: yup
          .string()
          .required('Phone Country Code is required'),
        phoneNumber: phoneNumberSchema,
      }),
    ),
  })

  useEffect(() => {
    reset({
      phoneNumber: defaultPhoneNumber,
      phoneCountryCode: defaultPhoneCountryCode,
    })
  }, [defaultPhoneNumber, defaultPhoneCountryCode])

  useEffect(() => {
    const isCustomPhoneCode = !countryPhoneCodeOptions.some(
      (option) => option.value === defaultPhoneCountryCode,
    )

    setIsCustomPhoneCode(isCustomPhoneCode)
  }, [defaultPhoneCountryCode])

  const phoneCountryCode = useWatch({ control, name: 'phoneCountryCode' })

  return (
    <FormHelper
      label={'Phone'}
      isRequired
      message={{
        error: errors.phoneCountryCode?.message || errors.phoneNumber?.message,
      }}
    >
      <VStack gap={'6px'} w={'100%'} align={{ base: 'end', sm: 'start' }}>
        <HStack
          w={'100%'}
          gap={'6px'}
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems={{ base: 'end' }}
        >
          <CustomSelect
            options={countryPhoneCodeOptions}
            placeholder={'code (+82)'}
            size={'lg'}
            disabled={!editMode}
            value={
              phoneCountryCode && phoneCountryCode !== '' ?
                [isCustomPhoneCode ? 'others' : phoneCountryCode]
              : undefined
            }
            onValueChange={(value) => {
              setIsCustomPhoneCode(value.value[0] === 'others')

              setValue(
                'phoneCountryCode',
                value.value[0] === 'others' ? '' : value.value[0],
                {
                  shouldValidate: true,
                  shouldDirty: true,
                },
              )
            }}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <Input
                flex={{ base: 'auto', sm: 2 }}
                placeholder={'Enter your phone number without hyphens'}
                size={'lg'}
                {...field}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, '')
                  e.target.value = numericValue
                  field.onChange({
                    target: {
                      value: numericValue,
                    },
                  })
                }}
                inputMode="numeric"
                pattern="[0-9]*"
                disabled={!editMode}
              />
            )}
          />
          <Box display={{ base: 'none', sm: 'block' }}>
            <EditTriggerButton
              isEditMode={editMode}
              isDirty={isDirty}
              toggleEditMode={setEditMode}
              onSubmit={handleSubmit}
            />
          </Box>
        </HStack>
        {isCustomPhoneCode && (
          <Input
            inputMode="numeric"
            size={'lg'}
            disabled={!editMode}
            pattern="[0-9]*"
            placeholder={'Enter a number only.'}
            {...register('phoneCountryCode')}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, '')
              e.target.value = numericValue
              setValue('phoneCountryCode', numericValue, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
          />
        )}

        <Box display={{ base: 'block', sm: 'none' }}>
          <EditTriggerButton
            isEditMode={editMode}
            isDirty={isDirty}
            toggleEditMode={setEditMode}
            onSubmit={handleSubmit}
          />
        </Box>
      </VStack>
    </FormHelper>
  )
}
