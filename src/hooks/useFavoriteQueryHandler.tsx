import { useRouter } from 'next/navigation'

import { InfiniteData } from '@tanstack/react-query'

import { showToast } from '@/components/ui/toaster'
import { getQueryClient } from '@/configs/react-query/get-query-client'
import { ROUTES } from '@/constants/routes'
import {
  GetPopupListParamsOrderEnumType,
  GetPopupListParamsStatusEnumType,
  MosLikedPopupDetailResponseType,
  PopupResponseDtoType,
  ResponseDTOCursorPopupResponseDtoType,
  ResponseDTOGetPopupResponseDtoType,
  ResponseDTOListThisMonthPopupResponseType,
  ResponseDTOMostLikedPopupResponseType,
  ThisMonthPopupResponseType,
} from '@/generated/apis/@types/data-contracts'
import { QUERY_KEY_HOME_API_API } from '@/generated/apis/HomeApi/HomeApi.query'
import {
  QUERY_KEY_POPUP_API_API,
  useAddPopupFavoriteMutation,
} from '@/generated/apis/PopupApi/PopupApi.query'
import { clientCookie } from '@/stores/cookie/store'

export const useFavoriteQueryHandler = () => {
  const router = useRouter()
  const { mutateAsync: addPopupFavorite } = useAddPopupFavoriteMutation({})

  const onChangePopupLike = async (
    popupId: number,
    isLike: boolean,
    {
      query,
    }: {
      query?: {
        category?: number
        status?: GetPopupListParamsStatusEnumType
        order?: GetPopupListParamsOrderEnumType
      }
    },
  ) => {
    const queryClient = getQueryClient()

    const isLoggedIn =
      clientCookie.get('accessToken') && clientCookie.get('refreshToken')

    if (!isLoggedIn) {
      router.push(ROUTES.LOGIN + '?redirect=' + window.location.href)
      showToast({
        type: 'error',
        description: 'You need to log in to save this item.',
      })
      return
    }

    queryClient.setQueryData(
      QUERY_KEY_HOME_API_API.GET_MOST_LIKED_POPUP(),
      (old: ResponseDTOMostLikedPopupResponseType) => {
        if (!old) return old
        return {
          ...old,
          data: {
            ...old.data,
            list: old.data?.list?.map(
              (item: MosLikedPopupDetailResponseType) =>
                item.popupId === popupId ? { ...item, isLike: isLike } : item,
            ),
          },
        }
      },
    )

    queryClient.setQueryData(
      QUERY_KEY_HOME_API_API.GET_THIS_MONTH_POPUP(),
      (old: ResponseDTOListThisMonthPopupResponseType | undefined) => {
        if (!old) return old
        return {
          ...old,
          data: old.data?.map((item: ThisMonthPopupResponseType) =>
            item.popupId === popupId ? { ...item, isLike: isLike } : item,
          ),
        }
      },
    )

    queryClient.setQueryData(
      QUERY_KEY_POPUP_API_API.GET_POPUP_LIST({
        query: {
          category: query?.category,
        },
      }),
      (old: ResponseDTOCursorPopupResponseDtoType | undefined) => {
        if (!old) return old
        return {
          ...old,
          data: {
            ...old.data,
            data: old.data?.data?.map((item: PopupResponseDtoType) =>
              item.popupId === popupId ? { ...item, isLike: isLike } : item,
            ),
          },
        }
      },
    )

    queryClient.setQueryData(
      QUERY_KEY_POPUP_API_API.GET_POPUP_LIST_INFINITE({
        query: {
          category: query?.category,
          status: query?.status,
          order: query?.order,
        },
      }),
      (old: InfiniteData<ResponseDTOCursorPopupResponseDtoType>) => {
        if (!old) return old

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: page.data?.data?.map((item: PopupResponseDtoType) =>
                item.popupId === popupId ? { ...item, isLike: isLike } : item,
              ),
            },
          })),
        }
      },
    )

    queryClient.setQueryData(
      QUERY_KEY_POPUP_API_API.GET_POPUP({
        popupId: popupId,
      }),
      (old: ResponseDTOGetPopupResponseDtoType) => {
        if (!old) return old
        console.log(old)
        console.log(isLike)
        return {
          ...old,
          data: {
            ...old.data,
            isLike: isLike,
          },
        }
      },
    )

    // 서버에 업데이트 요청
    try {
      await addPopupFavorite({
        popupId: popupId,
        query: {
          isLike: isLike,
        },
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY_POPUP_API_API.GET_POPUP_LIST(),
      })

      if (isLike) {
        showToast({
          type: 'success',
          description: 'Saved! You can check it in My Page > Saved Items.',
          closeButton: false,
          action: {
            label: '[View Saved Items]',
            onClick: () => {
              router.push(ROUTES.MY_PAGE + '?tab=favorites')
            },
          },
        })
      }
    } catch (error) {
      // 에러 발생 시 원래 값으로 롤백
      queryClient.setQueryData(
        QUERY_KEY_POPUP_API_API.GET_POPUP_LIST_INFINITE({
          query: {
            category: query?.category,
            status: query?.status,
            order: query?.order,
          },
        }),
        (old: InfiniteData<ResponseDTOCursorPopupResponseDtoType>) => {
          if (!old) return old

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                data: page.data?.data?.map((item) =>
                  item.popupId === popupId ?
                    { ...item, isLike: !isLike } // 원래 값으로 롤백
                  : item,
                ),
              },
            })),
          }
        },
      )
      queryClient.setQueryData(
        QUERY_KEY_POPUP_API_API.GET_POPUP({
          popupId: popupId,
        }),
        (old: ResponseDTOGetPopupResponseDtoType) => {
          if (!old) return old
          return {
            ...old,
            data: {
              ...old.data,
              isLike: !isLike,
            },
          }
        },
      )
      queryClient.setQueryData(
        QUERY_KEY_HOME_API_API.GET_MOST_LIKED_POPUP(),
        (old: ResponseDTOMostLikedPopupResponseType) => {
          if (!old) return old
          return {
            ...old,
            data: {
              ...old.data,
              list: old.data?.list?.map(
                (item: MosLikedPopupDetailResponseType) =>
                  item.popupId === popupId ?
                    { ...item, isLike: !isLike }
                  : item,
              ),
            },
          }
        },
      )

      // 에러 토스트 표시
      showToast({
        type: 'error',
        description: 'Failed to update favorite status. Please try again.',
      })
    }
  }

  //   const onChangeCommunityPostsLike = async (
  //     isLike: boolean,
  //   ) => {
  //     await addCommunityPostsLike({
  //       postId: post.postId,
  //       query: { isLike: !isLike },
  //     })
  //   }

  return { onChangePopupLike }
}
