'use client'

import { Dialog, HStack, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FormHelper } from '@/components/form-helper'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { showToast } from '@/components/ui/toaster'
import { useChangePasswordMutation } from '@/generated/apis/UserApi/UserApi.query'
import { passwordSchema } from '@/yup/yup-common'

import { BaseModalProps } from '../hooks/useAlert'

interface ResetPasswordModalProps {
  onConfirm?: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void> | void
}

interface ResetPasswordSchema {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const resetPasswordSchema: yup.ObjectSchema<ResetPasswordSchema> = yup.object({
  currentPassword: passwordSchema.required(),
  newPassword: passwordSchema.required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
    .notOneOf(
      [yup.ref('currentPassword')],
      'Current password and new password cannot be the same',
    )
    .required('Please enter the password confirmation'),
})

export const ResetPasswordModal = ({
  isOpen,
  close,
}: BaseModalProps<ResetPasswordModalProps>) => {
  const form = useForm<ResetPasswordSchema>({
    resolver: yupResolver(resetPasswordSchema),
  })

  const {
    mutateAsync: changePassword,
    isPending: isPasswordResetConfirmLoading,
  } = useChangePasswordMutation({})

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      await changePassword({
        data: {
          password: data.newPassword,
          passwordConfirm: data.confirmPassword,
          currentPassword: data.currentPassword,
        },
      })

      showToast({
        type: 'success',
        description: 'Password reset successfully',
      })
    } catch (error) {
      console.error(error)
      // if (error instanceof Response) {
      //   const data = await error.json()
      //   showToast({
      //     type: 'error',
      //     description: data.errorCode,
      //   })
      // }
    }
    close()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Backdrop bg={'grey.transparent.5'} />
      <Dialog.Positioner px={{ base: '20px', sm: '0px' }}>
        <Dialog.Content
          minW={{ base: '320px', sm: '575px' }}
          borderRadius={'8px'}
          p={'0px'}
          gap={'0px'}
          bg="background.basic.1"
        >
          {/* Header */}
          <Dialog.Header p={'16px 20px'} alignItems={'start'}>
            <Dialog.Title>
              <Text textStyle={'ko-heading-4'} color={'content.1'}>
                Reset Password
              </Text>
            </Dialog.Title>
          </Dialog.Header>

          {/* Body */}
          <Dialog.Body p={'20px'} gap={'20px'}>
            <VStack gap={'8px'} align={'stretch'} w={'100%'}>
              <FormHelper
                w={'100%'}
                message={{
                  error: errors.currentPassword?.message,
                }}
                invalid={!!errors.currentPassword?.message}
              >
                <PasswordInput
                  placeholder="Enter your current password."
                  {...register('currentPassword')}
                  size={'lg'}
                  h={'48px'}
                  bg={'background.basic.1'}
                  border={'1px solid'}
                  borderColor={'grey.2'}
                  borderRadius={'10px'}
                  _focus={{
                    borderColor: 'primary.5',
                    boxShadow: 'none',
                  }}
                  _placeholder={{
                    color: 'grey.5',
                    textStyle: 'ko-body-6',
                  }}
                  textStyle={'ko-body-6'}
                  color={'content.1'}
                />
              </FormHelper>

              <FormHelper
                w={'100%'}
                message={{
                  error: errors.newPassword?.message,
                }}
                invalid={!!errors.newPassword?.message}
              >
                <PasswordInput
                  placeholder="Enter at least 8 characters, including letters, numbers, and special characters."
                  {...register('newPassword')}
                  size={'lg'}
                  h={'48px'}
                  bg={'background.basic.1'}
                  border={'1px solid'}
                  borderColor={'grey.2'}
                  borderRadius={'10px'}
                  _focus={{
                    borderColor: 'primary.5',
                    boxShadow: 'none',
                  }}
                  _placeholder={{
                    color: 'grey.5',
                    textStyle: 'ko-body-6',
                  }}
                  textStyle={'ko-body-6'}
                  color={'content.1'}
                />
              </FormHelper>

              <FormHelper
                w={'100%'}
                message={{
                  error: errors.confirmPassword?.message,
                }}
                invalid={!!errors.confirmPassword?.message}
              >
                <PasswordInput
                  placeholder="Re-enter your password."
                  {...register('confirmPassword')}
                  size={'lg'}
                  h={'48px'}
                  bg={'background.basic.1'}
                  border={'1px solid'}
                  borderColor={'grey.2'}
                  borderRadius={'10px'}
                  _focus={{
                    borderColor: 'primary.5',
                    boxShadow: 'none',
                  }}
                  _placeholder={{
                    color: 'grey.5',
                    textStyle: 'ko-body-6',
                  }}
                  textStyle={'ko-body-6'}
                  color={'content.1'}
                />
              </FormHelper>
            </VStack>
          </Dialog.Body>

          {/* Footer */}
          <Dialog.Footer p={'16px 20px 20px'} gap={'0px'}>
            <HStack w={'100%'} gap={'8px'}>
              <Button
                w={'100%'}
                size={'lg'}
                variant={'solid-grey'}
                color={'grey.8'}
                onClick={close}
              >
                Cancel
              </Button>
              <Button
                w={'100%'}
                size={'lg'}
                variant={'solid-primary'}
                loading={isPasswordResetConfirmLoading}
                onClick={handleSubmit(onSubmit)}
              >
                Confirm
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

// 기존 컴포넌트명과의 호환성을 위한 별칭
export const ResetPasswordModals = ResetPasswordModal
