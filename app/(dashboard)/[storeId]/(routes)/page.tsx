import { Heading } from "@/components/ui/Heading"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { Separator } from "@/components/ui/separator"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, DollarSign, Package } from "lucide-react"
import { formatter } from "@/lib/utils"
import { getTotalRevenue } from "@/actions/get-total-revenue"
import { getSalesCount } from "@/actions/get-sales-count"
import { getStockCount } from "@/actions/get-stock-count"
import Overview from "@/components/overview"
import { getGraphRevenue } from "@/actions/get-graph-revenue"
import Container from "@/components/ui/container"

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {

  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if (!store) redirect('/')

  const totalRevenue = await getTotalRevenue(store.id)
  const salesCount = await getSalesCount(store.id)
  const stockCount = await getStockCount(store.id)
  const graphRevenue = await getGraphRevenue(store.id)
 

  return (
    <Container>
        <div className="space-y-4 pt-6">
          <Heading title="Dashboard" description="Overview of your store" />
          <Separator />
          <div className="grid gap-4 grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  {formatter.format(totalRevenue)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sales
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  +{salesCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Product In Stock
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">
                  {stockCount}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
        </div>
    </Container>
  )
}

export default DashboardPage