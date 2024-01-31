import { format } from 'date-fns'

import prismadb from '@/lib/prismadb'
import { BillboardClient } from './components/client'
import { BillboardColumn } from './components/columns'
import Container from '@/components/ui/container'


const BilboardsPage = async ({ params }: { params: { storeId: string } }) => {

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')

    }))

    return (
        <Container>
            <BillboardClient data={formattedBillboards} />
        </Container>
    )
}

export default BilboardsPage