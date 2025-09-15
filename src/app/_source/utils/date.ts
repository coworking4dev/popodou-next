import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export const formatCommentTime = (localDateTime: string): string => {
  const commentDate = dayjs.utc(localDateTime).tz(dayjs.tz.guess())
  const now = dayjs().tz(dayjs.tz.guess())

  const hoursDiff = now.diff(commentDate, 'hour')

  if (hoursDiff < 24) {
    return commentDate.fromNow()
  } else {
    return commentDate.format('MMMM D, YYYY')
  }
}

// 시간대만 내려올때 포메팅 함수

export const formatLocalTime = (time?: string) => {
  if (!time) {
    return undefined
  }

  return time.split(':').splice(0, 2).join(':')
}

export const formatDateRange = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) {
    return undefined
  }
  return `${dayjs(startDate).format('MMMM DD[th]')} – ${dayjs(endDate).format('MMMM DD[th], YYYY')}`
}

export const formatTimeRange = (openTime?: string, closeTime?: string) => {
  console.log(openTime, closeTime)

  if (!openTime && !closeTime) {
    return undefined
  }

  if (!openTime) {
    return `~ ${closeTime}`
  }

  if (!closeTime) {
    return `${openTime} ~`
  }
  return `${openTime} ~ ${closeTime}`
}
