import { useEffect, useState } from 'react'

import { Box, HStack } from '@chakra-ui/react'

import { useForm, useWatch } from 'react-hook-form'

import { RegisterAdditionalInfoGender } from '@/apis/generated/models/registerAdditionalInfoGender'
import { FormHelper } from '@/components/form-helper'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { MyPageUserInfoGenderEnumType } from '@/generated/apis/@types/data-contracts'

import { EditTriggerButton } from './EditTriggerButton'

export const GenderEditInput = ({
  gender: defaultGender,
}: {
  gender?: MyPageUserInfoGenderEnumType
}) => {
  const [editMode, setEditMode] = useState(false)

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm<{
    gender: MyPageUserInfoGenderEnumType
  }>({
    defaultValues: {
      gender: defaultGender,
    },
  })

  useEffect(() => {
    reset({
      gender: defaultGender,
    })
  }, [defaultGender])

  const gender = useWatch({
    control,
    name: 'gender',
  })

  return (
    <FormHelper
      label={'Gender'}
      isRequired
      mb={'0px'}
      message={{
        error: errors?.gender?.message,
      }}
    >
      <HStack w={'100%'} gap={'6px'} justifyContent={'space-between'}>
        <RadioGroup
          gap={{ base: '0px', sm: '48px' }}
          display={'flex'}
          disabled={!editMode}
          flexDirection={{ base: 'column', sm: 'row' }}
          value={gender}
          onValueChange={({ value }) => {
            setValue('gender', value as MyPageUserInfoGenderEnumType, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }}
        >
          <Radio height={'48px'} value={RegisterAdditionalInfoGender.MALE}>
            Male
          </Radio>
          <Radio height={'48px'} value={RegisterAdditionalInfoGender.FEMALE}>
            Female
          </Radio>
          <Radio height={'48px'} value={RegisterAdditionalInfoGender.NONE}>
            Prefer not to say
          </Radio>
        </RadioGroup>
        <Box display={{ base: 'none', sm: 'block' }}>
          <EditTriggerButton
            isEditMode={editMode}
            isDirty={isDirty}
            onSubmit={handleSubmit}
            toggleEditMode={setEditMode}
          />
        </Box>
      </HStack>
      <HStack
        display={{ base: 'flex', sm: 'none' }}
        justify={{ base: 'end', sm: 'auto' }}
        w={'100%'}
      >
        <EditTriggerButton
          isEditMode={editMode}
          isDirty={isDirty}
          onSubmit={handleSubmit}
          toggleEditMode={setEditMode}
        />
      </HStack>
    </FormHelper>
  )
}
