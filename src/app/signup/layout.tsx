import { PageLayout } from '@/components/@layout/page-layout'
import { zIndex } from '@/configs/theme/tokens/z-index'

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PageLayout
      hideFooter
      headerProps={{
        zIndex: zIndex.max.value,
      }}
      containerProps={{
        position: 'relative',
      }}
    >
      {children}
    </PageLayout>
  )
}
