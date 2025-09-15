import { useRouter } from 'next/navigation'

import { Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { showToast } from '@/components/ui/toaster'
import { ROUTES } from '@/constants/routes'
import { usePasswordResetConfirmMutation } from '@/generated/apis/UserApi/UserApi.query'
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from '@/yup/yup-find-password'

import { SignupStepFormContent } from '../component/SignupStepFormContent'

export const ResetPasswordForm = ({ emailToken }: { emailToken: string }) => {
  const router = useRouter()

  const {
    mutateAsync: passwordResetConfirm,
    isPending: isPasswordResetConfirmLoading,
  } = usePasswordResetConfirmMutation({})

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'all',
  })

  const verifyEmailConfirm = async (data: ResetPasswordSchema) => {
    try {
      await passwordResetConfirm({
        data: {
          token: emailToken,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        },
      })
      showToast({
        type: 'success',
        description:
          'Your password has been successfully reset. Please log in again.',
        closeButton: true,
      })

      router.push(ROUTES.LOGIN)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <VStack w={'600px'} bg={'grey.0'} borderRadius={'20px'}>
      <SignupStepFormContent
        title="Reset Your Password"
        description="Please enter the new password you wish to use."
      >
        <FormHelper
          label={'Password'}
          isRequired
          message={{
            error: errors.password?.message || errors.passwordConfirm?.message,
          }}
        >
          <VStack w={'100%'} gap={'6px'}>
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
      </SignupStepFormContent>

      <VStack w={'100%'} h={'100%'} p={'24px 28px'}>
        <Button
          w={'100%'}
          size={'lg'}
          bg={'primary.5'}
          loading={isPasswordResetConfirmLoading}
          onClick={handleSubmit(verifyEmailConfirm)}
        >
          <Text textStyle={'eng-body-5'} color={'grey.0'}>
            Confirm
          </Text>
        </Button>
      </VStack>
    </VStack>
  )
}
