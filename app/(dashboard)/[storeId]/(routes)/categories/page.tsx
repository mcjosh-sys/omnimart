import {format} from 'date-fns'

import prismadb from '@/lib/prismadb'
import { CategoryClient } from './components/client'
import { CategoryColumn } from './components/columns'
import Container from '@/components/ui/container'


const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
    
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

  return (
      <Container>
          <CategoryClient data={formattedCategories} />
     </Container>
  )
}

export default CategoriesPage