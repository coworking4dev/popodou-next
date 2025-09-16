import { useState } from 'react'

import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm, useWatch } from 'react-hook-form'

import setToken from '@/actions/set-token'
import { RegisterAdditionalInfoGender } from '@/apis/generated/models/registerAdditionalInfoGender'
import { SnsInfoPlatform } from '@/apis/generated/models/snsInfoPlatform'
import {
  getCountryOptions,
  getCountryPhoneCodeOptions,
} from '@/app/_source/helper/options'
import { BirthInput } from '@/app/signup/_source/component/BirthInput'
import { SignupStepFormContent } from '@/app/signup/_source/component/SignupStepFormContent'
import { CustomSelect } from '@/components/CustomSelect'
import { FormHelper } from '@/components/form-helper'
import { Checkbox } from '@/components/ui/checkbox'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { OauthRegisterAdditionalInfoType } from '@/generated/apis/@types/data-contracts'
import { useRegisterSocialUserMutation } from '@/generated/apis/UserApi/UserApi.query'
import { registerSocialUserSchema } from '@/yup/yup-social-register'

const countryOptions = getCountryOptions()
const countryPhoneCodeOptions = getCountryPhoneCodeOptions()

interface Props {
  uuid: string
  onNext: () => void
}

export const OAuthAdditionalInfoForm = ({ uuid, onNext }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<OauthRegisterAdditionalInfoType>({
    defaultValues: {
      gender: RegisterAdditionalInfoGender.NONE,
    },
    resolver: yupResolver(registerSocialUserSchema),
    reValidateMode: 'onChange',
  })

  const [isCustomPhoneCode, setIsCustomPhoneCode] = useState(false)

  const { mutateAsync: registerSocialUser, isPending } =
    useRegisterSocialUserMutation({})

  const isReceiveSeedingBox = useWatch({
    control,
    name: 'isReceiveSeedingBox',
  })

  const gender = useWatch({
    control,
    name: 'gender',
  })

  const birthDate = useWatch({ control, name: 'birthDate' })
  const phoneCountryCode = useWatch({ control, name: 'phoneCountryCode' })

  const snsInfoPlatform = useWatch({ control, name: 'snsInfo.platform' })

  const onSubmit = async (data: OauthRegisterAdditionalInfoType) => {
    try {
      const result = await registerSocialUser({
        data: { uuid, additionalInfo: data },
      })

      if (result.data?.accessToken && result.data?.refreshToken) {
        await setToken({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        })
      }

      onNext()
    } catch (error) {
      // showToast({
      //   type: 'error',
      //   description: 'Failed to register additional info',
      // })
      console.error(error)
    }
  }

  return (
    <VStack w={'100%'} position={'relative'}>
      <SignupStepFormContent title="Additional Information">
        <VStack w={'100%'} gap={'28px'}>
          <FormHelper
            label={'Name'}
            isRequired
            message={{
              error: errors.firstName?.message || errors.lastName?.message,
            }}
          >
            <HStack w={'100%'} gap={'6px'}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input placeholder={'First Name'} size={'lg'} {...field} />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input placeholder={'Last Name'} size={'lg'} {...field} />
                )}
              />
            </HStack>
          </FormHelper>
          <FormHelper
            label={'Date of Birth'}
            isRequired
            message={{
              error: errors.birthDate?.message,
            }}
          >
            <HStack w={'100%'} gap={'6px'}>
              <BirthInput
                value={birthDate ?? ''}
                onChange={(value) => {
                  setValue('birthDate', value, { shouldValidate: true })
                }}
              />
            </HStack>
          </FormHelper>
          <FormHelper
            label={'Phone'}
            isRequired
            message={{
              error:
                errors.phoneCountryCode?.message || errors.phoneNumber?.message,
            }}
          >
            <VStack gap={'6px'} w={'100%'}>
              <HStack w={'100%'} gap={'6px'}>
                <CustomSelect
                  options={countryPhoneCodeOptions}
                  placeholder={'code (+82)'}
                  size={'lg'}
                  value={
                    phoneCountryCode ?
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
                      },
                    )
                  }}
                />

                <Input
                  flex={2}
                  inputMode="numeric"
                  placeholder={'Enter a number only.'}
                  pattern="[0-9]*"
                  size={'lg'}
                  {...register('phoneNumber', {
                    onChange: (e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, '')
                      e.target.value = numericValue
                    },
                  })}
                />
              </HStack>
              {isCustomPhoneCode && (
                <Input
                  inputMode="numeric"
                  size={'lg'}
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
            </VStack>
          </FormHelper>

          <FormHelper
            label={'Nickname'}
            isRequired
            message={{
              error: errors.nickname?.message,
            }}
          >
            <HStack w={'100%'} gap={'6px'}>
              <Input
                placeholder={'Enter your nickname'}
                size={'lg'}
                {...register('nickname')}
              />
            </HStack>
          </FormHelper>
          <FormHelper
            label={'Gender'}
            isRequired
            mb={'0px'}
            message={{
              error: errors.gender?.message,
            }}
          >
            <HStack w={'100%'} gap={'6px'}>
              <RadioGroup
                gap={{ base: '0px', sm: '48px' }}
                flexDirection={{ base: 'column', sm: 'row' }}
                display={'flex'}
                defaultValue={RegisterAdditionalInfoGender.NONE}
                value={gender}
                onValueChange={({ value }) => {
                  setValue('gender', value as RegisterAdditionalInfoGender, {
                    shouldValidate: true,
                  })
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
              error: errors.isReceiveSeedingBox?.message,
            }}
            label={
              <VStack gap={'0px'} alignItems={'flex-start'}>
                <Text textStyle={'ko-body-5'}>Seeding Box Received</Text>
                <Text textStyle={'ko-caption-2'} color={'grey.7'}>
                  If you selected YES, both your SNS ID and address are
                  required.
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
                setValue('isReceiveSeedingBox', value === 'true', {
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
                errors.addressInfo?.message ||
                errors.addressInfo?.country?.message ||
                errors.addressInfo?.city?.message ||
                errors.addressInfo?.address?.message ||
                errors.addressInfo?.zipcode?.message,
            }}
          >
            <VStack gap={'6px'} w={'100%'} alignItems={'flex-start'}>
              <HStack w={'100%'} gap={'6px'}>
                <Controller
                  control={control}
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
                  {...register('addressInfo.city')}
                />
              </HStack>
              <HStack w={'100%'} gap={'6px'}>
                <Input
                  placeholder={'Address'}
                  size={'lg'}
                  w={'100%'}
                  {...register('addressInfo.address')}
                />
              </HStack>
              <HStack w={'100%'} gap={'6px'}>
                <Input
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
                errors.snsInfo?.message ||
                errors.snsInfo?.platform?.message ||
                errors.snsInfo?.snsId?.message ||
                errors.snsInfo?.otherPlatformName?.message,
            }}
          >
            <VStack gap={'6px'} w={'100%'} alignItems={'flex-start'}>
              <Controller
                control={control}
                name={'snsInfo.platform'}
                render={({ field }) => (
                  <RadioGroup
                    gap={{ base: '0px', sm: '20px' }}
                    flexDirection={{ base: 'column', sm: 'row' }}
                    display={'flex'}
                    value={field.value}
                    onValueChange={({ value }) => {
                      if (value !== SnsInfoPlatform.OTHERS) {
                        setValue('snsInfo.otherPlatformName', '')
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
                {...register('snsInfo.snsId')}
              />
              {snsInfoPlatform === SnsInfoPlatform.OTHERS && (
                <Input
                  placeholder={'SNS Name'}
                  size={'lg'}
                  w={'100%'}
                  {...register('snsInfo.otherPlatformName')}
                />
              )}
            </VStack>
          </FormHelper>
          <VStack
            pt={'16px'}
            borderTop={'1px solid'}
            borderColor={'background.basic.3'}
            alignItems={'flex-start'}
            w={'100%'}
            gap={'7px'}
            justifyContent={'flex-start'}
          >
            <Controller
              control={control}
              name="isTermsAgreed"
              render={({ field: { value, ...field } }) => (
                <Checkbox
                  {...field}
                  checked={value}
                  onCheckedChange={({ checked }) => {
                    field.onChange(checked)
                  }}
                >
                  <Text as={'span'} textStyle={'eng-body-5'} color={'grey.6'}>
                    [Required] I agree to the Terms of Service.
                    <Text
                      as={'span'}
                      textStyle={'eng-body-5'}
                      color={'grey.6'}
                      ml={'6px'}
                      textDecoration={'underline'}
                    >
                      View
                    </Text>
                  </Text>
                </Checkbox>
              )}
            />
            {errors.isTermsAgreed && (
              <Text textStyle={'ko-caption-2'} color={'accent.red2'}>
                {errors.isTermsAgreed.message}
              </Text>
            )}

            <Controller
              control={control}
              name="isPrivacyAgreed"
              render={({ field: { value, ...field } }) => (
                <Checkbox
                  {...field}
                  checked={value}
                  onCheckedChange={({ checked }) => {
                    field.onChange(checked)
                  }}
                >
                  <Text as={'span'} textStyle={'eng-body-5'} color={'grey.6'}>
                    [Required] I agree to the Privacy Policy.
                    <Text
                      as={'span'}
                      textStyle={'eng-body-5'}
                      color={'grey.6'}
                      ml={'6px'}
                      textDecoration={'underline'}
                    >
                      View
                    </Text>
                  </Text>
                </Checkbox>
              )}
            />
            {errors.isPrivacyAgreed && (
              <Text textStyle={'ko-caption-2'} color={'accent.red2'}>
                {errors.isPrivacyAgreed.message}
              </Text>
            )}
            <Checkbox>
              <Text as={'span'} textStyle={'eng-body-5'} color={'grey.6'}>
                [Optional] Consent to receive marketing information.{' '}
                <Text
                  as={'span'}
                  textStyle={'eng-body-5'}
                  color={'grey.6'}
                  ml={'6px'}
                  textDecoration={'underline'}
                >
                  View
                </Text>
              </Text>
            </Checkbox>
          </VStack>
        </VStack>
      </SignupStepFormContent>

      <VStack w={'100%'} h={'100%'} p={'24px 28px'}>
        {isSubmitted && !isValid && (
          <Text
            textStyle={'ko-caption-2'}
            color={'grey.5'}
            textAlign={'center'}
          >
            Complete all required fields to continue.
          </Text>
        )}

        <Button
          w={'100%'}
          size={'lg'}
          bg={'primary.5'}
          loading={isPending}
          disabled={!isValid && isSubmitted}
          onClick={handleSubmit(onSubmit)}
        >
          <Text textStyle={'eng-body-5'} color={'grey.0'}>
            Sign up
          </Text>
        </Button>
      </VStack>
    </VStack>
  )
}
