import { Button } from '@chakra-ui/react'

import { UseFormHandleSubmit } from 'react-hook-form'

import { showToast } from '@/components/ui/toaster'
import {
  QUERY_KEY_MY_PAGE_API_API,
  useUpdateMyPageProfileMutation,
} from '@/generated/apis/MyPageApi/MyPageApi.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

import { useProfileContext } from './ProfileContext'

export const EditTriggerButton = ({
  isEditMode,
  isDirty,
  toggleEditMode,
  onSubmit,
}: {
  isEditMode: boolean
  isDirty: boolean
  toggleEditMode: (isEditMode: boolean) => void
  onSubmit: UseFormHandleSubmit<any>
}) => {
  const invalidateProfile = useInvalidateQueries()

  const { mutateAsync: updateMyPageProfile, isPending } =
    useUpdateMyPageProfileMutation({
      options: {
        onSuccess: () => {
          invalidateProfile([QUERY_KEY_MY_PAGE_API_API.GET_MY_PAGE_PROFILE()])
        },
      },
    })

  const { profile, refetch } = useProfileContext()

  const onSave = async (e: any) => {
    if (!isDirty) {
      toggleEditMode(false)
      return
    }

    await updateMyPageProfile({
      data: {
        ...profile,
        ...e,
      },
    })
    console.log('refetch')
    refetch()

    showToast({
      type: 'success',
      description: 'Profile updated successfully',
    })
    toggleEditMode(false)
  }

  if (isEditMode) {
    return (
      <Button
        bg="primary.5"
        color="white"
        px={6}
        h="48px"
        borderRadius="10px"
        onClick={onSubmit(onSave)}
        loading={isPending}
      >
        Save
      </Button>
    )
  }

  return (
    <Button
      variant="outline-primary"
      px={6}
      h="48px"
      borderRadius="10px"
      onClick={() => toggleEditMode(true)}
    >
      Edit
    </Button>
  )
}
