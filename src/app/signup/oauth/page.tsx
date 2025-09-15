'use client'

import { useSearchParams } from 'next/navigation'

import { Center } from '@chakra-ui/react'

import { useStepForm } from '@/hooks/useStepForm'

import { SuccessSignupView } from '../_source/forms/SuccessSignupView'
import { OAuthAdditionalInfoForm } from './_soruce/forms/OAuthAdditionalInfoForm'

type SignupSteps = 'additional' | 'success'

export default function SignUpOAuthPage() {
  const searchParams = useSearchParams()

  const uuid = searchParams.get('temp_uuid')

  const { currentStep, setCurrentStep, Funnel, Step } =
    useStepForm<SignupSteps>('additional')

  const onNext = () => {
    if (currentStep === 'additional') {
      setCurrentStep('success')
    }
  }

  if (!uuid) {
    return <div>No UUID</div>
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
          <Step name="additional">
            <OAuthAdditionalInfoForm uuid={uuid} onNext={onNext} />
          </Step>
          <Step name="success">
            <SuccessSignupView />
          </Step>
        </Funnel>
      </Center>
    </Center>
  )
}
