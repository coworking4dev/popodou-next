import { createContext, useContext } from 'react'

import { Center, Spinner } from '@chakra-ui/react'

import { MyPageUserInfoType } from '@/generated/apis/@types/data-contracts'

export const ProfileContext = createContext<{
  profile: MyPageUserInfoType | undefined
  refetch: () => void
}>({
  profile: undefined,
  refetch: () => {},
})

export const ProfileProvider = ({
  children,
  profile,
  refetch,
}: {
  children: React.ReactNode
  profile: MyPageUserInfoType | undefined
  refetch: () => void
}) => {
  return (
    <ProfileContext.Provider value={{ profile, refetch }}>
      {!profile && (
        <Center h={'50vh'}>
          <Spinner />
        </Center>
      )}
      {profile && children}
    </ProfileContext.Provider>
  )
}

export const useProfileContext = () => {
  return useContext(ProfileContext)
}
