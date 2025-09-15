'use client'

import { useLayoutEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Center, Tabs, Text, VStack } from '@chakra-ui/react'

import { FavoritesTab } from './components/FavoritesTab'
import { InquiryTab } from './components/InquiryTab'
import { MyPostsTab } from './components/MyPostsTab'
import { ProfileTab } from './components/ProfileTab'

type TabType = 'profile' | 'favorites' | 'myposts' | 'inquiry'

const scrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#eaebec',
    borderRadius: '3px',
  },
}

export const MyPageTemplate = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab] = useState<TabType>()

  useLayoutEffect(() => {
    const tab = searchParams.get('tab') as TabType
    if (tab && ['profile', 'favorites', 'myposts', 'inquiry'].includes(tab)) {
      setActiveTab(tab)
    } else {
      setActiveTab('profile')
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    const newTab = value as TabType
    setActiveTab(newTab)

    // URL query 업데이트
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('tab', newTab)
    router.push(`/mypage?${newSearchParams.toString()}`, { scroll: false })
  }

  return (
    <VStack
      w="100%"
      maxW="900px"
      mx="auto"
      align="center"
      px={{ base: '20px', md: '20px' }}
      py={{ base: '20px', sm: '56px' }}
      h={'100%'}
      pb={'56px'}
      justifyContent={'start'}
    >
      <Tabs.Root
        variant={'enclosed'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        w={'100%'}
        height={'100%'}
        size={{ base: 'sm', sm: 'md' }}
        gap={'24px'}
        value={activeTab}
        onValueChange={({ value }) => handleTabChange(value)}
      >
        <Center w={'100%'}>
          <Tabs.List
            border="none"
            justifyContent={{ base: 'space-between', sm: 'center' }}
            alignItems={'center'}
            w={{ base: '100%', sm: 'fit-content' }}
          >
            <Tabs.Trigger value="profile">
              <Text textStyle="ko-body-5" whiteSpace={'nowrap'}>
                Profile
              </Text>
            </Tabs.Trigger>
            <Tabs.Trigger value="favorites">
              <Text textStyle="ko-body-5" whiteSpace={'nowrap'}>
                Favorites
              </Text>
            </Tabs.Trigger>
            <Tabs.Trigger value="myposts">
              <Text textStyle="ko-body-5" whiteSpace={'nowrap'}>
                My Posts
              </Text>
            </Tabs.Trigger>
            <Tabs.Trigger value="inquiry">
              <Text textStyle="ko-body-5" whiteSpace={'nowrap'}>
                1:1 Inquiry
              </Text>
            </Tabs.Trigger>
          </Tabs.List>
        </Center>

        <Tabs.Content
          value="profile"
          w={'100%'}
          h={'100%'}
          overflow={'auto'}
          bg="white"
          borderRadius="20px"
          css={scrollbarStyle}
        >
          <ProfileTab />
        </Tabs.Content>
        <Tabs.Content
          value="favorites"
          w={'100%'}
          h={'100%'}
          overflow={'auto'}
          bg="white"
          borderRadius="20px"
          css={scrollbarStyle}
        >
          <FavoritesTab />
        </Tabs.Content>
        <Tabs.Content
          value="myposts"
          w={'100%'}
          h={'100%'}
          overflow={'auto'}
          bg="white"
          borderRadius="20px"
          css={scrollbarStyle}
        >
          <MyPostsTab />
        </Tabs.Content>
        <Tabs.Content
          value="inquiry"
          h={'100%'}
          overflow={'auto'}
          bg="white"
          borderRadius="20px"
          css={scrollbarStyle}
        >
          <InquiryTab />
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  )
}
