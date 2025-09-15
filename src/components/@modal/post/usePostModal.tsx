import { overlay } from 'overlay-kit'

import { PostReportModal } from './PostReportModal'

export const usePostModal = () => {
  const openPostReportModal = (postId: number) => {
    overlay.open(({ close, isOpen }) => (
      <PostReportModal postId={postId} close={close} isOpen={isOpen} />
    ))
  }

  return {
    openPostReportModal,
  }
}
