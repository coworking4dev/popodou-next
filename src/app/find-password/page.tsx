'use client'

import { useState } from 'react'

import { Center } from '@chakra-ui/react'

import { useStepForm } from '@/hooks/useStepForm'

import { EmailVerificationForm } from './_source/forms/EmailVerificationForm'
import { ResetPasswordForm } from './_source/forms/ResetPasswordForm'

type FindPasswordSteps = 'email-verification' | 'reset-password'

export default function FindPasswordPage() {
  const { currentStep, setCurrentStep, Funnel, Step } =
    useStepForm<FindPasswordSteps>('email-verification')

  const [emailToken, setEmailToken] = useState('')

  const onNext = () => {
    if (currentStep === 'email-verification') {
      setCurrentStep('reset-password')
    }
  }

  return (
    <Center w={'100%'} h={'100%'}>
      <Funnel>
        <Step name="email-verification">
          <EmailVerificationForm
            onNext={onNext}
            setEmailToken={setEmailToken}
          />
        </Step>
        <Step name="reset-password">
          <ResetPasswordForm emailToken={emailToken} />
        </Step>
      </Funnel>
    </Center>
  )
}
