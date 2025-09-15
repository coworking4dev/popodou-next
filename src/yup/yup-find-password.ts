import * as yup from 'yup'

import { passwordSchema } from './yup-common'

export type FindPasswordSchema = {
  email: string
}

export const findPasswordSchema: yup.ObjectSchema<FindPasswordSchema> =
  yup.object({
    email: yup.string().email().required(),
  })

export const resetPasswordSchema = yup.object({
  password: passwordSchema.required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required(),
})

export type ResetPasswordSchema = yup.InferType<typeof resetPasswordSchema>
