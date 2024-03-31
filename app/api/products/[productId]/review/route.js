import Product from "@/models/productModel";

export async function PATCH(
    request,
    { params }
) {
    const {
        review
    } = await request.json()

    let alreadyReviewed;
    try {

        const product = await Product.findById(params.productId)
        console.log(product);

        if (product) {
            alreadyReviewed = product.reviews.find(x => x.user.toString() === review.user.toString())
            console.log(alreadyReviewed);
            if (alreadyReviewed) {

                return new Response('Product already reviewed', { status: 400 })
            } else {

                product.reviews.push(review)
                console.log(product);
                await product.save()
                return new Response(JSON.stringify(product.reviews), { status: 200 })
            }
        }

        // await connectDB(); // Connect to MongoDB
        // const existingProduct = await Product.findById(params.productId)
        // console.log(existingProduct);
        // if (!existingProduct) return new Response('existing product not found', { status: 404 })

        // existingProduct.reviews.push({
        //     user: review.user,
        //     comment: review.comment,
        //     rating: review.rating,
        //     name: review.name
        // })

        // await existingProduct.save()
        // return new Response(JSON.stringify(existingProduct), { status: 200 })
    } catch (error) {
        return new Response(`failed to update the product reviews ${product}`, { status: 500 })
    }
}