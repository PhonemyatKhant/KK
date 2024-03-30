import { connectDB } from "@/utils/db";
import Order from "@/models/orderModel";
export async function GET() {

    try {
        await connectDB(); // Connect to MongoDB
        const orders = await Order.find()
        return new Response(JSON.stringify(orders), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response("Failed to fetch orders", { status: 500 });
    }
}