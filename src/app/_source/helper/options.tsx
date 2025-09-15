import { sortBy } from 'lodash'

import { COUNTRY_NUMBER_OPTIONS } from '@/constants/country'
import { AddInquiryRequestDtoTypeEnumType } from '@/generated/apis/@types/data-contracts'

export const getCountryPhoneCodeOptions = () => {
  return [
    { label: 'Algeria (+213)', value: '+213' },
    { label: 'Belgium (+32)', value: '+32' },
    { label: 'Egypt (+20)', value: '+20' },
    { label: 'France (+33)', value: '+33' },
    { label: 'Germany (+49)', value: '+49' },
    { label: 'Ireland (+353)', value: '+353' },
    { label: 'Italy (+39)', value: '+39' },
    { label: 'Korea, South (+82)', value: '+82' },
    { label: 'Luxembourg (+352)', value: '+352' },
    { label: 'Monaco (+377)', value: '+377' },
    { label: 'Morocco (+212)', value: '+212' },
    { label: 'Netherlands (+31)', value: '+31' },
    { label: 'Portugal (+351)', value: '+351' },
    { label: 'Spain (+34)', value: '+34' },
    { label: 'Tunisia (+216)', value: '+216' },
    { label: 'United Kingdom (+44)', value: '+44' },
    { label: 'Others', value: 'others' },
  ]
}

export const getCountryOptions = () => {
  return sortBy(COUNTRY_NUMBER_OPTIONS, 'label_en', 'desc').map((option) => ({
    label: option.code,
    value: option.value,
  }))
}

export const INQUIRY_TYPE_OPTIONS: Record<
  string,
  AddInquiryRequestDtoTypeEnumType
> = {
  POPUP: 'POPUP',
  EVENT_PLACE: 'EVENT_PLACE',
  SITE_USAGE: 'SITE_USAGE',
  ERROR_REPORT: 'ERROR_REPORT',
  OTHER: 'OTHER',
} as const

export const getInquiryTypeOptions = (): {
  label: string
  value: AddInquiryRequestDtoTypeEnumType
}[] => {
  return [
    { label: 'Popup', value: INQUIRY_TYPE_OPTIONS.POPUP },
    { label: 'Event/Spaces', value: INQUIRY_TYPE_OPTIONS.EVENT_PLACE },
    { label: 'Site Usage', value: INQUIRY_TYPE_OPTIONS.SITE_USAGE },
    { label: 'Error Report', value: INQUIRY_TYPE_OPTIONS.ERROR_REPORT },
    { label: 'Other', value: INQUIRY_TYPE_OPTIONS.OTHER },
  ]
}
