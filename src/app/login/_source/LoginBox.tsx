'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Button, Image, Input, Text, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'

import setToken from '@/actions/set-token'
import { FormHelper } from '@/components/form-helper'
import { InputGroup } from '@/components/ui/input-group'
import { PasswordInput } from '@/components/ui/password-input'
import { showToast } from '@/components/ui/toaster'
import { ENV } from '@/configs/env'
import { ROUTES } from '@/constants/routes'
import { useLoginMutation } from '@/generated/apis/UserApi/UserApi.query'
import { MY_IMAGES } from '@/generated/path/images'
import { LoginSchema, loginSchema } from '@/yup/yup-login'

export const LoginBox = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { mutateAsync: loginAsync, isPending } = useLoginMutation({})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await loginAsync({ data })

      // 로그인 성공 시 토큰 저장
      if (response.data?.accessToken && response.data?.refreshToken) {
        await setToken({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
        const redirect = searchParams.get('redirect')
        if (redirect) {
          router.replace(redirect)
        } else {
          router.replace(ROUTES.MAIN)
        }
      }
    } catch (error) {
      // if (error instanceof Response) {
      //   showToast({
      //     type: 'error',
      //     description: 'Invalid email or password',
      //   })
      // }
    }
  }

  const handleGoogleLogin = async () => {
    try {
      // OAuth 인증을 위해 직접 리다이렉트
      window.location.href = `${ENV.API_BASE_URL}/oauth2/authorization/google`
    } catch (e) {
      showToast({
        type: 'error',
        description: 'Failed to login with Google',
      })
    }
  }

  const handleAppleLogin = async () => {
    try {
      // OAuth 인증을 위해 직접 리다이렉트
      window.location.href = `${ENV.API_BASE_URL}/oauth2/authorization/apple`
    } catch (e) {
      showToast({
        type: 'error',
        description: 'Failed to login with Apple',
      })
    }
  }

  return (
    <VStack
      w={{ base: '100%', sm: '658px' }}
      bg={'grey.0'}
      p={{ base: '56px 16px', sm: '56px 80px' }}
      borderRadius={'20px'}
      gap={'56px'}
    >
      <VStack gap={'0px'}>
        <Text textStyle={'ko-heading-1'}>Welcome to popodou!</Text>
        <Text textStyle={'eng-body-4'} mt={'12px'}>
          Start your journey with popodou
        </Text>
      </VStack>

      <VStack
        w={'100%'}
        gap={'12px'}
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormHelper
          message={{
            error: errors.email?.message,
          }}
        >
          <InputGroup clearable w={'100%'}>
            <Input
              placeholder={'hello@popodou.com'}
              size={'lg'}
              w={'100%'}
              {...register('email')}
            />
          </InputGroup>
        </FormHelper>

        <FormHelper
          message={{
            error: errors.password?.message,
            help: 'Enter a password with 8–16 characters using letters, numbers & symbols',
          }}
        >
          <PasswordInput
            placeholder={'Password'}
            size={'lg'}
            w={'100%'}
            type={'password'}
            {...register('password')}
          />
        </FormHelper>
        <Button
          loading={isPending}
          w={'100%'}
          type={'submit'}
          bg={'primary.5'}
          textStyle={'eng-body-5'}
          size={'lg'}
        >
          Login
        </Button>
      </VStack>
      <VStack w={'100%'} gap={'16px'}>
        <Button
          bg={'#232323'}
          color={'grey.0'}
          size={'lg'}
          w={'100%'}
          onClick={handleAppleLogin}
        >
          <Image {...MY_IMAGES.SOCIAL_APPLE} boxSize={'24px'} />
          <Text textStyle={'eng-body-5'}>Continue with Apple</Text>
        </Button>
        <Button
          size={'lg'}
          w={'100%'}
          color={'grey.9'}
          variant={'outline-primary'}
          onClick={handleGoogleLogin}
        >
          <Image {...MY_IMAGES.SOCIAL_GOOGLE} boxSize={'24px'} />
          <Text textStyle={'eng-body-5'}>Continue with Google</Text>
        </Button>
        <Button
          onClick={() => router.push(ROUTES.SIGN_UP)}
          size={'lg'}
          w={'100%'}
          variant={'outline-primary'}
          color={'primary.5'}
        >
          <Text textStyle={'eng-body-5'}>Continue with Email</Text>
        </Button>
      </VStack>
      <Text
        textStyle={'ko-body-4'}
        color={'grey.9'}
        textAlign={'center'}
        cursor={'pointer'}
        onClick={() => router.push(ROUTES.FIND_PASSWORD)}
      >
        Forgot your password?
      </Text>
    </VStack>
  )
}
