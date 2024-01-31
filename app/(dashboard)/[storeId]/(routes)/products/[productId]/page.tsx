import prismadb from '@/lib/prismadb'
import React from 'react'
import { ProductForm } from './components/product-form'
import Container from '@/components/ui/container'

const ProductPage = async ({ params }: { params: { productId: string, storeId: string } }) => {
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
           images: true
        },
    })

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        }
    })

  return (
      <Container>
          <ProductForm
              initialData={product}
              categories={categories}
              colors={colors}
              sizes={sizes}
          />
      </Container>
  )
}

export default ProductPage