import * as yup from 'yup'

import { passwordSchema } from './yup-common'

export type LoginSchema = {
  email: string
  password: string
}

export const loginSchema: yup.ObjectSchema<LoginSchema> = yup.object({
  email: yup.string().email().required(),
  password: passwordSchema.required(),
})
