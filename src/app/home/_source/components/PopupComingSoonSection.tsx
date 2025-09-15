'use client'

import { PopupGridSection } from '@/components/home/PopupGridSection'
import { useGetThisMonthPopupQuery } from '@/generated/apis/HomeApi/HomeApi.query'

export const PopupComingSoonSection = () => {
  const { data: thisMonthPopup } = useGetThisMonthPopupQuery()

  const popups = thisMonthPopup?.data

  return (
    <PopupGridSection
      title="Pop-ups Coming Soon"
      popups={popups || []}
      containerProps={{
        pb: { base: '80px', sm: '120px', md: '80px' },
        pt: { base: '80px', md: '120px' },
        px: { base: '20px', sm: '40px', md: '0px' },
        maxW: '1440px',
      }}
    />
  )
}
