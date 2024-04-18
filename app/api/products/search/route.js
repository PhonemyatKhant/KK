// import products from "@/utils/products";
import { connectDB } from "@/utils/db";
import Product from "@/models/productModel";
export async function GET(req) {

    const page = req.nextUrl.searchParams.get('p') || 1

    const productsPerPage = 8
    // const count = await Product.countDocuments()

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const userInput = req.nextUrl.searchParams.get('query') || "" // Example user input
    const escapedUserInput = escapeRegExp(userInput);
    const regexPattern = new RegExp(`${escapedUserInput.trim()}`, 'i');

    try {
        await connectDB(); // Connect to MongoDB

        const products = await Product.find({
            $or: [
                { name: { $regex: regexPattern } },
                { brand: { $regex: regexPattern } },
                { category: { $regex: regexPattern } }
            ]
        }).skip((page - 1) * productsPerPage).limit(productsPerPage)
        const count = products.length
        return new Response(JSON.stringify({ products, page, pages: Math.ceil(count / productsPerPage) }), {
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

