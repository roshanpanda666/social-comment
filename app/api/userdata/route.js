import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionSRT } from "@/app/lib/db";
import User from "@/app/lib/model/schema";

export async function GET(){
    await mongoose.connect(connectionSRT)
    const data=await User.find()
   
    return NextResponse.json({ success: true, result: data });

}