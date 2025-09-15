'use client'

import { useEffect, useRef, useState } from 'react'

import { Input, InputProps, Text } from '@chakra-ui/react'

import { InputGroup } from './input-group'

const useTimer = ({
  initialMinutes,
  initialSeconds,
  onTimerEnd,
}: {
  initialMinutes: number
  initialSeconds: number
  onTimerEnd: () => void
}) => {
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(initialSeconds)

  const interval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    interval.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1)
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1)
          setSeconds(59)
        }
      }
    }, 1000)

    if (seconds === 0 && minutes === 0) {
      clearInterval(interval.current)
      onTimerEnd()
    }

    return () => clearInterval(interval.current)
  }, [minutes, seconds])

  return {
    restartTimer: () => {
      setMinutes(initialMinutes)
      setSeconds(initialSeconds)
    },
    clearTimer: () => {
      clearInterval(interval.current)
    },
    minutes,
    seconds,
  }
}

interface Props extends InputProps {
  onTimerEnd: () => void
  verified?: boolean
}

export const VerifiedCodeInput = ({
  onTimerEnd,
  verified,
  ...props
}: Props) => {
  const { minutes, seconds, clearTimer } = useTimer({
    initialMinutes: 3,
    initialSeconds: 0,
    onTimerEnd,
  })

  useEffect(() => {
    if (verified) {
      clearTimer()
    }
  }, [verified])

  return (
    <InputGroup
      clearable={false}
      endOffset={'-10px'}
      endElement={
        !verified ?
          <Text textStyle={'ko-body-6'} color={'grey.5'}>
            {minutes}:{seconds < 10 ? '0' : ''}
            {seconds}
          </Text>
        : null
      }
      w={'100%'}
    >
      <Input {...props} />
    </InputGroup>
  )
}
