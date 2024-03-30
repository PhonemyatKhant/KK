import { connectDB } from "@/utils/db";
import Order from "@/models/orderModel";


export async function GET(
    request,
    { params }
) {
    console.log(params.orderId,'hello');
    await connectDB(); // Connect to MongoDB
    const order = await Order.findById(params.orderId)

    if (!order) return new Response('order not found', { status: 404 })

    return Response.json(order);
}
export async function PATCH(
    request,
    { params }
) {
    const {
        isPaid,
        isDelivered,
        orderId
    } = await request.json()

    try {
        await connectDB(); // Connect to MongoDB
        // const existingOrder = await Order.findById(params.orderId)
        const existingOrder = await Order.findById(orderId)
        //console.log(existingOrder);
        if (!existingOrder) return new Response('existing product not found', { status: 404 })

        if (isPaid !== undefined) {

            existingOrder.isPaid = isPaid
        }
        if (isDelivered !== undefined) {

            existingOrder.isDelivered = isDelivered
        }



        await existingOrder.save()
        return new Response(JSON.stringify(existingOrder), { status: 200 })
    } catch (error) {
        return new Response('failed to update the product', { status: 500 })
    }
}