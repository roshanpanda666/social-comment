import { connectionSRT } from "@/app/lib/db";
import User from "@/app/lib/model/schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route"; // make sure this is correctly exported

export async function GET() {
  try {
    await mongoose.connect(connectionSRT);

    const session = await getServerSession(authOption);
    if (!session || !session.user?.email) {
      return NextResponse.json({ success: false, message: "Not authenticated" });
    }

    const email = session.user.email;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    console.log(user.comments); // Now accessing the comments array ✅

    return NextResponse.json({
      success: true,
      comments: user.comments || [], // default to empty array if undefined
    });

  } catch (err) {
    console.error("Fetch user comments error:", err);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
