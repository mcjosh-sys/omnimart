import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    if (!params.productId)
      return new NextResponse("product id is required", { status: 400 });

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = await req.json();

    if (!name)
      return new NextResponse("Product name is required", { status: 400 });
    if (!price)
      return new NextResponse("Product price is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("Category id is required", { status: 400 });
    if (!sizeId)
      return new NextResponse("Size id is required", { status: 400 });
    if (!colorId)
      return new NextResponse("Color id is required", { status: 400 });
    if (!images || !images.length)
      return new NextResponse("Color id is required", { status: 400 });

    if (!params.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    if (!params.productId)
      return new NextResponse("product id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId!,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    await prismadb.product.update({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
          isArchived,
          images: {
            deleteMany: {}
        }
      },
    });
      
      const product = await prismadb.product.update({
          where: {
              id: params.productId,
              storeId: params.storeId
          },
          data: {
              images: {
                  createMany: {
                      data: [...images]
                  }
              }
          }
      })

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    if (!params.productId)
      return new NextResponse("product id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
