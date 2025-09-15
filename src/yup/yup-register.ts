import dayjs from 'dayjs'
import * as yup from 'yup'

import { AddressInfo } from '@/apis/generated/models/addressInfo'
import { RegisterAdditionalInfo } from '@/apis/generated/models/registerAdditionalInfo'
import { RegisterAdditionalInfoGender } from '@/apis/generated/models/registerAdditionalInfoGender'
import { RegisterUserRequestDto } from '@/apis/generated/models/registerUserRequestDto'
import { SnsInfo } from '@/apis/generated/models/snsInfo'
import { SnsInfoPlatform } from '@/apis/generated/models/snsInfoPlatform'
import { RegisterAdditionalInfoType } from '@/generated/apis/@types/data-contracts'
import { isBlank } from '@/utils/transformers'

import { passwordSchema } from './yup-common'

export const addressInfoSchema: yup.ObjectSchema<AddressInfo> = yup.object({
  country: yup.string().trim().required(),
  city: yup.string().trim().required(),
  address: yup.string().trim().required(),
  zipcode: yup.string().trim().required(),
})

export const snsInfoSchema: yup.ObjectSchema<SnsInfo> = yup.object({
  snsId: yup.string().trim().required(),
  platform: yup
    .string()
    .trim()
    .oneOf(Object.values(SnsInfoPlatform))
    .required(),
  otherPlatformName: yup
    .string()
    .trim()
    .when('platform', {
      is: (platform: SnsInfoPlatform) => platform === SnsInfoPlatform.OTHERS,
      then: (schema) => schema.required(),
      otherwise: (schema) =>
        schema
          .optional()
          .nullable()
          .transform(() => null),
    }),
})

export const registerAdditionalInfoSchema: yup.ObjectSchema<RegisterAdditionalInfo> =
  yup.object({
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

    snsInfo: yup
      .mixed()
      .when('isReceiveSeedingBox', {
        is: true,
        then: () => snsInfoSchema.required(), // 토글 on → 필수 + 내부 엄격 검증
        otherwise: () =>
          yup.lazy((v) =>
            isBlank(v) ?
              yup.mixed().strip().optional()
            : snsInfoSchema.optional(),
          ),
      })
      .transform((cur, orig) => (isBlank(orig) ? undefined : cur)),
  })

export type RegisterEssentialUserSchema = Omit<
  RegisterUserRequestDto,
  'additionalInfo'
>

export const registerEssentialUserSchema: yup.ObjectSchema<RegisterEssentialUserSchema> =
  yup.object({
    firstName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    birthDate: yup
      .string()
      .test('is-valid-date', 'Invalid date', (value) => {
        if (!value) return false
        const [year, month, day] = value.split('-').map(Number)

        if (year && month && day) {
          return dayjs(`${year}-${month}-${day}`).isValid()
        }

        return false
      })
      .required(),

    email: yup.string().trim().email().required(),
    emailToken: yup.string().required(),

    password: passwordSchema.required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required(),

    phoneCountryCode: yup.string().trim().required(),
    phoneNumber: yup
      .string()
      .trim()
      .min(10)
      .max(11)
      .matches(/^[0-9]+$/, 'Phone number must contain only numbers')
      .required(),

    isTermsAgreed: yup
      .boolean()
      .oneOf([true], 'You must agree to the terms of service')
      .required(),
    isPrivacyAgreed: yup
      .boolean()
      .oneOf([true], 'You must agree to the privacy policy')
      .required(),
  })

export type RegisterAdditionalUserSchema = RegisterAdditionalInfoType

export const registerAdditionalUserSchema: yup.ObjectSchema<RegisterAdditionalUserSchema> =
  yup.object({
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
  })
