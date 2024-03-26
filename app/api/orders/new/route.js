import Order from "@/models/orderModel";
import { connectDB } from "@/utils/db";

export const POST = async (request) => {
    console.log(request);
    const { user,
        firstName,
        lastName,
        orderItems,
        shippingAddress,
        paymentMethod,
        screenshot,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        // isPaid,
        isDelivered, } = await request.json();

    try {
        await connectDB();
        const newOrder = new Order({
            user,
            firstName,
            lastName,
            orderItems,
            shippingAddress,
            paymentMethod,
            screenshot,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            // isPaid,
            isDelivered,
        });

        await newOrder.save();
        return new Response(JSON.stringify(newOrder), { status: 201 })
    } catch (error) {
        return new Response("Failed to create an order", { status: 500 });
    }
}
