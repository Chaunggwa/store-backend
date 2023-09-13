import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    {params}: {params: {productId: string}}
) {
    try {
        
        
        if(!params.productId) {
            return new NextResponse("product id is required", {status: 400})
        }

        
        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true
            }
        })

        return NextResponse.json(product);
    } catch (error) {
        console.log('[Product_GET]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}

export async function PATCH(
    req: Request,
    {params}: {params: {productId: string, storeId: string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json();

        const {name, price, categoryId, sizeId, colorId, images, isFeatured, isArchived} = body;
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
            return new NextResponse("Product image or images are required", {status: 400});
           }

        if(!params.productId) {
            return new NextResponse("product ID is required", {status: 400})
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

        await prismadb.product.update({
            where: {
                id: params.productId,
            }, 
            data: {
                name,
            price,
            categoryId,
            colorId,
            sizeId,
            images: {
                deleteMany: {

                }
            },
            isFeatured,
            isArchived,
            }
        })

        const product = await prismadb.product.update({
            where: {
                id: params.productId
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: {url: string}) => image)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_PATCH]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}


export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string, productId: string}}
) {
    try {
        const {userId} = auth();
       

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

       

        if(!params.storeId) {
            return new NextResponse("Store id is required", {status: 400})
        }
        
        if(!params.productId) {
            return new NextResponse("product id is required", {status: 400})
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
           try {
            // Find the product by ID and include its images
            const product = await prismadb.product.findUnique({
              where: { id: params.productId },
              include: { images: true },
            });
      
            if (!product) {
              return NextResponse.json({ error: "Product not found" });
            }
      
            // Delete the associated images first
            for (const image of product.images) {
              await prismadb.image.delete({
                where: { id: image.id },
              });
            }
      
            // Now, delete the product
            await prismadb.product.delete({
              where: { id: params.productId },
            });
      
            return NextResponse.json({ message: "Product and associated images deleted successfully" });
          } catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Internal server error" });
          }
    } catch (error) {
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}