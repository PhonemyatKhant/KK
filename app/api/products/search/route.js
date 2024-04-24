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

    const userInput = req.nextUrl.searchParams.get('query') || ""
    const brand = req.nextUrl.searchParams.get('brand') || ""
    const category = req.nextUrl.searchParams.get('category') || ""
    const toggleState = req.nextUrl.searchParams.get('viewOOS') || false

    console.log(brand, category);

    const escapedUserInput = escapeRegExp(userInput);
    const escapedBrandInput = escapeRegExp(brand);
    const escapedCategoryInput = escapeRegExp(category);

    const regexPattern = new RegExp(`${escapedUserInput.trim()}`, 'i');
    const regexPatternBrand = new RegExp(`${escapedBrandInput.trim()}`, 'i');
    const regexPatternCategory = new RegExp(`${escapedCategoryInput.trim()}`, 'i');

    try {
        await connectDB(); // Connect to MongoDB

        const query = {
            $and: [
                {
                    $or: [
                        { name: { $regex: regexPattern } },
                        { brand: { $regex: regexPattern } },
                        { category: { $regex: regexPattern } }
                    ]
                },
                { category: { $regex: regexPatternCategory } },
                { brand: { $regex: regexPatternBrand } },
                { price: { $lte: 10000 } },

            ]
        }
        // Check if the toggle is ON
        const viewOutOfStock = toggleState === 'true'

        if (viewOutOfStock === false) {
            query["$and"].push({ "countInStock": { "$not": { "$eq": 0 } } });
        }
        const products = await Product.find(query).skip((page - 1) * productsPerPage).limit(productsPerPage)
        const count = await Product.find(query).countDocuments()
        console.log(Math.ceil(count / productsPerPage));
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

