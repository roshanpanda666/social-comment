import { NextResponse } from "next/server"

export async function POST(req){
    try{
        const{name, email, password} = await req.json()

        console.log("name :",name);
        console.log("email :",email);
        console.log("password :",password);


        return NextResponse.json({message:"user registered"},{status:201})
    }
    catch (error){
        return NextResponse.json({message:"error adding user"},{status:500})
    }
}