import { Box, Text, VStack } from '@chakra-ui/react'
import { UploadSimpleIcon } from '@phosphor-icons/react/dist/ssr'

export const ImageUploadEmptyView = ({
  onUpload,
}: {
  onUpload: () => void
}) => {
  return (
    <Box
      w="100%"
      h="160px"
      bg="white"
      border="2px dashed"
      borderColor="grey.3"
      borderRadius="12px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="12px"
      cursor="pointer"
      onClick={onUpload}
      _hover={{
        borderColor: 'grey.4',
        bg: 'grey.0',
      }}
      transition="all 0.2s"
    >
      <Box
        w="40px"
        h="40px"
        bg="secondary.2"
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <UploadSimpleIcon size={24} color="grey.8" />
      </Box>
      <VStack gap="2px" textAlign="center">
        <Text textStyle="ko-caption-1" color="grey.9">
          Upload an image (You can attach up to 10 images.)
        </Text>
        <Text textStyle="ko-caption-2" color="grey.8">
          Supported formats: jpg, jpeg, png
        </Text>
      </VStack>
    </Box>
  )
}
