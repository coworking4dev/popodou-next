'use client'

import { Tabs, TabsList, TabsTrigger, Text } from '@chakra-ui/react'

import { CategoryInfoType } from '@/generated/apis/@types/data-contracts'

interface CategoryTabsProps {
  categories: CategoryInfoType[]
  activeCategoryId: string
  onCategoryChange: (category: number) => void
}

export const CategoryTabs = ({
  categories,
  activeCategoryId,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <Tabs.Root
      value={activeCategoryId}
      onValueChange={(details) => onCategoryChange(Number(details.value))}
    >
      <TabsList gap="2" height="48px" width="100%" border="none">
        {categories.map((category) => (
          <TabsTrigger
            key={category.categoryId}
            value={category.categoryId?.toString() ?? ''}
            _selected={{
              color: 'grey.10',
            }}
            color="grey.7"
            transition="all 0.2s"
          >
            <Text textStyle={'ko-body-1'}>{category.categoryName}</Text>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs.Root>
  )
}
