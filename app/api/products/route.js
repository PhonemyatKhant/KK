// import products from "@/utils/products";
import { connectDB } from "@/utils/db";
import Product from "@/models/productModel";
export async function GET(req) {
    console.log(req.nextUrl.searchParams.get('p'), 'req');
    // const { page = 1, pageSize = 10 } = req.query;
    const page = req.nextUrl.searchParams.get('p') || 0
    const productsPerPage = 5

    try {
        await connectDB(); // Connect to MongoDB
        const products = await Product.find().skip(page * productsPerPage).limit(productsPerPage);
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
