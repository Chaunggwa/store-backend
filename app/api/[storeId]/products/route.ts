import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, 
    {params}: {params: {storeId: string}}
    ) {
    try {
       const {userId} = auth(); 
       const body = await req.json();
       const { name, price, categoryId, sizeId, colorId, images, isFeatured, isArchived } = body;
       if(!userId) {
        return new NextResponse("Unauthenticated", {status: 401});
       }

       if(!name) {
        return new NextResponse("Product name is required", {status: 400});
       }
       
       if(!price) {
        return new NextResponse("Price is required", {status: 400});
       }
       
       if(!categoryId) {
        return new NextResponse("Category ID is required", {status: 400});
       }
       if(!colorId) {
        return new NextResponse("Color ID is required", {status: 400});
       }
       if(!sizeId) {
        return new NextResponse("Size ID is required", {status: 400});
       }
       
       if(!images || !images.length) {
        console.log("Image error");
        return new NextResponse("Product image or images are required", {status: 400});
       }

	
       if(!params.storeId) {
        return new NextResponse("storeId is required", {status: 400});
       }

       

       const storeByUserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
       })

       if(!storeByUserId) {
        return new NextResponse("Unauthorized access", {status: 403});
       }

       const product = await prismadb.product.create({
        data: {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images: {
                createMany: {
                    data: [
                        ...images.map((image: {url: string}) => image)
                    ]
                }
            },
            isFeatured,
            isArchived,
            storeId: params.storeId
        }
       });
       console.log(product)
       return NextResponse.json(product);

    } catch (error) {
        console.log('[PRODUCT_POST]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}

export async function GET(req: Request, 
    {params}: {params: {storeId: string}}
    ) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const isFeatured = searchParams.get("isFeatured");

     	console.log(categoryId);
       if(!params.storeId) {
        return new NextResponse("storeId is required", {status: 400});
       }

       const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
            categoryId,
            colorId,
            sizeId,
            isFeatured: isFeatured ? true : undefined,
            isArchived: false
        },
        include: {
            images: true,
            category: true,
            color: true,
            size: true
        },
        orderBy: {
            createdAt: "desc"
        }
       });
       console.log(products);
       return NextResponse.json(products);

    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("GET Error", {status: 500});
    }
}
