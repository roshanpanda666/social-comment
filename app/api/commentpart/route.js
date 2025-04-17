// /api/commentpart/route.js

import mongoose from "mongoose";
import { connectionSRT } from "@/app/lib/db";
import { NextResponse } from "next/server";
import User from "@/app/lib/model/schema";
import { getSessionEmail } from "@/app/lib/auth";

// ✅ Add a new comment to comments array
export async function PUT(req) {
  try {
    await mongoose.connect(connectionSRT);

    const email = await getSessionEmail(req);
    if (!email) {
      return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });
    }

    const { comment } = await req.json();
    if (!comment) {
      return NextResponse.json({ success: false, message: "Comment missing" }, { status: 400 });
    }

    const result = await User.findOneAndUpdate(
      { email },
      { $push: { comments: comment } }, // ✅ push to array
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({ success: true, message: "Comment added", comments: result.comments });

  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

// ✅ Get all comments for logged-in user
export async function GET(req) {
  try {
    await mongoose.connect(connectionSRT);

    const email = await getSessionEmail(req);
    if (!email) {
      return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({ success: true, comments: user.comments });

  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
