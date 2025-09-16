import dayjs from 'dayjs'
import * as yup from 'yup'

export const passwordSchema = yup
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(20, 'Password must be at most 20 characters long')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
    'Password must contain at least one letter, one number, and one special character',
  )

export const passwordConfirmSchema = yup
  .string()
  .oneOf([yup.ref('password')], "Passwords don't match.")
  .required('Please confirm your password')

export const birthDateSchema = yup
  .string()
  .test('is-valid-date', 'Invalid date', (value) => {
    if (!value) return false
    const [year, month, day] = value.split('-').map(Number)

    if (year && month && day) {
      const birthDate = dayjs(`${year}-${month}-${day}`)
      return birthDate.isValid()
    }
    return false
  })
  .test('is-valid-age', 'You must be 14+ to create an account.', (value) => {
    if (!value) return false
    const [year, month, day] = value.split('-').map(Number)

    if (year && month && day) {
      const birthDate = dayjs(`${year}-${month}-${day}`)
      const age = dayjs().diff(birthDate, 'year')
      return age >= 14
    }

    return false
  })
  .required('Birth date is required.')

export const phoneNumberSchema = yup
  .string()
  .trim()
  .matches(/^[0-9]+$/, 'Enter a valid phone number.')
  .test('phone-length', 'Enter a valid phone number.', function (value) {
    if (!value) return false

    const phoneCountryCode = this.parent.phoneCountryCode

    // Define expected lengths for each country code
    const phoneLengths: Record<string, number[]> = {
      '+213': [9], // Algeria
      '+32': [9], // Belgium
      '+20': [10], // Egypt
      '+33': [10], // France
      '+49': [11, 12], // Germany
      '+353': [9], // Ireland
      '+39': [10], // Italy
      '+82': [10, 11], // Korea, South
      '+352': [9], // Luxembourg
      '+377': [8], // Monaco
      '+212': [9], // Morocco
      '+31': [9], // Netherlands
      '+351': [9], // Portugal
      '+34': [9], // Spain
      '+216': [8], // Tunisia
      '+44': [10, 11], // United Kingdom
    }

    const expectedLengths = phoneLengths[phoneCountryCode]
    if (expectedLengths) {
      return expectedLengths.includes(value.length)
    }

    // Default fallback for other countries
    return value.length >= 7 && value.length <= 15
  })
  .required('Enter a valid phone number.')
