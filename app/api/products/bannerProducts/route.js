
import { connectDB } from "@/utils/db";
import Product from "@/models/productModel";
export async function GET(req) {

    try {
        await connectDB(); // Connect to MongoDB
        // const count = await Product.countDocuments()
        const newArrivals = await Product.find().sort({ _id: -1 }).limit(5);
        const onSaleItems = await Product.find({ isOnSale: true }).limit(5);
        return new Response(JSON.stringify({ newArrivals, onSaleItems }), {
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

