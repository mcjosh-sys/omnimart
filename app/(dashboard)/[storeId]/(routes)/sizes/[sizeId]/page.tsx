import prismadb from '@/lib/prismadb'
import React from 'react'
import { SizeForm } from './components/size-form'
import Container from '@/components/ui/container'

const SizePage = async ({ params }: { params: { sizeId: string, storeId: string } }) => {
    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId,
            storeId: params.storeId
        }
    })

    return (
        <Container>
            <SizeForm initialData={size} />
        </Container>
    )
}

export default SizePage