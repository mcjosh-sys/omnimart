import prismadb from '@/lib/prismadb'
import React from 'react'
import { BillboardForm } from './components/billboard-form'
import Container from '@/components/ui/container'

const BillboardPage = async ({ params }: { params: { billboardId: string } }) => {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })

  return (
      <Container>
          <BillboardForm initialData={billboard} />
      </Container>
  )
}

export default BillboardPage