import * as yup from 'yup'

import { RegisterAdditionalInfoGender } from '@/apis/generated/models/registerAdditionalInfoGender'
import { OauthRegisterAdditionalInfoType } from '@/generated/apis/@types/data-contracts'
import { isBlank } from '@/utils/transformers'

import { birthDateSchema, phoneNumberSchema } from './yup-common'
import { addressInfoSchema, snsInfoSchema } from './yup-register'

export const registerSocialUserSchema: yup.ObjectSchema<OauthRegisterAdditionalInfoType> =
  yup.object({
    firstName: yup
      .string()
      .trim()
      .max(64, 'First name must be less than 64 characters')
      .required('First name is required.'),
    lastName: yup
      .string()
      .trim()
      .max(64, 'Last name must be less than 64 characters')
      .required('Last name is required.'),
    birthDate: birthDateSchema,
    phoneCountryCode: yup.string().required(),
    phoneNumber: phoneNumberSchema,
    nickname: yup
      .string()
      .trim()
      .max(20, 'Nickname must be less than 20 characters')
      .required('Nickname is required'),
    gender: yup
      .string()
      .oneOf(Object.values(RegisterAdditionalInfoGender))
      .required(),
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
    isTermsAgreed: yup
      .boolean()
      .oneOf([true], 'You must agree to the terms of service')
      .required(),
    isPrivacyAgreed: yup
      .boolean()
      .oneOf([true], 'You must agree to the privacy policy')
      .required(),
  })
