'use client'

import { Button, Center, HStack, Image, Text, VStack } from '@chakra-ui/react'

import { logout } from '@/actions/logout'
import { useAccountModals } from '@/components/@modal/accounts/useAccountModals'
import { FormHelper } from '@/components/form-helper'
import { useGetMyPageProfileQuery } from '@/generated/apis/MyPageApi/MyPageApi.query'
import { MY_IMAGES } from '@/generated/path/images'

import { AdditionalInfoEditInput } from './profile-edit-input/AdditionalInfoEditInput'
import { BirthEditInput } from './profile-edit-input/BirthEditInput'
import { EmailEditInput } from './profile-edit-input/EmailEditInput'
import { GenderEditInput } from './profile-edit-input/GenderEditInput'
import { NameEditInput } from './profile-edit-input/NameEditInput'
import { NicknameEditInput } from './profile-edit-input/NicknameEditInput'
import { PhoneEditInput } from './profile-edit-input/PhoneEditInput'
import { ProfileProvider } from './profile-edit-input/ProfileContext'

export const ProfileTab = () => {
  return (
    <VStack
      w="100%"
      py={'28px'}
      px={{ base: '16px', sm: '28px' }}
      gap={'28px'}
      align="stretch"
      overflow={'auto'}
    >
      <Text textStyle="ko-heading-2" color="grey.10">
        Profile
      </Text>
      <ProfileTabContent />
    </VStack>
  )
}

const AppleLogo = () => {
  return (
    <Center boxSize={'48px'} borderRadius={'full'} bg={'grey.2'} p={'10px'}>
      <Image {...MY_IMAGES.SOCIAL_BLACK_APPLE} />
    </Center>
  )
}
const GoogleLogo = () => {
  return (
    <Center boxSize={'48px'} borderRadius={'full'} bg={'grey.2'} p={'10px'}>
      <Image {...MY_IMAGES.SOCIAL_GOOGLE} />
    </Center>
  )
}

const ProfileTabContent = () => {
  const { openResetPasswordModal, openWithdrawModal } = useAccountModals()

  const { data: profile, refetch } = useGetMyPageProfileQuery({
    options: {
      select: (data) => data.data,
    },
  })

  return (
    <ProfileProvider profile={profile} refetch={refetch}>
      <VStack gap={'28px'} align="stretch" w={'100%'}>
        {profile?.provider === 'APPLE' && (
          <HStack gap={'16px'}>
            <AppleLogo />
            <Text color={'grey.8'} textStyle={'ko-body-6'}>
              {profile?.email}
            </Text>
          </HStack>
        )}
        {profile?.provider === 'GOOGLE' && (
          <HStack gap={'16px'}>
            <GoogleLogo />
            <Text color={'grey.8'} textStyle={'ko-body-6'}>
              {profile?.email}
            </Text>
          </HStack>
        )}
        {/* Name */}
        <NameEditInput
          firstName={profile?.firstName ?? ''}
          lastName={profile?.lastName ?? ''}
        />
        {/* Date of Birth */}
        <BirthEditInput birthDate={profile?.birthDate ?? ''} />
        {profile?.provider === null && (
          <FormHelper label={'Password'}>
            <Button
              variant="outline-primary"
              size={'lg'}
              borderRadius="10px"
              onClick={() => {
                openResetPasswordModal()
              }}
            >
              Reset Password
            </Button>
          </FormHelper>
        )}{' '}
        {/* Email Address */}
        <EmailEditInput email={profile?.email ?? ''} />
        {/* Phone */}
        <PhoneEditInput
          defaultPhoneCountryCode={profile?.phoneCountryCode ?? ''}
          defaultPhoneNumber={profile?.phoneNumber ?? ''}
        />
        {/* Nickname */}
        <NicknameEditInput nickname={profile?.nickname ?? ''} />
        {/* Gender */}
        <GenderEditInput gender={profile?.gender} />
        {/* Additional Info */}
        <AdditionalInfoEditInput
          additionalInfo={{
            isReceiveSeedingBox: profile?.isReceiveSeedingBox ?? false,
            addressInfo: profile?.addressInfo,
            snsInfo: profile?.snsInfo,
          }}
        />
        <HStack
          justify="space-between"
          h="40px"
          align="center"
          mt={{ md: '30px', base: '0px' }}
        >
          <Text
            textStyle="ko-body-4"
            color="grey.6"
            textDecoration="underline"
            cursor="pointer"
            onClick={() => openWithdrawModal()}
          >
            Delete Account
          </Text>
          <Text
            textStyle="ko-body-4"
            color="grey.10"
            cursor="pointer"
            onClick={() => {
              logout()
            }}
          >
            Logout
          </Text>
        </HStack>
      </VStack>
    </ProfileProvider>
  )
}
