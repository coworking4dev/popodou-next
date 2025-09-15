import { PageLayout } from '@/components/@layout/page-layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>
}
