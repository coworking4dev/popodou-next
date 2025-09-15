import { Center, CenterProps, Spinner } from '@chakra-ui/react'

interface Props extends CenterProps {
  children: React.ReactNode
  loading: boolean
}

export const LoadingWrapper = ({ loading, children, ...props }: Props) => {
  if (!loading) {
    return children
  }

  return (
    <Center w="100%" h="100%" bg="transparent" {...props}>
      <Spinner />
    </Center>
  )
}
