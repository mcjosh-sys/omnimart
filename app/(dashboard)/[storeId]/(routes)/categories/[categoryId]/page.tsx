import prismadb from '@/lib/prismadb'
import React from 'react'
import { CategoryForm } from './components/category-form'
import Container from '@/components/ui/container'

const CategoryPage = async ({ params }: { params: { categoryId: string, storeId: string } }) => {
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    })
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })


  return (
      <Container>
          <CategoryForm initialData={category} billboards={billboards} />
      </Container>
  )
}

export default CategoryPage