import { PageLayout } from '@/components/@layout/page-layout'

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PageLayout hideFooter>{children}</PageLayout>
}
