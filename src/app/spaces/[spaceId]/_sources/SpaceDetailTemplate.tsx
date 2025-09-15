'use client'

import { useMemo } from 'react'

import { Box, Container, Text, VStack } from '@chakra-ui/react'

import { If } from '@/components/If'
import { ImageAsNext } from '@/components/image-as-next'
import { GetPlaceResponseDtoType } from '@/generated/apis/@types/data-contracts'

import { EditorContentBlock } from './components/EditorContentBlock'
import { SpaceGalleryList } from './components/SpaceGalleryList'
import { SpaceInfoLine } from './components/SpaceInfoLine'

interface Props {
  space: GetPlaceResponseDtoType
}

export const SpaceDetailTemplate = ({ space }: Props) => {
  const photos = useMemo(() => {
    return space.photos.filter((v) => !!v.url)
  }, [space.photos])

  const booths = useMemo(() => {
    return space.booths.filter((v) => !!v.url)
  }, [space.booths])

  return (
    <Box
      width="100%"
      pb={{ base: '80px', sm: '120px' }}
      px={{ base: '20px', sm: '40px', md: '0px' }}
    >
      <Container maxW="1440px" px="0">
        <VStack
          align="stretch"
          gap={{ base: '28px', sm: '40px' }}
          w={'100%'}
          pt={{ base: '20px', md: '56px' }}
        >
          <ImageAsNext
            src={space.mainImage.url || ''}
            alt={space.title}
            height={'calc(80vh - 176px)'}
            objectFit={'cover'}
            w={'100%'}
          />

          <SpaceInfoLine space={space} />
          <Box height="1px" bg="grey.3" />
          <EditorContentBlock content={space.detailPage || ''} />
          <Box height="1px" bg="grey.3" />
          <If condition={photos.length > 0}>
            <Box>
              <VStack gap="20px" align="stretch">
                <Text
                  textStyle="eng-heading-1"
                  color="grey.10"
                  fontSize={'32px'}
                >
                  Photos
                </Text>
                <SpaceGalleryList photos={photos} />
              </VStack>
            </Box>
          </If>
          <Box height="1px" bg="grey.3" />
          <If condition={booths.length > 0}>
            <Box>
              <VStack gap="20px" align="stretch">
                <Text
                  textStyle="eng-heading-1"
                  color="grey.10"
                  fontSize={'32px'}
                >
                  Booths
                </Text>
                <SpaceGalleryList photos={booths} />
              </VStack>
            </Box>
          </If>
        </VStack>
      </Container>
    </Box>
  )
}
