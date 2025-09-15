import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm, useWatch } from 'react-hook-form'

import { RegisterAdditionalInfoGender } from '@/apis/generated/models/registerAdditionalInfoGender'
import { SnsInfoPlatform } from '@/apis/generated/models/snsInfoPlatform'
import { getCountryOptions } from '@/app/_source/helper/options'
import { CustomSelect } from '@/components/CustomSelect'
import { FormHelper } from '@/components/form-helper'
import { Radio, RadioGroup } from '@/components/ui/radio'
import {
  RegisterAdditionalUserSchema,
  registerAdditionalUserSchema,
} from '@/yup/yup-register'

import { SignupStepFormContent } from '../component/SignupStepFormContent'

const countryOptions = getCountryOptions()

export const AdditionalInfoForm = ({
  onNext,
  registerLoading,
}: {
  onNext: (data: RegisterAdditionalUserSchema) => void
  registerLoading?: boolean
}) => {
  const {
    register: registerAdditionalInfo,
    setValue: setValueAdditionalInfo,
    handleSubmit: handleSubmitAdditionalInfo,
    control: controlAdditionalInfo,
    formState: { errors: errorsAdditionalInfo, isValid },
  } = useForm<RegisterAdditionalUserSchema>({
    resolver: yupResolver(registerAdditionalUserSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      gender: RegisterAdditionalInfoGender.NONE,
    },
  })

  const isReceiveSeedingBox = useWatch({
    control: controlAdditionalInfo,
    name: 'isReceiveSeedingBox',
  })

  const gender = useWatch({
    control: controlAdditionalInfo,
    name: 'gender',
  })

  const snsInfoPlatform = useWatch({
    control: controlAdditionalInfo,
    name: 'snsInfo.platform',
  })

  const onSubmit = async (data: RegisterAdditionalUserSchema) => {
    try {
      onNext(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <VStack w={'100%'}>
      <SignupStepFormContent title="Additional Information">
        <FormHelper
          label={'Nickname'}
          isRequired
          message={{
            error: errorsAdditionalInfo?.nickname?.message,
          }}
        >
          <HStack w={'100%'} gap={'6px'}>
            <Input
              placeholder={'Enter your nickname'}
              size={'lg'}
              {...registerAdditionalInfo('nickname')}
            />
          </HStack>
        </FormHelper>
        <FormHelper
          label={'Gender'}
          isRequired
          mb={'0px'}
          message={{
            error: errorsAdditionalInfo?.gender?.message,
          }}
        >
          <HStack w={'100%'} gap={'6px'}>
            <RadioGroup
              gap={{ base: '0px', sm: '48px' }}
              flexDirection={{ base: 'column', sm: 'row' }}
              display={'flex'}
              value={gender}
              onValueChange={({ value }) => {
                setValueAdditionalInfo(
                  'gender',
                  value as RegisterAdditionalInfoGender,
                  {
                    shouldValidate: true,
                  },
                )
              }}
            >
              <Radio h={'48px'} value={RegisterAdditionalInfoGender.MALE}>
                Male
              </Radio>
              <Radio h={'48px'} value={RegisterAdditionalInfoGender.FEMALE}>
                Female
              </Radio>
              <Radio h={'48px'} value={RegisterAdditionalInfoGender.NONE}>
                Prefer not to say
              </Radio>
            </RadioGroup>
          </HStack>
        </FormHelper>
        <FormHelper
          message={{
            error: errorsAdditionalInfo?.isReceiveSeedingBox?.message,
          }}
          label={
            <VStack gap={'0px'} alignItems={'flex-start'}>
              <Text textStyle={'ko-body-5'}>Seeding Box Received</Text>
              <Text textStyle={'ko-caption-2'} color={'grey.7'}>
                If you selected YES, both your SNS ID and address are required.
              </Text>
            </VStack>
          }
        >
          <RadioGroup
            gap={'48px'}
            display={'flex'}
            h={'48px'}
            value={isReceiveSeedingBox ? 'true' : 'false'}
            onValueChange={({ value }) => {
              setValueAdditionalInfo('isReceiveSeedingBox', value === 'true', {
                shouldValidate: true,
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
              errorsAdditionalInfo?.addressInfo?.message ||
              errorsAdditionalInfo?.addressInfo?.country?.message ||
              errorsAdditionalInfo?.addressInfo?.city?.message ||
              errorsAdditionalInfo?.addressInfo?.address?.message ||
              errorsAdditionalInfo?.addressInfo?.zipcode?.message,
          }}
        >
          <VStack gap={'6px'} w={'100%'} alignItems={'flex-start'}>
            <HStack w={'100%'} gap={'6px'}>
              <Controller
                control={controlAdditionalInfo}
                name={'addressInfo.country'}
                render={({ field }) => (
                  <CustomSelect
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
                placeholder={'City'}
                size={'lg'}
                flex={1}
                {...registerAdditionalInfo('addressInfo.city')}
              />
            </HStack>
            <HStack w={'100%'} gap={'6px'}>
              <Input
                placeholder={'Address'}
                size={'lg'}
                w={'100%'}
                {...registerAdditionalInfo('addressInfo.address')}
              />
            </HStack>
            <HStack w={'100%'} gap={'6px'}>
              <Input
                placeholder={'Postal code'}
                size={'lg'}
                w={'100%'}
                {...registerAdditionalInfo('addressInfo.zipcode')}
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
              errorsAdditionalInfo?.snsInfo?.message ||
              errorsAdditionalInfo?.snsInfo?.platform?.message ||
              errorsAdditionalInfo?.snsInfo?.snsId?.message ||
              errorsAdditionalInfo?.snsInfo?.otherPlatformName?.message,
          }}
        >
          <VStack gap={'6px'} w={'100%'} alignItems={'flex-start'}>
            <Controller
              control={controlAdditionalInfo}
              name={'snsInfo.platform'}
              render={({ field }) => (
                <RadioGroup
                  gap={{ base: '0px', sm: '20px' }}
                  flexDirection={{ base: 'column', sm: 'row' }}
                  display={'flex'}
                  value={field.value}
                  onValueChange={({ value }) => {
                    if (value !== SnsInfoPlatform.OTHERS) {
                      setValueAdditionalInfo('snsInfo.otherPlatformName', '')
                    }

                    field.onChange(value as SnsInfoPlatform)
                  }}
                >
                  <Radio h={'48px'} value={SnsInfoPlatform.INSTAGRAM}>
                    Instagram
                  </Radio>
                  <Radio h={'48px'} value={SnsInfoPlatform.TWITTER}>
                    X
                  </Radio>
                  <Radio h={'48px'} value={SnsInfoPlatform.FACEBOOK}>
                    Facebook
                  </Radio>
                  <Radio h={'48px'} value={SnsInfoPlatform.LINKEDIN}>
                    LinkedIn
                  </Radio>
                  <Radio h={'48px'} value={SnsInfoPlatform.OTHERS}>
                    Others
                  </Radio>
                </RadioGroup>
              )}
            />
            <Input
              placeholder={'SNS ID'}
              size={'lg'}
              w={'100%'}
              {...registerAdditionalInfo('snsInfo.snsId')}
            />
            {snsInfoPlatform === SnsInfoPlatform.OTHERS && (
              <Input
                placeholder={'SNS Name'}
                size={'lg'}
                w={'100%'}
                {...registerAdditionalInfo('snsInfo.otherPlatformName')}
              />
            )}
          </VStack>
        </FormHelper>
      </SignupStepFormContent>

      <VStack w={'100%'} h={'100%'} p={'24px 28px'}>
        <Button
          w={'100%'}
          size={'lg'}
          bg={'primary.5'}
          loading={registerLoading}
          disabled={!isValid}
          onClick={handleSubmitAdditionalInfo(onSubmit)}
        >
          <Text textStyle={'eng-body-5'} color={'grey.0'}>
            Sign up
          </Text>
        </Button>
      </VStack>
    </VStack>
  )
}
