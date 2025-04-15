import { connectionSRT } from "@/app/lib/db";
import User from "@/app/lib/model/schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // ← Import bcrypt

export async function POST(req) {
    try {
        const { name, email, password , comment} = await req.json();

        console.log("Received Data ->", { name, email, password });

        await mongoose.connect(connectionSRT); // Connect to MongoDB

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // 🔐 Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

        // Create the user with hashed password
        const newUser = await User.create({
            name,
            email,
            comment,
            password: hashedPassword,
        });

        console.log("User Created ->", newUser);

        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
        console.error("Error in POST:", error);
        return NextResponse.json({ message: "Error adding user", error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionSRT); // Ensure connection is established
        console.log("Database connection successful");
        return NextResponse.json({ result: true });
    } catch (error) {
        console.error("Database connection failed:", error);
        return NextResponse.json({ result: false, error: error.message }, { status: 500 });
    }
}
