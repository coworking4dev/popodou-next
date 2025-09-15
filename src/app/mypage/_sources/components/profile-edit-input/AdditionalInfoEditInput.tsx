import { useState } from 'react'

import { Box, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm, useWatch } from 'react-hook-form'

import { SnsInfoPlatform } from '@/apis/generated/models'
import { getCountryOptions } from '@/app/_source/helper/options'
import { CustomSelect } from '@/components/CustomSelect'
import { FormHelper } from '@/components/form-helper'
import { Radio, RadioGroup } from '@/components/ui/radio'
import {
  AddressInfoType,
  SnsInfoType,
} from '@/generated/apis/@types/data-contracts'
import {
  ProfileEditAdditionalInfoSchema,
  profileEditAdditionalInfoSchema,
} from '@/yup/yup-profile'

import { EditTriggerButton } from './EditTriggerButton'

const countryOptions = getCountryOptions()

interface Props {
  additionalInfo: {
    isReceiveSeedingBox: boolean
    addressInfo?: AddressInfoType
    snsInfo?: SnsInfoType
  }
}

export const AdditionalInfoEditInput = ({ additionalInfo }: Props) => {
  const [editMode, setEditMode] = useState(false)

  const {
    control,
    formState: { errors, isDirty },
    setValue,
    register,
    handleSubmit,
  } = useForm<ProfileEditAdditionalInfoSchema>({
    resolver: yupResolver(profileEditAdditionalInfoSchema),
    defaultValues: additionalInfo,
  })

  const isReceiveSeedingBox = useWatch({
    control,
    name: 'isReceiveSeedingBox',
  })

  const snsInfoPlatform = useWatch({
    control,
    name: 'snsInfo.platform',
  })

  return (
    <VStack gap={'28px'}>
      <FormHelper
        message={{
          error: errors?.isReceiveSeedingBox?.message,
        }}
        w={'100%'}
      >
        <HStack
          w={'100%'}
          gap={'6px'}
          justifyContent={'space-between'}
          mb={'6px'}
        >
          <VStack gap={'0px'} alignItems={'flex-start'}>
            <Text textStyle={'ko-body-5'}>Seeding Box Received</Text>
            <Text textStyle={'ko-caption-2'} color={'grey.7'}>
              If you selected YES, both your SNS ID and address are required.
            </Text>
          </VStack>
          <Box display={{ base: 'none', sm: 'block' }}>
            <EditTriggerButton
              isEditMode={editMode}
              isDirty={isDirty}
              onSubmit={handleSubmit}
              toggleEditMode={setEditMode}
            />
          </Box>
        </HStack>

        <RadioGroup
          gap={'48px'}
          display={'flex'}
          h={'48px'}
          disabled={!editMode}
          value={isReceiveSeedingBox ? 'true' : 'false'}
          onValueChange={({ value }) => {
            setValue('isReceiveSeedingBox', value === 'true', {
              shouldValidate: true,
              shouldDirty: true,
            })
          }}
        >
          <Radio value={'true'}>Yes</Radio>
          <Radio value={'false'}>No</Radio>
        </RadioGroup>
      </FormHelper>
      <FormHelper
        label={'Address'}
        isRequired={isReceiveSeedingBox}
        message={{
          error:
            errors?.addressInfo?.message ||
            errors?.addressInfo?.country?.message ||
            errors?.addressInfo?.city?.message ||
            errors?.addressInfo?.address?.message ||
            errors?.addressInfo?.zipcode?.message,
        }}
      >
        <VStack gap={'6px'} w={'100%'} alignItems={'flex-start'}>
          <HStack w={'100%'} gap={'6px'}>
            <Controller
              control={control}
              name={'addressInfo.country'}
              render={({ field }) => (
                <CustomSelect
                  disabled={!editMode}
                  options={countryOptions}
                  placeholder={'Country'}
                  size={'lg'}
                  flex={1}
                  value={field.value ? [field.value] : undefined}
                  onValueChange={({ value }) => {
                    field.onChange(value[0])
                  }}
                />
              )}
            />
            <Input
              disabled={!editMode}
              placeholder={'City'}
              size={'lg'}
              flex={1}
              {...register('addressInfo.city')}
            />
          </HStack>
          <HStack w={'100%'} gap={'6px'}>
            <Input
              disabled={!editMode}
              placeholder={'Address'}
              size={'lg'}
              w={'100%'}
              {...register('addressInfo.address')}
            />
          </HStack>
          <HStack w={'100%'} gap={'6px'}>
            <Input
              disabled={!editMode}
              placeholder={'Postal code'}
              size={'lg'}
              w={'100%'}
              {...register('addressInfo.zipcode')}
            />
          </HStack>
        </VStack>
      </FormHelper>

      <FormHelper
        label={'SNS ID'}
        isRequired={isReceiveSeedingBox}
        mb={'0px'}
        message={{
          error:
            errors?.snsInfo?.message ||
            errors?.snsInfo?.platform?.message ||
            errors?.snsInfo?.snsId?.message ||
            errors?.snsInfo?.otherPlatformName?.message,
        }}
      >
        <VStack gap={'6px'} w={'100%'} alignItems={'flex-start'}>
          <Controller
            control={control}
            name={'snsInfo.platform'}
            render={({ field }) => (
              <RadioGroup
                gap={{ base: '0px', sm: '20px' }}
                display={'flex'}
                flexDirection={{ base: 'column', sm: 'row' }}
                disabled={!editMode}
                value={field.value}
                onValueChange={({ value }) => {
                  if (value !== SnsInfoPlatform.OTHERS) {
                    setValue('snsInfo.otherPlatformName', '', {
                      shouldDirty: true,
                    })
                  }

                  field.onChange(value as SnsInfoPlatform)
                }}
              >
                <Radio height={'48px'} value={SnsInfoPlatform.INSTAGRAM}>
                  Instagram
                </Radio>
                <Radio height={'48px'} value={SnsInfoPlatform.TWITTER}>
                  X
                </Radio>
                <Radio height={'48px'} value={SnsInfoPlatform.FACEBOOK}>
                  Facebook
                </Radio>
                <Radio height={'48px'} value={SnsInfoPlatform.LINKEDIN}>
                  LinkedIn
                </Radio>
                <Radio height={'48px'} value={SnsInfoPlatform.OTHERS}>
                  Others
                </Radio>
              </RadioGroup>
            )}
          />
          <Input
            disabled={!editMode}
            placeholder={'SNS ID'}
            size={'lg'}
            w={'100%'}
            {...register('snsInfo.snsId')}
          />
          {snsInfoPlatform === SnsInfoPlatform.OTHERS && (
            <Input
              disabled={!editMode}
              placeholder={'SNS Name'}
              size={'lg'}
              w={'100%'}
              {...register('snsInfo.otherPlatformName')}
            />
          )}
        </VStack>
      </FormHelper>
      <HStack
        display={{ base: 'flex', sm: 'none' }}
        justify={{ base: 'end' }}
        w={'100%'}
      >
        <EditTriggerButton
          isEditMode={editMode}
          isDirty={isDirty}
          onSubmit={handleSubmit}
          toggleEditMode={setEditMode}
        />
      </HStack>
    </VStack>
  )
}
