// import products from "@/utils/products";
import { connectDB } from "@/utils/db";
import Product from "@/models/productModel";
export async function GET() {

    try {
        await connectDB(); // Connect to MongoDB
        const products = await Product.find()
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Response("Failed to fetch products", { status: 500 });
    }
}
