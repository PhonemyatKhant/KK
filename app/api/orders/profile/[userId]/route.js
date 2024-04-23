import { connectDB } from "@/utils/db";
import Order from "@/models/orderModel";
export async function GET(
    request,
    { params }) {

    try {
        await connectDB(); // Connect to MongoDB
        console.log(params);
        const orders = await Order.find({ user: `${params.userId}` })
        return new Response(JSON.stringify(orders), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response(`Failed to fetch the order ${params}`, { status: 500 });
    }
}