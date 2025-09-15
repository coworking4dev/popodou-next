import { useState } from 'react'

import {
  Button,
  Center,
  Dialog,
  HStack,
  Text,
  Textarea,
} from '@chakra-ui/react'

import { FormHelper } from '@/components/form-helper'
import { showToast } from '@/components/ui/toaster'
import { useReportCommunityPostsMutation } from '@/generated/apis/CommunityPostApi/CommunityPostApi.query'

import { BaseModalProps } from '../hooks/useAlert'

export const PostReportModal = ({
  isOpen,
  postId,
  close,
}: BaseModalProps<{ postId: number }>) => {
  const { mutateAsync: reportCommunityPosts, isPending } =
    useReportCommunityPostsMutation({})

  const [reportReason, setReportReason] = useState<string>()

  const onReport = async () => {
    try {
      await reportCommunityPosts({
        data: {
          postId,
          reason: reportReason ?? '',
        },
      })

      showToast({
        type: 'success',
        description: 'Reported successfully',
      })

      close()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={close}>
      <Dialog.Backdrop bg={'grey.transparent.5'} />
      <Dialog.Positioner px={{ base: '20px', sm: '0px' }}>
        <Dialog.Content
          minW={{ base: '320px', sm: '480px' }}
          borderRadius={'8px'}
          p={'0px'}
          gap={'0px'}
        >
          <Dialog.Header p={'16px 20px'} alignItems={'start'}>
            <Text textStyle={'ko-heading-4'} color={'content.1'}>
              {'Why are you reporting this post?'}
            </Text>
          </Dialog.Header>

          <Dialog.Body p={'20px'}>
            <Center flexDirection={'column'} gap={'8px'}></Center>
            <FormHelper
              label={'Reason'}
              isRequired
              flexDir={{ base: 'column', sm: 'row' }}
              w={'100%'}
              justifyContent={'space-between'}
              styles={{
                label: {
                  textStyle: 'ko-caption-1',
                },
              }}
            >
              <Textarea
                h={'140px'}
                w={{ base: '100%', sm: '306px' }}
                placeholder={
                  'Please briefly describe why you are reporting this post. (Up to 500 characters allowed)'
                }
                maxLength={500}
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              />
            </FormHelper>
          </Dialog.Body>

          <Dialog.Footer>
            <HStack w={'100%'} gap={'12px'}>
              <Button
                w={'100%'}
                size={'lg'}
                onClick={() => {
                  close()
                }}
                color={'grey.8'}
                variant={'solid-grey'}
                textStyle={'eng-body-05'}
              >
                {'Cancel'}
              </Button>
              <Button
                loading={isPending}
                w={'100%'}
                variant={'solid-primary'}
                size={'lg'}
                onClick={async () => {
                  await onReport()
                }}
                textStyle={'eng-body-05'}
              >
                {'Submit'}
              </Button>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
