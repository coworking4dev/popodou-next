// 문의 타입을 한글로 변환하는 함수
export const getInquiryTypeLabel = (type: string): string => {
  switch (type) {
    case 'POPUP':
      return 'Pop-ups'
    case 'EVENT_PLACE':
      return 'Event/Spaces'
    case 'SITE_USAGE':
      return 'Site Usage'
    case 'ERROR_REPORT':
      return 'Error Report'
    case 'OTHER':
      return 'Other'
    default:
      return type
  }
}

// 상태를 한글로 변환하는 함수
export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'Pending'
    case 'ANSWERED':
      return 'Answered'
    default:
      return status
  }
}

// 상태에 따른 배지 색상과 배경색
export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'ANSWERED':
      return {
        bg: '#e0ffeb',
        color: '#22a04c',
      }
    case 'PENDING':
      return {
        bg: '#eaebec',
        color: '#6a6d71',
      }
    default:
      return {
        bg: '#eaebec',
        color: '#6a6d71',
      }
  }
}
