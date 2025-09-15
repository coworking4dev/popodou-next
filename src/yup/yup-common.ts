import * as yup from 'yup'

export const passwordSchema = yup
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(20, 'Password must be at most 20 characters long')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
    'Password must contain at least one letter, one number, and one special character',
  )
