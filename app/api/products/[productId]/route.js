// import products from "@/utils/products";
import { connectDB } from "@/utils/db";
import Product from "@/models/productModel";
export async function GET(
    request,
    { params }
) {
    await connectDB(); // Connect to MongoDB
    const products = await Product.find()
    
    const product = products.find((product) => product._id == params.productId);

    if (!product) {
        return Response.json("hello");
    }

    return Response.json(product);
}
