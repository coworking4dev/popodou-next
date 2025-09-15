import { useState } from 'react'

import { HStack, Input, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm, useWatch } from 'react-hook-form'

import { getCountryPhoneCodeOptions } from '@/app/_source/helper/options'
import { CustomSelect } from '@/components/CustomSelect'
import { FormHelper } from '@/components/form-helper'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { InputGroup } from '@/components/ui/input-group'
import { PasswordInput } from '@/components/ui/password-input'
import { showToast } from '@/components/ui/toaster'
import { VerifiedCodeInput } from '@/components/ui/verified-code-input'
import {
  useVerifyEmailConfirmMutation,
  useVerifyEmailMutation,
} from '@/generated/apis/EmailVerifier/EmailVerifier.query'
import {
  RegisterEssentialUserSchema,
  registerEssentialUserSchema,
} from '@/yup/yup-register'

import { BirthInput } from '../component/BirthInput'
import { SignupStepFormContent } from '../component/SignupStepFormContent'

const countryPhoneCodeOptions = getCountryPhoneCodeOptions()

export const SignupForm = ({
  onNext,
}: {
  onNext: (data: RegisterEssentialUserSchema) => void
}) => {
  const {
    register,
    setValue,
    getValues,
    trigger,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<RegisterEssentialUserSchema>({
    resolver: yupResolver(registerEssentialUserSchema),
    reValidateMode: 'onChange',
  })

  const { mutateAsync: verifyEmailAsync, isPending: isVerifyEmailLoading } =
    useVerifyEmailMutation({})
  const {
    mutateAsync: verifyEmailConfirmAsync,
    isPending: isVerifyEmailConfirmLoading,
  } = useVerifyEmailConfirmMutation({})

  const [verifiyStatus, setVerifiyStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle')

  const [isCustomPhoneCode, setIsCustomPhoneCode] = useState(false)

  const email = useWatch({ control, name: 'email' })
  const birthDate = useWatch({ control, name: 'birthDate' })
  const phoneCountryCode = useWatch({ control, name: 'phoneCountryCode' })

  const handleVerifyEmail = async () => {
    const isValid = await trigger(['email'])

    if (!isValid) {
      return
    }

    try {
      await verifyEmailAsync({
        data: {
          email: getValues('email'),
        },
      })
      showToast({
        type: 'success',
        description:
          'A verification code has been sent to your email. Please check your email.',
        closeButton: true,
      })
      setVerifiyStatus('sending')
    } catch (error) {
      console.error(error)
    }
  }

  const handleVerifyEmailConfirm = async (verificationCode: string) => {
    try {
      const { data } = await verifyEmailConfirmAsync({
        data: {
          email: getValues('email'),
          code: verificationCode,
          purpose: 'EMAIL_VALIDATION',
        },
      })

      setVerifiyStatus('success')

      showToast({
        type: 'success',
        description: 'Email verified successfully.',
        closeButton: true,
      })

      setValue('emailToken', data?.token ?? '')
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (data: RegisterEssentialUserSchema) => {
    onNext(data)
  }

  return (
    <VStack w={'100%'}>
      <SignupStepFormContent title="Sign Up">
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
                control={control}
                name="firstName"
                render={({ field }) => (
                  <Input placeholder={'First Name'} size={'lg'} {...field} />
                )}
              />
              <Controller
                control={control}
                name="lastName"
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
            label={'Email Address'}
            isRequired
            message={{
              error: errors.email?.message,
            }}
          >
            <VStack gap={'6px'} w={'100%'}>
              <HStack w={'100%'} gap={'6px'}>
                <InputGroup clearable w={'100%'}>
                  <Input
                    placeholder={'hello@popodou.com'}
                    size={'lg'}
                    disabled={verifiyStatus === 'success'}
                    {...register('email')}
                  />
                </InputGroup>
                <Button
                  size={'lg'}
                  disabled={!email || verifiyStatus === 'success'}
                  loading={isVerifyEmailLoading}
                  onClick={handleVerifyEmail}
                >
                  <Text whiteSpace={'nowrap'} textStyle={'eng-body-5'}>
                    {verifiyStatus === 'idle' && 'Verify Email'}
                    {verifiyStatus === 'sending' && 'Resend Code'}
                    {verifiyStatus === 'success' && 'Verified'}
                  </Text>
                </Button>
              </HStack>
              {verifiyStatus !== 'idle' && (
                <VerifiedCodeInput
                  placeholder={'Enter the verification code'}
                  size={'lg'}
                  verified={verifiyStatus === 'success'}
                  disabled={
                    verifiyStatus !== 'sending' || isVerifyEmailConfirmLoading
                  }
                  onChange={(e) => {
                    if (e.target.value.length === 6) {
                      handleVerifyEmailConfirm(e.target.value)
                    }
                  }}
                  onTimerEnd={() => {}}
                />
              )}
            </VStack>
          </FormHelper>

          <FormHelper
            label={'Password'}
            isRequired
            message={{
              error:
                errors.password?.message || errors.passwordConfirm?.message,
            }}
          >
            <VStack gap={'6px'} w={'100%'}>
              <PasswordInput
                placeholder={
                  '8-20 characters with letters, numbers, and a special character.'
                }
                size={'lg'}
                {...register('password')}
              />
              <PasswordInput
                placeholder={'Re-enter password'}
                size={'lg'}
                {...register('passwordConfirm')}
              />
            </VStack>
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
                  placeholder={'Enter your phone number without hyphens'}
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
                  placeholder={'Enter a number only.'}
                  pattern="[0-9]*"
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
        <Button
          w={'100%'}
          size={'lg'}
          bg={'primary.5'}
          disabled={isSubmitted && !isValid}
          onClick={handleSubmit(onSubmit)}
        >
          <Text textStyle={'eng-body-5'} color={'grey.0'}>
            Next
          </Text>
        </Button>
      </VStack>
    </VStack>
  )
}
