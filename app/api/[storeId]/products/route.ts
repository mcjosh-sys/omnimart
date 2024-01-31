import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
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

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams: s } = new URL(req.url);
    const categoryId = s.get("categoryId") || undefined;
    const colorId = s.get("colorId") || undefined;
    const sizeId = s.get("sizeId") || undefined;
    const isFeatured = s.get("isFeatured");

    if (!params.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const product = await prismadb.product.findMany({
      where: {
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured
          ? isFeatured === "true"
            ? true
            : isFeatured === "false"
            ? false
            : undefined
          : undefined,
        isArchived: false,
        storeId: params.storeId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
