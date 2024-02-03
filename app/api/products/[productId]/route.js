import products from "@/utils/products";

export async function GET(
    request,
    { params }
) {
    const product = products.find((product) => product.id === params.productId);

    if (!product) {
        return Response.json("hello");
    }

    return Response.json(product);
}
