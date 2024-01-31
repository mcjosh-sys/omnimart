import {format} from 'date-fns'

import prismadb from '@/lib/prismadb'
import { OrderClient } from './components/client'
import { OrderColumn } from './components/columns'
import Container from '@/components/ui/container'


const SizesPage = async ({ params }: { params: { storeId: string } }) => {
    
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        email: item.email,
        address: item.address,
        products: item.orderItems.map(orderItem => orderItem.product.name).join(', '),
        totalPrice: item.orderItems.reduce((total, item) => total + Number(item.product.price), 0),
        isPaid: item.isPaid,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

  return (
      <Container>
          <OrderClient data={formattedOrders} />
      </Container>
  )
}

export default SizesPage