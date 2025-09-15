import * as yup from 'yup'

import { UpdateMyPageUserInfoRequestType } from '@/generated/apis/@types/data-contracts'
import { isBlank } from '@/utils/transformers'

import { addressInfoSchema, snsInfoSchema } from './yup-register'

export type ProfileEditAdditionalInfoSchema = Pick<
  UpdateMyPageUserInfoRequestType,
  'isReceiveSeedingBox' | 'addressInfo' | 'snsInfo'
>

export const profileEditAdditionalInfoSchema: yup.ObjectSchema<ProfileEditAdditionalInfoSchema> =
  yup.object({
    isReceiveSeedingBox: yup.boolean().default(false).required(),
    addressInfo: yup.mixed().when('isReceiveSeedingBox', {
      is: true,
      then: () => addressInfoSchema.required(), // 토글 on → 필수 + 내부 엄격 검증
      otherwise: () =>
        yup.lazy((v) =>
          isBlank(v) ?
            yup.mixed().strip().optional()
          : addressInfoSchema.optional(),
        ),
    }),
    snsInfo: yup.mixed().when('isReceiveSeedingBox', {
      is: true,
      then: () => snsInfoSchema.required(), // 토글 on → 필수 + 내부 엄격 검증
      otherwise: () =>
        yup.lazy((v) =>
          isBlank(v) ?
            yup.mixed().strip().optional()
          : snsInfoSchema.optional(),
        ),
    }),
  })
