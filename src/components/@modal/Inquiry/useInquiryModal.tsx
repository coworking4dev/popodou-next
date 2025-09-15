import { overlay } from 'overlay-kit'

import { InquiryModal } from './InquiryModal'

export const useInquiryModals = () => {
  const openInquiryModal = () => {
    overlay.open(({ close, isOpen }) => (
      <InquiryModal isOpen={isOpen} close={close} />
    ))
  }

  return {
    openInquiryModal,
  }
}
