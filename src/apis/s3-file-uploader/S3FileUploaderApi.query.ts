import { useMutation } from '@tanstack/react-query'
import {
  assertItemOf,
  createS3UploadFlow,
  removeStr,
} from '@toktokhan-dev/universal'

import { presignedApiApi } from '@/generated/apis/PresignedApi/PresignedApi.query'
// import { presignedUrlApi } from '@/generated/apis/PresignedUrl/PresignedUrl.query'
import { UseMutationParams } from '@/types/module/react-query/use-mutation-params'

import { S3FileUploaderApi } from './S3FileUploaderApi'

const s3FileUploaderApi = new S3FileUploaderApi({})

export const { uploadFile, uploadFiles } = createS3UploadFlow({
  prepareUpload: async (file: File) => {
    const { name, type } = file
    const [mime] = type.split('/').map((v) => v.toUpperCase())

    assertItemOf(
      ['IMAGE', 'AUDIO', 'TEXT', 'VIDEO', 'APPLICATION'] as const,
      mime,
    )

    const { data } = await presignedApiApi.createPresignedUrl({
      data: {
        fileName: name,
        fileType: mime,
        fieldChoices: 'POST',
      },
    })

    const formData = new FormData()
    if (data) {
      Object.entries(data).forEach(([k, v]) => formData.append(k, v as string))
      formData.append('Content-Type', file.type)
      formData.append('file', file)

      return {
        url: data.url as string,
        formData,
        fields: data.fields,
        file,
      }
    }
    return {
      url: '',
      formData: new FormData(),
      fields: {} as Record<string, string>,
      file,
    }
  },
  uploadFileToS3: async ({
    url,
    file,
    fields,
  }: {
    url: string
    formData: FormData
    file: any
    fields: any
  }) => {
    await s3FileUploaderApi.uploadFileToS3({ url, file })
    const removeMedia = removeStr(/\/?_media\//g)
    const fullUrl = new URL(url)

    return {
      /**
       * file 의 s3 full url 입니다.
       */
      url: `${fullUrl.origin}${fullUrl.pathname}`,
      /**
       * 파일의 s3 path 입니다. 똑개 서버로 image 경로를 업로드 할 때 사용됩니다.
       * 똑똑한 개발자의 서버는 s3 파일의 경로를 단순 string 으로 저장하지 않고, 특별한 field 로 구분하여 저장하기 때문에,
       * 이후 서버로 요청 할때 해당 path 값을 사용하여 요청을 보내야 합니다.
       *
       * 특별한 field 로 구분하여 저장 하는 이유는 admin 페이지의 file field 구분, 파일의 실 사용 여부를 판단하기 위해 사용됩니다.
       */
      path: removeMedia(fields.key),
      fields,
      file,
    }
  },
})

export const useUploadFileToS3Mutation = (
  params?: UseMutationParams<typeof uploadFile>,
) => {
  return useMutation({
    mutationFn: uploadFile,
    ...params?.options,
  })
}

export const useUploadFilesToS3Mutation = (
  params?: UseMutationParams<typeof uploadFiles>,
) => {
  return useMutation({
    mutationFn: uploadFiles,
    ...params?.options,
  })
}
