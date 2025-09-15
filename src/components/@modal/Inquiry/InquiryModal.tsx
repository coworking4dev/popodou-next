import {
  Box,
  Button,
  Dialog,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'

import {
  INQUIRY_TYPE_OPTIONS,
  getInquiryTypeOptions,
} from '@/app/_source/helper/options'
import { CustomSelect } from '@/components/CustomSelect'
import { FormHelper } from '@/components/form-helper'
import { showToast } from '@/components/ui/toaster'
import {
  AddInquiryRequestDtoType,
  AddInquiryRequestDtoTypeEnumType,
} from '@/generated/apis/@types/data-contracts'
import {
  QUERY_KEY_INQUIRY_API_API,
  useAddInquiryMutation,
} from '@/generated/apis/InquiryApi/InquiryApi.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

import { BaseModalProps } from '../hooks/useAlert'

const addInquiryRequestDtoTypeSchema = yup.object({
  type: yup
    .string()
    .required()
    .label('Type')
    .oneOf(Object.values(INQUIRY_TYPE_OPTIONS)),
  title: yup.string().required().label('Title'),
  content: yup.string().required().label('Content'),
})

const inquiryTypeOptions = getInquiryTypeOptions()

export const InquiryModal = ({ isOpen, close }: BaseModalProps) => {
  const invalidateQueries = useInvalidateQueries()

  const { mutateAsync: addInquiry, isPending } = useAddInquiryMutation({})

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<AddInquiryRequestDtoType>({
    resolver: yupResolver(addInquiryRequestDtoTypeSchema),
  })

  const type = useWatch({ control, name: 'type' })

  const onSubmit = async (e: AddInquiryRequestDtoType) => {
    try {
      await addInquiry({
        data: {
          type: e.type,
          title: e.title,
          content: e.content,
        },
      })
      showToast({
        type: 'success',
        description: 'Successfully submitted.',
      })

      invalidateQueries(
        QUERY_KEY_INQUIRY_API_API.GET_MY_INQUIRY_LIST_INFINITE(),
      )

      close()
    } catch (e) {
      console.error(e)
      // if (e instanceof Response) {
      //   const data = await e.json()
      //   showToast({
      //     type: 'error',
      //     description: data.errorCode,
      //   })
      // }
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
            <Dialog.Title>
              <Text textStyle={'ko-heading-4'} color={'content.1'}>
                {'1:1 Inquiry'}
              </Text>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body p={'20px'}>
            <VStack gap={'20px'}>
              <FormHelper
                label={'Type'}
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
                <Box w={{ base: '100%', sm: '306px' }}>
                  <CustomSelect
                    value={type ? [type] : undefined}
                    placeholder={'Select Inquiry Type'}
                    optionHeader={'Inquiry Type'}
                    options={inquiryTypeOptions}
                    onValueChange={({ value }) => {
                      setValue(
                        'type',
                        value[0] as AddInquiryRequestDtoTypeEnumType,
                        { shouldValidate: true },
                      )
                    }}
                  />
                </Box>
              </FormHelper>
              <FormHelper
                label={'Title'}
                isRequired
                flexDir={{ base: 'column', sm: 'row' }}
                w={'100%'}
                styles={{
                  label: {
                    textStyle: 'ko-caption-1',
                  },
                }}
                justifyContent={'space-between'}
              >
                <Input
                  w={{ base: '100%', sm: '306px' }}
                  textStyle={'ko-body-6'}
                  placeholder={'Enter a title (max 50 characters)'}
                  maxLength={50}
                  {...register('title')}
                />
              </FormHelper>

              <FormHelper
                label={'Content'}
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
                    'Enter your inquiry details (max 1,000 characters)'
                  }
                  maxLength={1000}
                  {...register('content')}
                />
              </FormHelper>
            </VStack>
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
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
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
