import Product from "@/models/productModel";
import { connectDB } from "@/utils/db";

export const POST = async (request) => {
    const { name,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
        isFeaturedProduct } = await request.json();

    try {
        await connectDB();
        const newProduct = new Product({
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            isFeaturedProduct
        });

        await newProduct.save();
        return new Response(JSON.stringify(newProduct), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new product", { status: 500 });
    }
}
