// import products from "@/utils/products";
import { connectDB } from "@/utils/db";
import Product from "@/models/productModel";
export async function GET(req) {
    const page = req.nextUrl.searchParams.get('p') || 1

    const productsPerPage = 8

    try {
        await connectDB(); 

        const count = await Product.countDocuments()
        const products = await Product.find().skip((page - 1) * productsPerPage).limit(productsPerPage);
        return new Response(JSON.stringify({ products, page, pages: Math.ceil(count / productsPerPage) }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}

