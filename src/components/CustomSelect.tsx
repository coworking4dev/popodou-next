'use client'

import type React from 'react'
import { useState } from 'react'

import {
  Box,
  Center,
  HStack,
  Portal,
  Select,
  type SelectRootProps,
  Text,
  createListCollection,
  useSelectContext,
} from '@chakra-ui/react'

import { CaretDownIcon, XIcon } from '@/generated/icons/MyIcons'

type Option = { value: string; label: string }
type GroupedOption = { groupLabel: string; items: Option[] }
type Options = (Option | GroupedOption)[]

const ChipItem = ({ item }: { item: Option | undefined }) => {
  const { value, setValue } = useSelectContext()
  if (!item) return null

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation()
        const currentValue = Array.isArray(value) ? value : []
        setValue(currentValue.filter((v: string) => v !== item.value))
      }}
      display="flex"
      gap="4px"
      alignItems="center"
      px="6px"
      py="2px"
      borderRadius="6px"
      bg="gray.200"
      _dark={{ bg: 'gray.600' }}
      fontSize="sm"
      whiteSpace={'nowrap'}
    >
      {item.label}
      <XIcon boxSize="12px" fontWeight={'bold'} cursor="pointer" />
    </Box>
  )
}

const SelectMultipleValueText = ({
  options,
  placeholder,
}: {
  options: Options
  placeholder?: string
}) => {
  const { value } = useSelectContext()

  const safeValue = Array.isArray(value) ? value : []

  if (safeValue.length === 0) {
    return <Select.ValueText placeholder={placeholder} />
  }

  const allItems = options.flatMap((opt) => ('items' in opt ? opt.items : opt))

  return (
    <Center maxW={'85%'} h={'100%'} overflowX={'auto'}>
      <Select.ValueText maxW={'100%'} overflow={'visible'}>
        <HStack gap={'4px'}>
          {safeValue.map((v: string) => {
            const item = allItems.find((item) => item.value === v)
            return <ChipItem item={item} key={v} />
          })}
        </HStack>
      </Select.ValueText>
    </Center>
  )
}

// 재사용 가능한 CustomSelect 컴포넌트 Props 정의
interface CustomSelectProps
  extends Omit<SelectRootProps, 'collection' | 'children'> {
  options: Options
  label?: string
  indicator?: React.ReactNode
  placeholder?: string
  optionHeader?: string
  clearable?: boolean
}

// 메인 CustomSelect 컴포넌트
export function CustomSelect({
  options,
  label,
  placeholder,
  multiple,
  indicator,
  value,
  optionHeader,
  disabled,
  clearable = true,
  ...rest
}: CustomSelectProps) {
  const isGrouped = options.some((opt) => 'groupLabel' in opt)
  const collection = createListCollection({ items: options })

  const [open, setOpen] = useState<boolean>(false)

  return (
    <Select.Root
      collection={collection}
      multiple={multiple}
      value={value}
      minW={{ base: '100px', sm: '140px' }}
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      disabled={disabled}
      {...rest}
    >
      <Select.HiddenSelect />
      {label && <Select.Label>{label}</Select.Label>}
      <Select.Control>
        <Select.Trigger>
          {multiple ?
            <SelectMultipleValueText
              options={options}
              placeholder={placeholder}
            />
          : <Select.ValueText placeholder={placeholder} textAlign={'start'} />}
        </Select.Trigger>

        <Select.IndicatorGroup>
          {clearable && !disabled && value && open && <Select.ClearTrigger />}
          <Select.Indicator>
            {indicator || (
              <CaretDownIcon
                boxSize="16px"
                color={value ? 'grey.10' : 'grey.5'}
                transform={open ? 'rotate(180deg)' : 'rotate(0deg)'}
                transition={'transform 0.2s ease'}
              />
            )}
          </Select.Indicator>
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner minW={'fit-content'} maxW={'80vw'}>
          <Select.Content minW={'fit-content'}>
            {optionHeader && (
              <Box w="100%" p={'10px 12px'} pb={'2px'}>
                <Text
                  w="100%"
                  textStyle={'ko-caption-2'}
                  color={'grey.5'}
                  textAlign={'left'}
                >
                  {optionHeader}
                </Text>
              </Box>
            )}
            {isGrouped ?
              options.map((group, index) =>
                'groupLabel' in group ?
                  <Select.ItemGroup key={index + group.groupLabel}>
                    <Select.ItemGroupLabel>
                      {group.groupLabel}
                    </Select.ItemGroupLabel>
                    {group.items.map((item) => (
                      <Select.Item
                        item={item}
                        key={`${item.value}-${item.label}`}
                      >
                        <Select.ItemText>{item.label}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.ItemGroup>
                : null,
              )
            : options.map((item) =>
                'value' in item ?
                  <Select.Item
                    overflowWrap={'anywhere'}
                    item={item}
                    key={`${item.value}-${item.label}`}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                  >
                    {item.label}
                  </Select.Item>
                : null,
              )
            }
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
