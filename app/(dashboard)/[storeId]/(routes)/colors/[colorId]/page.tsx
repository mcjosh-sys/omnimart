import prismadb from '@/lib/prismadb'
import React from 'react'
import { ColorForm } from './components/color-form'
import Container from '@/components/ui/container'

const ColorPage = async ({ params }: { params: { colorId: string, storeId: string } }) => {
    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId,
            storeId: params.storeId
        }
    })

  return (
      <Container>
          <ColorForm initialData={color} />
      </Container>
  )
}

export default ColorPage