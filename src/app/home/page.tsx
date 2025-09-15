import { Box } from '@chakra-ui/react'

import { IntroduceHeroSection } from './_source/components/IntroduceHeroSection'
import { MostLikedPopupSection } from './_source/components/MostLikedPopupSection'
import { PopupByCategorySection } from './_source/components/PopupByCategorySection'
import { PopupComingSoonSection } from './_source/components/PopupComingSoonSection'
import { PopupStoriesSection } from './_source/components/PopupStoriesSection'

export default function HomePage() {
  return (
    <Box>
      <IntroduceHeroSection />
      <MostLikedPopupSection />
      <PopupComingSoonSection />
      <PopupByCategorySection />
      <PopupStoriesSection />
    </Box>
  )
}
