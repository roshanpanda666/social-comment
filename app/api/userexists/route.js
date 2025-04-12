import { connectionSRT } from "@/app/lib/db";
import User from "@/app/lib/model/schema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function POST(req) {
  try {
    // Connect to DB
    await mongoose.connect(connectionSRT);

    // Get email from request
    const { email } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email }).select("_id");

    console.log("user: ", user);

    // Return response
    return NextResponse.json({ user: user || null });
  } catch (error) {
    console.error("Error in /api/userexists:", error);

    // ✅ Important: Always return a response even on error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
