'use client'

import { useState } from 'react'

import { Center } from '@chakra-ui/react'

import { RegisterUserRequestDto } from '@/apis/generated/models/registerUserRequestDto'
import { RegisterAdditionalInfoType } from '@/generated/apis/@types/data-contracts'
import { useRegisterUserMutation } from '@/generated/apis/UserApi/UserApi.query'
import { useStepForm } from '@/hooks/useStepForm'
import { RegisterEssentialUserSchema } from '@/yup/yup-register'

import { AdditionalInfoForm } from './_source/forms/AdditionalInfoForm'
import { SignupForm } from './_source/forms/SignupForm'
import { SuccessSignupView } from './_source/forms/SuccessSignupView'

type SignupSteps = 'signup' | 'additional' | 'success'

export default function SignUpPage() {
  const [signupData, setSignupData] = useState<RegisterUserRequestDto>()

  const { mutateAsync: registerUserAsync, isPending: isRegisterUserLoading } =
    useRegisterUserMutation({})

  const { setCurrentStep, Funnel, Step, currentStep } =
    useStepForm<SignupSteps>('signup')

  const onSaveSignUpEssential = (data: RegisterEssentialUserSchema) => {
    setSignupData(data)
    setCurrentStep('additional')
  }

  const onRegister = async (data: RegisterAdditionalInfoType) => {
    try {
      await registerUserAsync({
        data: {
          ...signupData!,
          additionalInfo: data,
        },
      })
      setCurrentStep('success')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Center
      py={{ base: '20px 80px', sm: '80px' }}
      px={{ base: '20px', sm: '0px' }}
      h={'100%'}
    >
      <Center
        h={'100%'}
        w={{ base: '100%', sm: '600px' }}
        alignItems={{ base: 'start', sm: 'center' }}
        borderRadius={'20px'}
        bg={currentStep === 'success' ? 'transparent' : 'grey.0'}
      >
        <Funnel>
          <Step name="signup">
            <SignupForm onNext={onSaveSignUpEssential} />
          </Step>
          <Step name="additional">
            <AdditionalInfoForm
              onNext={onRegister}
              registerLoading={isRegisterUserLoading}
            />
          </Step>
          <Step name="success">
            <SuccessSignupView />
          </Step>
        </Funnel>
      </Center>
    </Center>
  )
}
