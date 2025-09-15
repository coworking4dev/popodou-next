'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box, Dialog, HStack, Text, Textarea, VStack } from '@chakra-ui/react'
import { CaretUpIcon } from '@phosphor-icons/react/dist/ssr'

import { logout } from '@/actions/logout'
import { FormHelper } from '@/components/form-helper'
import { Button } from '@/components/ui/button'
import { showToast } from '@/components/ui/toaster'
import { useDeleteUserMutation } from '@/generated/apis/UserApi/UserApi.query'

import { BaseModalProps } from '../hooks/useAlert'

export const WithdrawAccountModal = ({ isOpen, close }: BaseModalProps) => {
  const router = useRouter()
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const { mutateAsync: deleteUser } = useDeleteUserMutation({})

  const handleSubmit = async () => {
    if (!reason.trim()) return

    setLoading(true)
    try {
      await deleteUser({
        id: 'me',
        data: {
          reason,
        },
      })
      logout()

      showToast({
        type: 'success',
        description:
          'Your account has been successfully deleted. Thank you for using Popodoo.',
      })
      close()
    } catch (error) {
      console.error('계정 삭제 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const isSubmitDisabled = !reason.trim() || loading

  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Backdrop bg={'grey.transparent.5'} />
      <Dialog.Positioner px={{ base: '20px', sm: '0px' }}>
        <Dialog.Content
          minW={{ base: '320px', sm: '540px' }}
          borderRadius={'8px'}
          p={'0px'}
          gap={'0px'}
          bg="background.basic.1"
        >
          {/* Header */}
          <Dialog.Header p={'16px 20px'} alignItems={'start'}>
            <Dialog.Title>
              <Text textStyle={'ko-heading-4'} color={'content.1'}>
                Delete Account
              </Text>
            </Dialog.Title>
          </Dialog.Header>

          {/* Body */}
          <Dialog.Body
            p={'20px'}
            gap={'20px'}
            display={'flex'}
            flexDirection={'column'}
          >
            <VStack gap={'4px'} align={'start'} w={'100%'}>
              <FormHelper label="Withdrawal Reason" isRequired w={'100%'}>
                <Textarea
                  placeholder="Please enter your reason for leaving (up to 1,000 characters)."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  maxLength={1000}
                  h={'224px'}
                  w={'100%'}
                  resize={'none'}
                  bg={'background.basic.1'}
                  border={'1px solid'}
                  borderColor={'grey.2'}
                  borderRadius={'10px'}
                  p={'12px'}
                  _focus={{
                    borderColor: 'primary.5',
                    boxShadow: 'none',
                  }}
                  _placeholder={{
                    color: 'grey.5',
                    textStyle: 'ko-body-6',
                  }}
                  textStyle={'ko-body-6'}
                  color={'content.1'}
                />
              </FormHelper>
            </VStack>

            {/* Withdrawal Notice */}
            <VStack gap={'8px'} align={'start'} w={'100%'}>
              <Box
                w={'100%'}
                p={'8px 0px'}
                borderColor={'grey.2'}
                cursor={'pointer'}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <HStack justify={'space-between'} align={'center'}>
                  <Text textStyle={'ko-caption-1'} color={'grey.10'}>
                    Please review the following before withdrawing.
                  </Text>
                  <Box
                    w={'16px'}
                    h={'16px'}
                    transform={isExpanded ? 'rotate(0deg)' : 'rotate(180deg)'}
                    transition="transform 0.2s"
                  >
                    <CaretUpIcon />
                  </Box>
                </HStack>
              </Box>

              <Box
                w={'100%'}
                overflow={'auto'}
                maxHeight={isExpanded ? { base: '100px', md: '300px' } : '0px'}
                transition="max-height 0.3s ease-in-out, opacity 0.3s ease-in-out"
                opacity={isExpanded ? 1 : 0}
              >
                <VStack gap={'12px'} align={'start'} w={'100%'} pt={'8px'}>
                  <VStack gap={'8px'} align={'start'} w={'100%'}>
                    <Text
                      textStyle={'ko-caption-1'}
                      color={'grey.10'}
                      fontWeight={'semibold'}
                    >
                      Posts and Comments
                    </Text>
                    <Text textStyle={'ko-caption-2'} color={'grey.8'}>
                      Any posts or comments created by the member cannot be
                      arbitrarily deleted after account withdrawal.
                    </Text>
                    <Text textStyle={'ko-caption-2'} color={'grey.8'}>
                      Accordingly, if you wish to have them removed, you must
                      delete them yourself prior to withdrawal.
                    </Text>
                  </VStack>

                  <VStack gap={'8px'} align={'start'} w={'100%'}>
                    <Text
                      textStyle={'ko-caption-1'}
                      color={'grey.10'}
                      fontWeight={'semibold'}
                    >
                      Retention of Personal Information
                    </Text>
                    <Text textStyle={'ko-caption-2'} color={'grey.8'}>
                      Upon account withdrawal, personal information will be
                      promptly destroyed. However, certain information may be
                      retained for the period prescribed by applicable laws and
                      regulations, including but not limited to:
                    </Text>
                    <VStack gap={'4px'} align={'start'} w={'100%'} pl={'12px'}>
                      <Text textStyle={'ko-caption-2'} color={'grey.8'}>
                        <Text
                          as={'span'}
                          fontWeight={'semibold'}
                          color={'grey.10'}
                        >
                          Act on the Consumer Protection in Electronic Commerce
                        </Text>
                        : Records of contracts and cancellations (5 years),
                        records of payment and supply of goods (5 years),
                        records of consumer complaints and dispute resolution (3
                        years)
                      </Text>
                      <Text textStyle={'ko-caption-2'} color={'grey.8'}>
                        Protection of Communications Secrets Act: Access logs (3
                        months)
                      </Text>
                      <Text textStyle={'ko-caption-2'} color={'grey.8'}>
                        Any other information required to be retained pursuant
                        to relevant laws and regulations
                      </Text>
                    </VStack>
                  </VStack>

                  <VStack gap={'8px'} align={'start'} w={'100%'}>
                    <Text
                      textStyle={'ko-caption-1'}
                      color={'grey.10'}
                      fontWeight={'semibold'}
                    >
                      Processing Records
                    </Text>
                    <Text textStyle={'ko-caption-2'} color={'grey.8'}>
                      Upon expiration of the statutory retention period, such
                      information will be securely destroyed. Following account
                      withdrawal, your personal information will no longer be
                      accessible or available for use.
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </VStack>
          </Dialog.Body>

          {/* Footer */}
          <Dialog.Footer p={'16px 20px 20px'} gap={'0px'}>
            <HStack w={'100%'} gap={'8px'}>
              <Button
                w={'100%'}
                size={'lg'}
                variant={'solid-grey'}
                onClick={close}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                w={'100%'}
                size={'lg'}
                variant={'solid-primary'}
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                loading={loading}
                opacity={isSubmitDisabled ? 0.4 : 1}
              >
                Submit
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
