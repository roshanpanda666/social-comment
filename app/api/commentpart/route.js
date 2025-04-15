import mongoose from "mongoose";
import { connectionSRT } from "@/app/lib/db";
import { NextResponse } from "next/server";
import User from "@/app/lib/model/schema"

export async function PUT(request) {
  try {
    const { email, comment } = await request.json();

    await mongoose.connect(connectionSRT);

    const result = await User.findOneAndUpdate(
      { email }, // match user
      { $set: { comment } }, // update comment
      { new: true } // return updated doc
    );

    if (!result) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
