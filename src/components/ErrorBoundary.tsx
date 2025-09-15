'use client'

import { Component, ReactNode } from 'react'

import { Button, Flex, Text } from '@chakra-ui/react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Global Error Boundary:', error, errorInfo)

    // 404 관련 에러인지 확인
    if (
      error.message.includes('404') ||
      error.message.includes('Not Found') ||
      error.message.includes('POST_NOT_FOUND') ||
      error.message.includes('SPACE_NOT_FOUND') ||
      error.message.includes('USER_NOT_FOUND')
    ) {
      // not-found 페이지로 리다이렉트
      window.location.href = '/not-found'
      return
    }

    // 인증 관련 에러
    if (
      error.message.includes('401') ||
      error.message.includes('UNAUTHORIZED') ||
      error.message.includes('AUTH_REQUIRED')
    ) {
      // 로그인 페이지로 리다이렉트
      window.location.href = '/login'
      return
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/home'
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Flex
          flex={1}
          h="100vh"
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          gap={4}
          p={4}
        >
          <Text textStyle={'ko-heading-1'} textAlign={'center'}>
            앗! 문제가 발생했습니다
          </Text>
          <Text textStyle={'ko-body-2'} color={'grey.8'} textAlign={'center'}>
            예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </Text>
          {this.state.error && (
            <Text
              textStyle={'ko-body-3'}
              color={'grey.6'}
              textAlign={'center'}
              fontFamily={'monospace'}
              bg={'grey.1'}
              p={2}
              borderRadius={'md'}
              maxW={'500px'}
              wordBreak={'break-all'}
            >
              {this.state.error.message}
            </Text>
          )}
          <Flex gap={3} mt={4} flexWrap={'wrap'} justify={'center'}>
            <Button variant={'outline-grey'} onClick={this.handleRetry}>
              다시 시도
            </Button>
            <Button variant={'solid-primary'} onClick={this.handleGoHome}>
              홈으로 가기
            </Button>
          </Flex>
        </Flex>
      )
    }

    return this.props.children
  }
}
