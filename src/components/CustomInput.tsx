import { forwardRef, useEffect, useState } from 'react'

import {
  Flex,
  HStack,
  IconButton,
  IconButtonProps,
  Input,
  InputGroup,
  InputProps,
} from '@chakra-ui/react'

import { EyeIcon, EyeSlashIcon, XIcon } from '@/generated/icons/MyIcons'

interface CustomInputProps extends InputProps {
  size?: 'sm' | 'md' | 'lg'
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ type, size, value, onChange, ...props }, ref) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [inputValue, setInputValue] = useState(value || '')
    const [isFocused, setIsFocused] = useState(false)

    const handleShowPassword = () => {
      setIsShowPassword(!isShowPassword)
    }

    const inputType =
      type === 'password' ?
        isShowPassword ? 'text'
        : 'password'
      : type

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      setInputValue('')
      if (onChange) {
        const event = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      onChange?.(e)
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = () => {
      setIsFocused(false)
    }

    useEffect(() => {
      setInputValue(value || '')
    }, [value])

    return (
      <InputGroup
        w={'100%'}
        endElement={
          <HStack gap={'8px'}>
            {isFocused && inputValue && (
              <ClearIconButton onClick={handleClear} />
            )}

            {type === 'password' && (
              <EyeIconButton
                size={size}
                isShowPassword={isShowPassword}
                onClick={handleShowPassword}
              />
            )}
          </HStack>
        }
      >
        <Input
          {...props}
          ref={ref}
          size={size}
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </InputGroup>
    )
  },
)

CustomInput.displayName = 'CustomInput'

interface EyeIconProps extends IconButtonProps {
  size?: 'sm' | 'md' | 'lg'
  isShowPassword: boolean
  onClick?: () => void
}

const sizeMap = {
  sm: '12px',
  md: '16px',
  lg: '20px',
} as const

const EyeIconButton = ({
  size = 'md',
  isShowPassword,
  onClick,
}: EyeIconProps) => {
  return (
    <Flex as={'button'} onClick={onClick}>
      {!isShowPassword ?
        <EyeIcon boxSize={sizeMap[size]} cursor={'pointer'} color={'grey.7'} />
      : <EyeSlashIcon
          boxSize={sizeMap[size]}
          cursor={'pointer'}
          color={'grey.7'}
        />
      }
    </Flex>
  )
}

interface ClearIconProps extends IconButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ClearIconButton = ({ onClick }: ClearIconProps) => {
  return (
    <IconButton
      borderRadius={'full'}
      boxSize={'20px'}
      bg={'grey.3'}
      aria-label="Clear input"
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.(e)
      }}
    >
      <XIcon boxSize={'12px'} color={'grey.7'} />
    </IconButton>
  )
}
