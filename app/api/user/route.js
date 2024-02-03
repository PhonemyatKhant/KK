import User from "@/models/userModel"
import { connectDB } from "@/utils/db"
import { NextResponse } from "next/server"

export async function POST(request) {
    const { name, email, isAdmin } = await request.json()
    await connectDB()
    await User.create({ name, email, isAdmin })
    return NextResponse.json({ message: 'user registered' }, { status: 201 })
}