/**
 * Sitemap 생성을 위한 유틸리티 함수들
 * 실제 API에서 데이터를 가져와 동적 라우트를 생성할 때 사용
 */
import { loungeApiApi } from '@/generated/apis/LoungeApi/LoungeApi.query'
import { magazineApiApi } from '@/generated/apis/MagazineApi/MagazineApi.query'
import { placeApiApi } from '@/generated/apis/PlaceApi/PlaceApi.query'
import { popupApiApi } from '@/generated/apis/PopupApi/PopupApi.query'

// 팝업 ID 목록을 가져오는 함수
export async function getPopupIds(): Promise<string[]> {
  try {
    const response = await popupApiApi.getPopupList({
      query: {
        pageSize: 1000, // 모든 팝업을 가져오기 위해 큰 값 설정
        status: 'IN_PROGRESS',
      },
    })

    if (response?.data?.data) {
      return response.data.data.map((popup) => String(popup.popupId))
    }
    return []
  } catch (error) {
    console.error('Failed to fetch popup IDs:', error)
    return []
  }
}

// 라운지 게시글 ID 목록을 가져오는 함수
export async function getLoungePostIds(): Promise<string[]> {
  try {
    const response = await loungeApiApi.getAllLoungeFeed({
      query: {
        pageSize: 1000, // 모든 라운지 게시글을 가져오기 위해 큰 값 설정
        filter: 'ALL',
      },
    })

    if (response?.data?.data) {
      return response.data.data
        .filter((item) => item.type === 'LOUNGE') // LOUNGE 타입만 필터링
        .map((post) => String(post.id))
    }
    return []
  } catch (error) {
    console.error('Failed to fetch lounge post IDs:', error)
    return []
  }
}

// 스페이스 ID 목록을 가져오는 함수 (Place API 사용)
export async function getSpaceIds(): Promise<string[]> {
  try {
    const response = await placeApiApi.getPlaceList({
      query: {
        pageSize: 1000, // 모든 스페이스를 가져오기 위해 큰 값 설정
      },
    })

    if (response?.data?.data) {
      return response.data.data.map((place) => String(place.placeId))
    }
    return []
  } catch (error) {
    console.error('Failed to fetch space IDs:', error)
    return []
  }
}

// 저널 ID 목록을 가져오는 함수 (Magazine API 사용)
export async function getJournalIds(): Promise<string[]> {
  try {
    const response = await magazineApiApi.getMagazineList({
      query: {
        pageSize: 1000, // 모든 매거진을 가져오기 위해 큰 값 설정
      },
    })

    if (response?.data?.data) {
      return response.data.data
        .filter((magazine) => magazine.magazineId) // magazineId가 존재하는 것만 필터링
        .map((magazine) => String(magazine.magazineId))
    }
    return []
  } catch (error) {
    console.error('Failed to fetch journal IDs:', error)
    return []
  }
}

// 최근 수정된 콘텐츠의 날짜를 가져오는 함수
// 현재는 API에서 날짜 정보를 가져오는 대신 현재 날짜를 반환합니다.
// 실제 운영에서는 각 콘텐츠의 lastModified 날짜를 API에서 가져와 사용할 수 있습니다.
export async function getLastModifiedDate(
  type: 'popup' | 'lounge' | 'space' | 'journal',
  id: string,
): Promise<Date> {
  try {
    // 실제 구현 시에는 각 API에서 lastModified 날짜를 가져와 사용
    // 현재는 sitemap 빌드 시간을 기준으로 설정
    return new Date()
  } catch (error) {
    console.error(
      `Failed to fetch last modified date for ${type}:${id}:`,
      error,
    )
    return new Date()
  }
}
