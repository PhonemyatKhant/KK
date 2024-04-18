// import products from "@/utils/products";
import { connectDB } from "@/utils/db";
import Product from "@/models/productModel";
export async function GET(
    request,
    { params }
) {
    await connectDB(); // Connect to MongoDB
    const product = await Product.findById(params.productId)

    if (!product) return new Response('product not found', { status: 404 })

    return Response.json(product);
}
export async function PATCH(
    request,
    { params }
) {
    const {
        name,
        image,
        brand,
        category,
        description,
        price,
        discountPercentage,
        countInStock,
        isFeaturedProduct,
        isOnSale
    } = await request.json()
    
    try {
        await connectDB(); // Connect to MongoDB
        const existingProduct = await Product.findById(params.productId)
        //console.log(existingProduct);
        if (!existingProduct) return new Response('existing product not found', { status: 404 })

        existingProduct.name = name
        existingProduct.image = image
        existingProduct.brand = brand
        existingProduct.category = category
        existingProduct.description = description
        existingProduct.price = price
        existingProduct.discountPercentage = discountPercentage
        existingProduct.countInStock = countInStock
        existingProduct.isFeaturedProduct = isFeaturedProduct
        existingProduct.isOnSale = isOnSale

        await existingProduct.save()
        return new Response(JSON.stringify(existingProduct), { status: 200 })
    } catch (error) {
        return new Response('failed to update the product', { status: 500 })
    }
}
export async function DELETE(
    request,
    { params }
) {
    try {
        await connectDB()
        await Product.findByIdAndDelete(params.productId)
        return new Response('product deleted', { status: 200 })
    } catch (error) {
        return new Response('failed to delete the product', { status: 500 })
    }
}
