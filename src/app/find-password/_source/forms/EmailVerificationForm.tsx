import { useState } from 'react'

import { HStack, Input, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'

import { useAlert } from '@/components/@modal/hooks/useAlert'
import { FormHelper } from '@/components/form-helper'
import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/ui/input-group'
import { showToast } from '@/components/ui/toaster'
import { VerifiedCodeInput } from '@/components/ui/verified-code-input'
import {
  useSendEmailForPasswordResetMutation,
  useVerifyEmailConfirmMutation,
} from '@/generated/apis/EmailVerifier/EmailVerifier.query'
import { FindPasswordSchema, findPasswordSchema } from '@/yup/yup-find-password'

import { SignupStepFormContent } from '../component/SignupStepFormContent'

export const EmailVerificationForm = ({
  onNext,
  setEmailToken,
}: {
  onNext: () => void
  setEmailToken: (token: string) => void
}) => {
  const { openAlert } = useAlert()

  const {
    mutateAsync: sendEmailForPasswordResetAsync,
    isPending: isSendEmailForPasswordResetLoading,
  } = useSendEmailForPasswordResetMutation({})

  const {
    mutateAsync: verifyEmailConfirmAsync,
    isPending: isVerifyEmailConfirmLoading,
  } = useVerifyEmailConfirmMutation({})

  const {
    getValues,
    trigger,
    register,
    formState: { errors },
  } = useForm<FindPasswordSchema>({
    resolver: yupResolver(findPasswordSchema),
    mode: 'all',
  })

  const [verificationCode, setVerificationCode] = useState<string>('')

  const [verifiyStatus, setVerifiyStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle')

  const sendEmailForPasswordReset = async () => {
    try {
      const isValid = await trigger(['email'])
      if (!isValid) {
        return
      }

      await sendEmailForPasswordResetAsync({
        data: {
          email: getValues('email'),
        },
      })
      setVerifiyStatus('sending')
      showToast({
        type: 'success',
        description:
          'A verification code has been sent to your email. Please check your email.',
        closeButton: true,
      })
    } catch (error) {
      console.log(error)

      openAlert({
        title: 'Error',
        description: 'Failed to send verification code',
        confirmLabel: 'OK',
      })
    }
  }

  const verifyEmailConfirm = async (verificationCode: string) => {
    try {
      const result = await verifyEmailConfirmAsync({
        data: {
          email: getValues('email'),
          code: verificationCode,
          purpose: 'RESET_PASSWORD',
        },
      })
      setVerifiyStatus('success')
      setEmailToken(result.data?.token ?? '')
      showToast({
        type: 'success',
        description: 'Email verified successfully',
        closeButton: true,
      })

      onNext()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <VStack w={'600px'} bg={'grey.0'} borderRadius={'20px'}>
      <SignupStepFormContent
        title="Find Password"
        description="Please enter the email you used to sign up."
      >
        <FormHelper
          label={'Email Address'}
          isRequired
          message={{
            error: errors.email?.message,
          }}
        >
          <VStack w={'100%'} gap={'6px'}>
            <HStack w={'100%'} gap={'6px'}>
              <InputGroup clearable w={'100%'}>
                <Input
                  placeholder={'hello@popodou.com'}
                  size={'lg'}
                  {...register('email')}
                />
              </InputGroup>
              <Button
                size={'lg'}
                disabled={verifiyStatus === 'success'}
                onClick={() => {
                  sendEmailForPasswordReset()
                }}
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
                maxLength={6}
                onChange={(e) => {
                  setVerificationCode(e.target.value)
                }}
                onTimerEnd={() => {}}
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
          disabled={
            verificationCode.length !== 6 || isVerifyEmailConfirmLoading
          }
          onClick={async () => {
            await verifyEmailConfirm(verificationCode)
          }}
        >
          <Text textStyle={'eng-body-5'} color={'grey.0'}>
            Submit Code
          </Text>
        </Button>
      </VStack>
    </VStack>
  )
}
