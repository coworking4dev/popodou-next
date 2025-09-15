import { Box, BoxProps } from '@chakra-ui/react'

interface CustomBadgeProps extends BoxProps {
  bg: string
  color: string
  label: string
}
export const CustomBadge = ({
  bg,
  color,
  label,
  ...props
}: CustomBadgeProps) => {
  return (
    <Box
      display="inline-flex"
      width="fit-content"
      alignItems="center"
      justifyContent="center"
      borderRadius="6px"
      px="6px"
      py="0"
      textStyle="ko-caption-1"
      bg={bg}
      color={color}
      {...props}
    >
      {label}
    </Box>
  )
}
