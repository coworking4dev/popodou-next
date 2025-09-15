import { overlay } from 'overlay-kit'

import { ResetPasswordModal } from './ResetPasswordModals'
import { WithdrawAccountModal } from './WithdrawAccountModal'

export const useAccountModals = () => {
  const openWithdrawModal = () => {
    overlay.open(({ close, isOpen }) => (
      <WithdrawAccountModal isOpen={isOpen} close={close} />
    ))
  }

  const openResetPasswordModal = (
    onConfirm?: (
      currentPassword: string,
      newPassword: string,
    ) => Promise<void> | void,
  ) => {
    overlay.open(({ close, isOpen }) => (
      <ResetPasswordModal isOpen={isOpen} close={close} onConfirm={onConfirm} />
    ))
  }

  return {
    openWithdrawModal,
    openResetPasswordModal,
  }
}
