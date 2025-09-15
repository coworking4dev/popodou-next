import { overlay } from 'overlay-kit'

import { GetReservationOptionsType } from '@/generated/apis/@types/data-contracts'

import { PopupOptionModal } from './PopupOptionModal'

export const usePopupModals = () => {
  const openProgramSelectionModal = (
    programs: GetReservationOptionsType[],
    onProgramSelect?: (program: GetReservationOptionsType) => void,
  ) => {
    overlay.open(({ close, isOpen }) => (
      <PopupOptionModal
        isOpen={isOpen}
        close={close}
        programs={programs}
        onProgramSelect={onProgramSelect}
      />
    ))
  }

  return {
    openProgramSelectionModal,
  }
}
