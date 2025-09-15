import { overlay } from 'overlay-kit'

import { GalleryModal } from './GalleryModal'

export const useGalleryModal = () => {
  const openGalleryModal = (props: { images: string[]; index: number }) => {
    overlay.open(({ close, isOpen }) => (
      <GalleryModal {...props} close={close} isOpen={isOpen} />
    ))
  }

  return {
    openGalleryModal,
  }
}
