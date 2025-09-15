import { Grid, GridItem } from '@chakra-ui/react'

import { useGalleryModal } from '@/components/@modal/gallery/useGalleryModal'
import { ImageAsNext } from '@/components/image-as-next'
import { GetPlaceResponseDtoType } from '@/generated/apis/@types/data-contracts'

export const SpaceGalleryList = ({
  photos,
}: {
  photos: GetPlaceResponseDtoType['photos']
}) => {
  const { openGalleryModal } = useGalleryModal()

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap="20px"
      w={'100%'}
    >
      {photos
        .filter((v) => !!v.url)
        .map((photo, index) => (
          <GridItem
            key={index}
            cursor="pointer"
            onClick={() =>
              openGalleryModal({
                images: photos.map((p) => p.url || '').filter((v) => !!v),
                index,
              })
            }
          >
            <ImageAsNext
              src={photo.url || ''}
              alt={`Photo ${index + 1}`}
              objectFit={'cover'}
              width={'auto'}
              height={'200px'}
              fill
            />
          </GridItem>
        ))}
    </Grid>
  )
}
