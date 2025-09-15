import { Box, ButtonGroup, Center, Pagination, Text } from '@chakra-ui/react'

import { CaretLeftIcon, CaretRightIcon } from '@/generated/icons/MyIcons'
import { textStyles } from '@/generated/tokens/text-styles'

interface CustomPaginationProps {
  count: number
  pageSize: number
  defaultPage: number
  onPageChange: (page: number) => void
  size?: 'sm' | 'md' | 'lg'
}

export const CustomPagination = ({
  count,
  pageSize,
  defaultPage,
  onPageChange,
  size = 'md',
}: CustomPaginationProps) => {
  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={defaultPage}
      onPageChange={(e) => onPageChange(e.page)}
    >
      <ButtonGroup variant="ghost-grey" size={size}>
        <Pagination.PrevTrigger asChild>
          <IconButton size={size}>
            <CaretLeftIcon boxSize={size === 'sm' ? '18px' : '24px'} />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <NumButton
              isSelected={page.value === defaultPage}
              page={page.value}
              onPageChange={onPageChange}
              size={size}
            />
          )}
          ellipsis={<Box>...</Box>}
        />

        <Pagination.NextTrigger asChild>
          <IconButton size={size}>
            <CaretRightIcon boxSize={size === 'sm' ? '18px' : '24px'} />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

const BUTTON_SIZE = {
  sm: '32px',
  md: '40px',
  lg: '48px',
}

const TEXT_STYLE: Record<string, keyof typeof textStyles> = {
  sm: 'ko-caption-2',
  md: 'ko-body-6',
  lg: 'ko-body-6',
}
interface NumButtonProps {
  page: number
  size: 'sm' | 'md' | 'lg'
  isSelected: boolean
  onPageChange: (page: number) => void
}

const NumButton = ({
  page,
  size,
  isSelected,
  onPageChange,
}: NumButtonProps) => {
  return (
    <Center
      w={BUTTON_SIZE[size]}
      h={BUTTON_SIZE[size]}
      onClick={() => onPageChange(page)}
      cursor="pointer"
      borderRadius={size === 'lg' ? 'lg' : 'md'}
      bg={isSelected ? 'primary.4' : 'transparent'}
      color={isSelected ? 'grey.0' : 'grey.8'}
      _hover={{
        bg: 'grey-transparent.100',
        color: 'grey.8',
      }}
    >
      <Text textStyle={TEXT_STYLE[size]}>{page}</Text>
    </Center>
  )
}

const IconButton = ({
  children,
  size,
}: {
  children: React.ReactNode
  size: 'sm' | 'md' | 'lg'
}) => {
  return (
    <Center
      w={BUTTON_SIZE[size]}
      h={BUTTON_SIZE[size]}
      as="button"
      onClick={() => {}}
      cursor="pointer"
      borderRadius={size === 'lg' ? 'lg' : 'md'}
      _hover={{
        bg: 'grey-transparent.100',
      }}
    >
      {children}
    </Center>
  )
}
